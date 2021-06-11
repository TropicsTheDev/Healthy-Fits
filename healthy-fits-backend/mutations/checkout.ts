import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
  OrderCreateInput,
} from "../.keystone/schema-types";
import stripeConfig from "../utils/stripe";

const graphql = String.raw;

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry! You must be signed in to create an order");
  }
  try {
    // Query the current user
    const user = await context.lists.User.findOne({
      where: { id: userId },
      resolveFields: graphql`
    id
    name
    email
    cart {
      id
      quantity
      product {
        name
        price
        description
        id
        photo {
          id
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }
  `,
    });
    // Calculate the total price
    const cartItems = user.cart.filter((cartItem) => cartItem.product);
    const amount = cartItems.reduce(
      (tally: number, cartItem: CartItemCreateInput) => {
        return tally + cartItem.quantity * cartItem.product.price;
      },
      0
    );
    // Create the charge with stripe
    const charge = await stripeConfig.paymentIntents
      .create({
        amount,
        currency: "USD",
        confirm: true,
        // I guess you can pass tokens in as a payment menthod anymore :/
        payment_method_data: {
          type: "card",
          card: {
            token,
          },
        },
      })
      .catch((err) => {
        throw new Error(err);
      });
    // Convert CartItems to OrderItems
    const orderItems = cartItems.map((cartItem) => {
      const orderItem = {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        photo: { connect: { id: cartItem.product.photo.id } },
      };
      return orderItem;
    });
    // Create the Order and return it
    const order = await context.lists.Order.createOne({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });
    // Clean up any old cart items
    const cartItemIds = user.cart.map((cartItem) => cartItem.id);
    await context.lists.CartItem.deleteMany({
      ids: cartItemIds,
    });
    return order;
  } catch (e) {
    console.error(e);
  }
}

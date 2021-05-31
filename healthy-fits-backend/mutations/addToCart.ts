import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // Is the user signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You must be signed in to do this!");
  }
  // Query the user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: "id,quantity"
  })
  // See if the item is in their cart
  const [existingCartItem] = allCartItems;
  // Yes? increment by 1
  if (existingCartItem) {
    console.log({ allCartItems, existingCartItem });
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // No? New cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId }}
    }
  })
}

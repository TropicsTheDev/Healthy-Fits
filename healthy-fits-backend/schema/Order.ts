import { integer, relationship, text, virtual } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isSignedIn, rules } from "../access";
import formatMoney from "../utils/formatMoney";

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update() {
      return false;
    },
    delete() {
      return false;
    },
  },
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver(item) {
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});

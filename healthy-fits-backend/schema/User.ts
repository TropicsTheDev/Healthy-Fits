import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";
import { permissions, rules } from "../access";

export const User = list({
  access: {
    create() {
      return true;
    },
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the permission can delete users
    // you can't delete yourself
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate(args) {
      return !permissions.canManageUsers(args);
    },
    hideDelete(args) {
      return !permissions.canManageUsers(args);
    },
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO add roles, cart, and orders
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    role: relationship({
      ref: "Role.assignedTo",
      // TODO add access control
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
  },
});

// At it's simplest, access control is a YES or NO depending on the user's session

import { permissionsList } from "./schema/fields";
import { ListAccessArgs } from "./types";

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => !!session?.data.role?.[permission],
  ])
);

// Permissions check if somone meets a criteria - yes or no
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean or a filter to limit which products that they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // If not, do they own this item
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything
    }
    // They should only see available products (based on the status field)
    return { status: "AVAILABLE" };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // If not, do they own this item
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // If not, do they own this item
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have the permission of canManageProducts
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // If not, they can only update themselves
    return { id: session.itemId };
  },
};

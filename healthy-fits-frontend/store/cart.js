export function state() {
  return {
    cartOpen: true,
  };
}

export const mutations = {
  toggleCart({ cartOpen }) {
    // This is using the XOR operator to toggle the boolean
    cartOpen ^= true;
  },
  openCart({ cartOpen }) {
    cartOpen = true;
  },
  closeCart({ cartOpen }) {
    cartOpen = false;
  },
};

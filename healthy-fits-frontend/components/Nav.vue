<template>
  <nav>
    <nuxt-link to="/products">products</nuxt-link>
    <template v-if="user">
      <nuxt-link to="/sell">sell</nuxt-link>
      <nuxt-link to="/orders">orders</nuxt-link>
      <nuxt-link to="/account">account</nuxt-link>
      <button type="button" @click="$store.commit('cart/openCart')">
        View Cart
        <CartCount :count="cartCount" />
      </button>
      <SignOut />
    </template>
    <template v-else-if="user === null || user === undefined">
      <nuxt-link to="/signin">sign in</nuxt-link>
    </template>
  </nav>
</template>

<script>
import User from "~/plugins/User";

export default {
  name: "Nav",
  mixins: [User],
  computed: {
    cartCount() {
      return this.user.cart.reduce(
        (tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0),
        0
      );
    },
  },
};
</script>

<style scoped></style>

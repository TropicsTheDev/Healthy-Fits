<template>
  <nav>
    <nuxt-link to="/products">products</nuxt-link>
    <nuxt-link to="/sell">sell</nuxt-link>
    <nuxt-link to="/orders">orders</nuxt-link>
    <nuxt-link to="/account">account</nuxt-link>
  </nav>
</template>

<script>
// import { ref, react } from '@nuxtjs/composition-api';
export default {
  name: "Nav",
  setup() {
    return {};
  },
};
</script>

<style scoped></style>

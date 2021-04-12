<template>
  <div>
    <img :src="product.photo.image.publicUrlTransformed" :alt="product.name" />
    <h3 class="title">
      <nuxt-link :to="`/product/${product.id}`">{{ product.name }}</nuxt-link>
    </h3>
    <span class="price-tag">{{ product.price | formatMoney }}</span>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>

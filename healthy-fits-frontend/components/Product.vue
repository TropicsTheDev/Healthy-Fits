<template>
  <div>
    <img :src="product.photo.image.publicUrlTransformed" :alt="product.name" />
    <h3 class="title">
      <nuxt-link :to="`/products/${product.id}`">{{ product.name }}</nuxt-link>
    </h3>
    <span class="price-tag">{{ product.price | formatMoney }}</span>
    <p>{{ product.description }}</p>
    <div class="button-list">
      <nuxt-link :to="`/update?productId=${product.id}`">Edit</nuxt-link>
      <AddToCartButton :id="product.id" />
      <DeleteProduct :id="product.id">Delete</DeleteProduct>
    </div>
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
};
</script>

<style scoped></style>

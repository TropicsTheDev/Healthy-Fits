<template>
  <!-- Loading -->
  <p v-if="loading">Loading...</p>

  <!-- Error -->
  <p v-else-if="error">An error occurred</p>

  <!-- Result -->
  <div v-else-if="data !== null" class="product-list">
    <Product
      v-for="product in data.allProducts"
      :key="product.id"
      :product="product"
    />
  </div>

  <!-- No result -->
  <p v-else class="no-result apollo">No result :(</p>
</template>

<script>
export default {
  props: ["page", "data", "error", "loading"],
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(25%, 1fr));
}
</style>

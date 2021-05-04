<template>
  <!-- Loading -->
  <p v-if="loading">Loading...</p>

  <!-- Error -->
  <p v-else-if="error">An error occurred</p>

  <!-- Result -->
  <div v-else-if="data !== null" class="product-styles">
    <img
      :src="data.Product.photo.image.publicUrlTransformed"
      :alt="data.Product.photo.altText"
    />
    <div class="details">
      <h2>{{ data.Product.name }}</h2>
      <p>{{ data.Product.description }}</p>
    </div>
  </div>

  <!-- No result -->
  <p v-else class="no-result apollo">No result :(</p>
</template>

<script>
export default {
  props: ["data", "error", "loading"],
  head() {
    return {
      title: this.data !== null ? this.data.Product.name : "A Single Item",
    };
  },
};
</script>

<style scoped></style>

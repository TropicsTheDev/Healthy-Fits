<template>
  <!-- Loading -->
  <p v-if="loading">Loading...</p>

  <!-- Error -->
  <p v-else-if="error">An error occurred</p>

  <!-- Result -->
  <ul v-else-if="allOrders" class="product-list">
    <Order v-for="order in allOrders" :key="order.id" :order="order" />
  </ul>

  <!-- No result -->
  <p v-else class="no-result apollo">No result :(</p>
</template>

<script>
export default {
  props: ["allOrders", "error", "loading"],
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(25%, 1fr));
}
</style>

<template>
  <apollo-query :query="ALL_PRODUCTS_QUERY">
    <template #default="{ result: { loading, error, data } }">
      <!-- Loading -->
      <p v-if="loading">Loading...</p>

      <!-- Error -->
      <p v-else-if="error">An error occurred</p>

      <!-- Result -->
      <div v-else-if="data" class="product-list">
        <Product
          v-for="product in data.allProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- No result -->
      <p v-else class="no-result apollo">No result :(</p>
    </template>
  </apollo-query>
</template>

<script>
import gql from "graphql-tag";
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default {
  setup() {
    return {
      ALL_PRODUCTS_QUERY,
    };
  },
};
</script>

<style scoped></style>

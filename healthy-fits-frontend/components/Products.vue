<template>
  <!-- Loading -->
  <p v-if="loading">Loading...</p>

  <!-- Error -->
  <p v-else-if="error">An error occurred</p>

  <!-- Result -->
  <div v-else-if="result" class="product-list">
    <Product
      v-for="product in result.allProducts"
      :key="product.id"
      :product="product"
    />
  </div>

  <!-- No result -->
  <p v-else class="no-result apollo">No result :(</p>
</template>

<script>
import { useQuery } from "@vue/apollo-composable/dist";
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
    const { result, loading, error } = useQuery(ALL_PRODUCTS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
};
</script>

<style scoped></style>

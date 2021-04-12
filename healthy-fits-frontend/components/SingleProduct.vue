<template>
  <apollo-query :query="SINGLE_ITEM_QUERY" :variables="{ id }">
    <template #default="{ result: { loading, error, data } }">
      <!-- Loading -->
      <p v-if="loading">Loading...</p>

      <!-- Error -->
      <p v-else-if="error">An error occurred</p>

      <!-- Result -->
      <div v-else-if="data" class="product-styles">
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
  </apollo-query>
</template>

<script>
import { useRoute } from "@nuxtjs/composition-api";
import gql from "graphql-tag";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
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
      SINGLE_ITEM_QUERY,
      id: useRoute().value.params.id,
    };
  },
};
</script>

<style scoped></style>

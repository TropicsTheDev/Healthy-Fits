<template>
  <!-- Loading -->
  <p v-if="loading">Loading...</p>

  <!-- Error -->
  <p v-else-if="error">An error occurred</p>

  <!-- Result -->
  <div v-else-if="result" class="product-styles">
    <img
      :src="Product.photo.image.publicUrlTransformed"
      :alt="Product.photo.altText"
    />
    <div class="details">
      <h2>{{ Product.name }}</h2>
      <p>{{ Product.description }}</p>
    </div>
  </div>

  <!-- No result -->
  <p v-else class="no-result apollo">No result :(</p>
</template>

<script>
import { computed, useRoute } from "@nuxtjs/composition-api";
import { useQuery } from "@vue/apollo-composable/dist";
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
    const route = useRoute();
    const id = computed(() => route.vlaue.params.id);

    const { result, loading, error } = useQuery(SINGLE_ITEM_QUERY, { id });

    return {
      id,
      result,
      Product: result.value.Product,
      loading,
      error,
    };
  },
};
</script>

<style scoped></style>

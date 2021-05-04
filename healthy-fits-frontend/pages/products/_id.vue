<template>
  <apollo-query :query="(gql) => SINGLE_ITEM_QUERY" Í :variables="{ id }">
    <template #default="{ result: { data, loading, error } }">
      <main class="wrapper">
        <SingleProduct :data="data" :loading="loading" :error="error" />
      </main>
    </template>
  </apollo-query>
</template>

<script>
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
  data() {
    return {
      SINGLE_ITEM_QUERY,
      id: this.$route.params.id,
    };
  },
};
</script>

<style scoped></style>

<template>
  <apollo-query
    :query="(gql) => ALL_PRODUCTS_QUERY"
    :variables="{ skip: page * perPage - perPage, first: perPage }"
  >
    <template #default="{ result: { data, loading, error } }">
      <main class="wrapper">
        <Pagination :page="page || 1" />
        <Products :data="data" :loading="loading" :error="error" />
        <Pagination :page="page || 1" />
      </main>
    </template>
  </apollo-query>
</template>

<script>
import gql from "graphql-tag";
import { perPage } from "../../config";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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
  data() {
    return {
      ALL_PRODUCTS_QUERY,
      perPage,
    };
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
  },
};
</script>

<style scoped></style>

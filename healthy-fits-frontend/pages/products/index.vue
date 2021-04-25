<template>
  <apollo-query :query="(gql) => ALL_PRODUCTS_QUERY">
    <template #default="{ result: { data, loading, error } }">
      <main class="wrapper">
        <Pagination :page="$route.query.page || 1" />
        <Products
          :data="data"
          :loading="loading"
          :error="error"
          :page="$route.query.page || 1"
        />
        <Pagination :page="$route.query.page || 1" />
      </main>
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
  data() {
    return {
      ALL_PRODUCTS_QUERY,
    };
  },
};
</script>

<style scoped></style>

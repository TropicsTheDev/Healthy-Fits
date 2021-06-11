<template>
  <ApolloQuery :query="(gql) => SINGLE_ORDER_QUERY" :variables="{ id }">
    <template #default="{ result: { data, loading, error } }">
      <main class="wrapper">
        <SingleOrder :data="data" :loading="loading" :error="error" />
      </main>
    </template>
  </ApolloQuery>
</template>

<script>
import gql from "graphql-tag";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
export default {
  data() {
    return {
      SINGLE_ORDER_QUERY,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped></style>

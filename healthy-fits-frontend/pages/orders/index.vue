<template>
  <ApolloQuery
    :query="(gql) => USER_ORDERS_QUERY"
    @result="({ data }) => (allOrders = data.allOrders)"
  >
    <template #default="{ result: { loading, error } }">
      <main class="wrapper">
        <h2>You have {{ allOrders.length }} orders</h2>
        <Orders :allOrders="allOrders" :loading="loading" :error="error" />
      </main>
    </template>
  </ApolloQuery>
</template>

<script>
import gql from "graphql-tag";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
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
      USER_ORDERS_QUERY,
      allOrders: [],
    };
  },
  head() {
    return {
      title: `Your Orders: ${this.allOrders.length}`,
    };
  },
};
</script>

<style scoped></style>

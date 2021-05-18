<template>
  <nav>
    <nuxt-link to="/products">products</nuxt-link>
    <template v-if="user">
      <nuxt-link to="/sell">sell</nuxt-link>
      <nuxt-link to="/orders">orders</nuxt-link>
      <nuxt-link to="/account">account</nuxt-link>
      <SignOut />
    </template>
    <template v-else-if="user === null || user === undefined">
      <nuxt-link to="/signin">sign in</nuxt-link>
    </template>
  </nav>
</template>

<script>
import gql from "graphql-tag";
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;
export default {
  name: "Nav",
  data() {
    return {
      user: null,
    };
  },
  apollo: {
    authenticatedItem: {
      query: CURRENT_USER_QUERY,
      result({ data }) {
        this.user = data.authenticatedItem;
      },
    },
  },
};
</script>

<style scoped></style>

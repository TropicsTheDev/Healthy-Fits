<template>
  <button @click="signOut">Sign Out</button>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../plugins/User";
const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;
export default {
  methods: {
    async signOut() {
      console.log("signing out");
      await this.$apollo.mutate({ mutation: SIGN_OUT_MUTATION });
      await this.$apolloHelpers.onLogout();
      await this.$apollo.query({ query: CURRENT_USER_QUERY });
    },
  },
};
</script>

<style scoped></style>

<template>
  <form method="post" @submit="handleSubmit($event)">
    <h2>Sign In To Your Account</h2>
    <fieldset>
      <label>
        Email
        <input
          v-model="email"
          type="email"
          placeholder="Your Email Address"
          autocomplete="email"
        />
      </label>
      <label>
        Password
        <input v-model="password" type="password" placeholder="Your Password" />
        <button type="submit">Sign In</button>
      </label>
    </fieldset>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./Nav";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      try {
        const { data } = await this.$apollo.mutate({
          mutation: SIGNIN_MUTATION,
          variables: {
            email: this.email,
            password: this.password,
          },
        });
        console.log({
          signinResponse: data,
          apollo: this.$apollo,
          querires: this.$apollo.queries,
          provider: this.$apolloProvider,
        });
        const error =
          data?.authenticateUserWithPassword.__typename ===
          "UserAuthenticationWithPasswordFailure"
            ? data?.authenticateUserWithPassword
            : undefined;
        this.error = error;
        // await client.queryManager.fetchQueryRejectFns;
        await this.$apolloHelpers.onLogin(
          data.authenticateUserWithPassword.sessionToken
        );
        await this.$apollo.query({ query: CURRENT_USER_QUERY });

        event.target.reset();
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style scoped></style>

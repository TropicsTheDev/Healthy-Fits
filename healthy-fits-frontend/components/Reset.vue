<template>
  <form method="post" @submit="handleSubmit($event)">
    <h2>Reset your password</h2>
    <fieldset>
      <p v-if="redeemUserPasswordResetToken === null">
        Success! Check your email for a link!
      </p>
      <label for="email">
        Email
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          placeholder="Your Email Address"
          autocomplete="email"
        />
      </label>
      <label for="password">
        Password
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Your Password"
        />
      </label>
      <button type="submit">Request Reset</button>
    </fieldset>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../plugins/User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default {
  props: ["token"],
  data() {
    return {
      email: "",
      password: "",
      redeemUserPasswordResetToken: undefined, // would use null for initialization but null means it was sent successfuly in this case
      loading: false,
      error: undefined,
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      try {
        const res = await this.$apollo.mutate({
          mutation: RESET_MUTATION,
          variables: {
            email: this.email,
            password: this.password,
            token: this.token,
          },
          result({ loading, error }) {
            this.loading = loading;
            this.error = error;
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        console.log(res);
        this.redeemUserPasswordResetToken =
          res.data.redeemUserPasswordResetToken;
        this.error = res.data?.redeemUserPasswordResetToken?.code
          ? res.data?.redeemUserPasswordResetToken
          : undefined;
        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>

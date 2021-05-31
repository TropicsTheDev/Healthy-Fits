<template>
  <form method="post" @submit="handleSubmit($event)">
    <h2>Request A Password Reset</h2>
    <fieldset>
      <p v-if="sendUserPasswordLink === null">
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
      <button type="submit">Request Reset</button>
    </fieldset>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../plugins/User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      id
      email
      name
    }
  }
`;

export default {
  data() {
    return {
      email: "",
      sendUserPasswordLink: undefined, // would use null for initialization but null means it was sent successfuly in this case
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      try {
        const res = await this.$apollo.mutate({
          mutation: REQUEST_RESET_MUTATION,
          variables: {
            email: this.email,
          },
          result({ loading, error }) {
            this.loading = loading;
            this.error = error;
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        console.log(res);
        this.sendUserPasswordLink = res.data.sendUserPasswordLink;
        // const error =
        //   data?.authenticateUserWithPassword.__typename ===
        //   "UserAuthenticationWithPasswordFailure"
        //     ? data?.authenticateUserWithPassword
        //     : undefined;
        // this.error = error;
        event.target.reset();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>

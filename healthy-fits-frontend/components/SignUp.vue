<template>
  <form method="post" @submit="handleSubmit($event)">
    <h2>Create A New Account</h2>
    <fieldset>
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
      <label for="name">
        Name
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          placeholder="Your name"
          autocomplete="name"
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
        <button type="submit">Sign Up</button>
      </label>
    </fieldset>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../plugins/User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
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
      name: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      try {
        const res = await this.$apollo.mutate({
          mutation: SIGNUP_MUTATION,
          variables: {
            email: this.email,
            name: this.name,
            password: this.password,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        console.log(res);
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

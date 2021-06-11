<template>
  <form class="checkout-form" @submit="handleSubmit($event)">
    <StripeElementCard
      ref="cardElement"
      :pk="stripeKey"
      @loading="(l) => (loading = l)"
      @error="(e) => (error = e)"
      @token="checkout"
    />
    <button type="submit" class="healthy-button">Checkout</button>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "~/plugins/User";

let StripeElementCard;
if (process.browser) {
  StripeElementCard = require("@vue-stripe/vue-stripe").StripeElementCard;
}

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

export default {
  components: {
    StripeElementCard,
  },
  data() {
    return {
      stripeKey: process.env.NUXT_ENV_STRIPE_KEY,
      error: null,
      loading: false,
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      this.$refs.cardElement.submit();
    },
    checkout({ id }) {
      this.$apollo.mutate({
        mutation: CREATE_ORDER_MUTATION,
        variables: {
          token: id,
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        result({ data: { order } }) {
          this.$router.push(`/orders/${order.id}`);
          this.$store.commit("cart/closeCart");
        },
      });
    },
  },
};
</script>

<style scoped>
.checkout-form {
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
}
</style>

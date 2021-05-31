<template>
  <button type="button" @click="addToCart">
    Add<template v-if="loading">ing</template> To Cart
  </button>
</template>

<script>
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "~/plugins/User";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default {
  props: ["id"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    addToCart() {
      this.$apollo.mutate({
        mutation: ADD_TO_CART_MUTATION,
        variables: { id: this.id },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        result({ loading }) {
          this.loading = loading;
        },
      });
    },
  },
};
</script>

<template>
  <button
    type="button"
    :disabled="loading"
    title="Remove this item from the cart"
    @click="removeFromCart"
  >
    &times;
  </button>
</template>

<script>
import gql from "graphql-tag";
const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: id) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;
export default {
  props: ["id"],
  data() {
    return { loading: false };
  },
  methods: {
    removeFromCart() {
      this.$apollo.mutate({
        mutation: REMOVE_FROM_CART_MUTATION,
        variables: {
          id: this.id,
        },
        result({ loading }) {
          this.loading = loading;
        },
        update({ cache, payload }) {
          cache.evict(cache.identify(payload.data.deleteCartItem));
        },
      });
    },
  },
};
</script>

<style scoped></style>

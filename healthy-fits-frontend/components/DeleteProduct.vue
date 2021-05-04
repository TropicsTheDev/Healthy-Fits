<template>
  <button type="button" :disabled="$apollo.loading" @click="deleteProduct">
    <slot />
  </button>
</template>

<script>
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
export default {
  props: ["id"],
  methods: {
    update(cache, payload) {
      console.log(payload);
      console.log("running the update function after delete");
      cache.evict(cache.identify(payload.data.deleteProduct));
    },

    deleteProduct() {
      if (confirm("Are you sure you want to delete this product?")) {
        this.$apollo
          .mutate({
            mutation: DELETE_PRODUCT_MUTATION,
            variables: {
              id: this.id,
            },
            update: this.update,
          })
          .catch((err) => alert(err.message));
      }
    },
  },
};
</script>

<style scoped></style>

<template>
  <apollo-mutation
    :mutation="(gql) => UPDATE_PRODUCT_MUTATION"
    :refetchQueries="() => [{ query: ALL_PRODUCTS_QUERY }]"
    @done="handleResult"
  >
    <template #default="{ mutate, loading, error }">
      <main class="wrapper">
        <UpdateProduct
          :updateProduct="mutate"
          :product="product"
          :loading="loading"
          :error="error"
        />
      </main>
    </template>
  </apollo-mutation>
</template>
<script>
import gql from "graphql-tag";
import { ALL_PRODUCTS_QUERY } from "./products/index";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      price
      description
      name
    }
  }
`;
export default {
  data() {
    return {
      UPDATE_PRODUCT_MUTATION,
      ALL_PRODUCTS_QUERY,
    };
  },
  apollo: {
    product() {
      return {
        query: SINGLE_ITEM_QUERY,
        variables: {
          id: this.$route.query.productId,
        },
      };
    },
  },
  methods: {
    handleResult(result) {
      // This function is needed because the mutate() was not returning a promise
      this.$router.push({
        path: `/products/${result.data.updateProduct.id}`,
      });
    },
  },
};
</script>

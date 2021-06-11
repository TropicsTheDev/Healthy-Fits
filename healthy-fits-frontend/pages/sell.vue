<template>
  <PleaseSignIn>
    <ApolloMutation
      :mutation="(gql) => CREATE_PRODUCT_MUTATION"
      :refetchQueries="() => [{ query: ALL_PRODUCTS_QUERY }]"
      @done="handleResult"
    >
      <template #default="{ mutate, loading, error }">
        <main class="wrapper">
          <CreateProduct
            :createProduct="mutate"
            :loading="loading"
            :error="error"
          />
        </main>
      </template>
    </ApolloMutation>
  </PleaseSignIn>
</template>
<script>
import gql from "graphql-tag";
import { ALL_PRODUCTS_QUERY } from "./products/index";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
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
      CREATE_PRODUCT_MUTATION,
      ALL_PRODUCTS_QUERY,
    };
  },
  methods: {
    handleResult(result) {
      // This function is needed because the mutate() was not returning a promise
      this.$router.push({
        path: `/products/${result.data.createProduct.id}`,
      });
    },
  },
};
</script>

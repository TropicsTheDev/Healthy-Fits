<template>
  <apollo-mutation
    :mutation="(gql) => CREATE_PRODUCT_MUTATION"
    :refetchQueries="() => [{ query: ALL_PRODUCTS_QUERY }]"
  >
    <template #default="{ createProduct, loading, error }">
      <main class="wrapper">
        <CreateProduct
          :createProduct="createProduct"
          :loading="loading"
          :error="error"
        />
      </main>
    </template>
  </apollo-mutation>
</template>
<script>
import gql from "graphql-tag";

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
    };
  },
};
</script>

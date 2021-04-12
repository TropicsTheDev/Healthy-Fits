<template>
  <apollo-mutation
    :mutation="CREATE_PRODUCT_MUTATION"
    :variables="{ image, name, price, description }"
    :refetchQueries="() => [{ query: ALL_PRODUCTS_QUERY }]"
  >
    <template #default="{ createProduct, loading, error }">
      <form @submit="handleSubmit(createProduct, $event)">
        <!-- TODO: Make actual display error component -->
        <div class="display-error">{{ error }}</div>
        <fieldset :disabled="loading" :aria-busy="loading">
          <label>
            Image
            <input
              id="image"
              required
              type="file"
              name="image"
              @change="handleImage($event)"
            />
          </label>
          <label>
            Name
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
            />
          </label>
          <label>
            Price
            <input
              id="price"
              v-model="price"
              type="number"
              name="price"
              placeholder="price"
            />
          </label>
          <label>
            Description
            <textarea
              id="description"
              v-model="description"
              name="description"
              placeholder="Description"
            />
          </label>

          <button type="submit">+ Add Product</button>
        </fieldset>
      </form>
    </template>
  </apollo-mutation>
</template>

<script>
import { reactive, toRefs } from "@nuxtjs/composition-api";
import gql from "graphql-tag";
import { ALL_PRODUCTS_QUERY } from "./Products";
export default {
  setup() {
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

    const state = reactive({
      image: "",
      name: "Nice Shoes",
      price: 34234,
      description: "These are the best shoes!",
    });


    function handleImage(event) {
      const { value } = event.target;
      state.image = value;
    }

    async function handleSubmit(createProduct, event) {
      event.preventDefault();
      const { resetForm } = this.$useForm(state);
      const res = await createProduct();
      resetForm();
      this.$router.push({
        path: `/product/${res.data.createProduct.id}`,
      });
    }

    return {
      CREATE_PRODUCT_MUTATION,
      ALL_PRODUCTS_QUERY,
      ...toRefs(state),
      handleImage,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>

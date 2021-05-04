<template>
  <form @submit="handleSubmit($event)">
    <!-- TODO: Make actual display error component -->
    <div class="display-error">{{ error }}</div>
    <fieldset :disabled="loading" :aria-busy="loading">
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

      <button type="submit">Update Product</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  props: ["updateProduct", "product", "loading", "error"],
  data() {
    return {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      const { name, price, description } = this.$data;
      this.updateProduct({
        variables: {
          id: this.product.id,
          data: { name, price: Number(price), description },
        },
      });
      event.target.reset();
    },
    handleImage(event) {
      const [value] = event.target.files;
      this.image = value;
    },
  },
};
</script>

<style scoped></style>

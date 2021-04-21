<template>
  <form @submit="handleSubmit($event)">
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

<script>
export default {
  props: ["createProduct", "loading", "error"],
  data() {
    return {
      image: "",
      name: "Nice Shoes",
      price: 34234,
      description: "These are the best shoes!",
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      const { image, name, price, description } = this.$data;
      this.createProduct({
        variables: { image, name, price: Number(price), description },
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

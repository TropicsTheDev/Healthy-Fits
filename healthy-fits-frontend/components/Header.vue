<template>
  <header>
    <div class="bar wrapper">
      <h1>
        <nuxt-link to="/">Healthy Fits</nuxt-link>
      </h1>
      <Nav />
    </div>
    <div class="sub-bar wrapper">
      <Search />
    </div>
    <Cart :open="true" />
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped></style>

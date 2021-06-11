<template>
  <li>
    <nuxt-link :to="`/order/${order.id}`">
      <div class="order-meta">
        <p>{{ numberOfItems }} Item{{ order.items.length === 1 ? "" : "s" }}</p>
        <p>{{ order.total | formatMoney }}</p>
        <div class="images">
          <img
            v-for="item in order.items"
            :key="`images-${item.id}`"
            :src="item.photo.image.publicUrlTransformed"
            :alt="item.name"
          />
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ["order"],
  computed: {
    numberOfItems() {
      return this.order.items.reduce((tally, item) => tally + item.quantity, 0);
    },
  },
};
</script>

<style scoped></style>

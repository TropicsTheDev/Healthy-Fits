<template>
  <div class="order">
    <p>
      <span>Order Id:</span><span>{{ order.id }}</span>
    </p>
    <p>
      <span>Charge:</span><span>{{ order.charge }}</span>
    </p>
    <p>
      <span>Order Total:</span><span>{{ order.total | formatMoney }}</span>
    </p>
    <p>
      <span>Item Count:</span><span>{{ order.items.length }}</span>
    </p>
    <div v-for="item in order.items" :key="item.id">
      <img :src="item.photo.image.publicUrlTransformed" :alt="item.title" />
      <div class="item-details">
        <h2>{{ item.name }}</h2>
        <p>Qty: {{ item.quantity }}</p>
        <p>Each: {{ item.price | formatMoney }}</p>
        <p>Subtotal: {{ (item.price * item.quantity) | formatMoney }}</p>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "loading", "error"],
  head() {
    return {
      title:
        this.data !== null
          ? `Healthy Fits - ${this.data.order.id}`
          : "A Single Order",
    };
  },
  computed: {
    order() {
      return this.data.order;
    },
  },
};
</script>

<style scoped></style>

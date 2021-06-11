<template>
  <div>
    <template v-if="user !== null && user !== undefined">
      <div :open="cartOpen">
        <header>
          <h3>{{ user.name }}</h3>
          <button type="button" @click="$store.commit('cart/closeCart')">
            Close Cart
          </button>
        </header>
        <ul>
          <CartItem
            v-for="cartItem in user.cart"
            :key="cartItem.id"
            :cartItem="cartItem"
          ></CartItem>
        </ul>
        <footer>
          <p>{{ $calcTotalPrice(user.cart) | formatMoney }}</p>
          <Checkout />
        </footer>
      </div>
    </template>
  </div>
</template>

<script>
import RemoveFromCartButton from "./RemoveFromCartButton.vue";
import User from "~/plugins/User";

const CartItem = {
  props: ["cartItem"],
  computed: {
    product() {
      return this.cartItem.product ? this.cartItem.product : null;
    },
  },
  render() {
    // You can use JSX is Vue!
    return (
      <li>
        <img
          src={this.product.photo.publicUrlTransformed}
          alt={this.product.name}
        />
        <div>
          <h3>{this.product.name}</h3>
          <p>
            {this.$options.filters.formatMoney(
              this.product.price * this.cartItem.quantity
            )}
            -
            <em>
              {this.cartItem.quantity} &times;{" "}
              {this.$options.filters.formatMoney(this.product.price)}
            </em>
          </p>
        </div>
        <RemoveFromCartButton id={this.cartItem.id} />
      </li>
    );
  },
};
export default {
  components: {
    CartItem,
  },
  mixins: [User],
  computed: {
    cartOpen() {
      return this.$store.state.cart.cartOpen;
    },
  },
};
</script>

<style scoped></style>

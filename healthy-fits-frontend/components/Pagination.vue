<template>
  <div>
    <nuxt-link
      :to="`/products?page=${page - 1}`"
      role="button"
      :aria-disabled="onFirstPage"
      :class="{ disabled: onFirstPage }"
      >Prev</nuxt-link
    >
    <p>Page {{ page }} of {{ pageCount }}</p>
    <p>{{ count }} Items Total</p>
    <nuxt-link
      :to="`/products?page=${page + 1}`"
      role="button"
      :aria-disabled="onLastPage"
      :class="{ disabled: onLastPage }"
      >Next</nuxt-link
    >
  </div>
</template>

<script>
import gql from "graphql-tag";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default {
  props: ["page"],
  data() {
    return {
      count: 0,
    };
  },
  head() {
    return {
      title: `Healthy Fits - Page ${this.page} of ${this.pageCount}`,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / perPage);
    },
    onFirstPage() {
      return this.page <= 1;
    },
    onLastPage() {
      return this.page >= this.pageCount;
    },
  },
  apollo: {
    _allProductsMeta: {
      query: PAGINATION_QUERY,
      result({ data }) {
        this.count = data._allProductsMeta.count;
      },
    },
  },
};
</script>

<style scoped>
/* aria-disabled wasn't working with Nuxt-Links */
.disabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
  pointer-events: none;
}
</style>

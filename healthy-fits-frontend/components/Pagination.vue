<template>
  <div>
    Pagination
    <nuxt-link to="/">Prev</nuxt-link>
    <nuxt-link to="/">Next</nuxt-link>
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

<style scoped></style>

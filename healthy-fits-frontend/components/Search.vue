<template>
  <Multiselect
    v-model="selectedItem"
    class="dropdown"
    placeholder="Search For An Item"
    :multiple="false"
    :options="items"
    :loading="$apollo.loading"
    :internalSearch="false"
    @search-change="findItemsButChill"
    @select="goToSelection"
  >
    <template #singleLabel="{ option }">
      <div>{{ option.name }}</div>
    </template>
    <template #option="{ option }">
      <div class="dropdown-item">
        <img
          :src="option.photo.image.publicUrlTransformed"
          :alt="option.name"
        />
        {{ option.name }}
      </div>
    </template>
  </Multiselect>
</template>

<script>
// Using JSX here to see if REACT will play nice with Vue
import Multiselect from "vue-multiselect";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      items: [],
      selectedItem: {
        name: "Search for an item",
      },
      error: null,
    };
  },
  created() {
    this.findItemsButChill = debounce((query) => this.findItems(query), 350);
  },
  methods: {
    async findItems(query) {
      console.log("searching", { query });
      const { data } = await this.$apollo
        .query({
          query: SEARCH_PRODUCTS_QUERY,
          fetchPolicy: "no-cache",
          variables: {
            searchTerm: query,
          },
        })
        .catch((error) => (this.error = error));
      this.items = data?.searchTerms;
    },
    goToSelection(selectedItem) {
      // The state doesn't change fast enough, so this function prevents the item from  being undefined.
      // It uses the select event from the multiselect
      this.$router.push(`/products/${selectedItem.id}`);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>

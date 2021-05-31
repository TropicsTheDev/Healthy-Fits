import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;
const useUser = {
  data() {
    return {
      user: null,
    };
  },
  apollo: {
    authenticatedItem: {
      query: CURRENT_USER_QUERY,
      result({ data }) {
        this.user = data?.authenticatedItem;
      },
    },
  },
};

export default useUser;

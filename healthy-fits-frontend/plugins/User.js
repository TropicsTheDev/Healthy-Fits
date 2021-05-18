import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

export default ({ app }, inject) => {
  const {
    apolloProvider: {
      defaultClient: { query },
    },
  } = app;
  inject("useUser", async () => {
    const { data } = await query({ query: CURRENT_USER_QUERY });
    console.log({ data });
    return data?.authenticatedItem;
  });
};

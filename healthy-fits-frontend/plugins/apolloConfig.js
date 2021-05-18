import { InMemoryCache } from "@apollo/client";
import paginationField from "./paginationField";

export default (context) => {
  return {
    httpEndpoint: "http://localhost:3000/api/graphql",
    httpLinkOptions: {
      credentials: "include",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            allProducts: paginationField,
          },
        },
      },
    }),
  };
};

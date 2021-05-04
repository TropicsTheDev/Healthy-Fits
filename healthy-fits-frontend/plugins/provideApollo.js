// plugins/provide-apollo-client.js
import { provide } from "@nuxtjs/composition-api";
import { DefaultApolloClient } from "@vue/apollo-composable";

export default ({ app }) => {
  app.setup = function () {
    const apolloClient = app.apolloProvider.defaultClient;

    provide(DefaultApolloClient, apolloClient);
  };
};

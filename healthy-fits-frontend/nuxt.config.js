// eslint-disable-next-line
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "healthy-fits-frontend",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://js.stripe.com/v3" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/formatMoney.js",
    "~/plugins/useForm.js",
    "~/plugins/calcTotalPrice.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  server: {
    port: 7777,
  },

  transforms: { templateString: false },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/composition-api",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/apollo"],

  apollo: {
    clientConfigs: {
      default: "~/plugins/apolloConfig.js",
    },
    authenticationType: "",
    tokenName: "keystonejs-session",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ["@vue/apollo-composable"],
  },
};

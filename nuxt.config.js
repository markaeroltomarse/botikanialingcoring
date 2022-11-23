import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Botika ni Aling Coring",
    title: "Botika ni Aling Coring",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://image.flaticon.com/icons/png/512/991/991884.png"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/aos", ssr: false },
    { src: "~/plugins/v-scheduler.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    [
      "@nuxtjs/vuetify",
      {
        icons: {
          iconfont: "mdi" // default - only for display purposes
        }
      }
    ],
    //'nuxt-socket-io',
    "@nuxtjs/auth"
  ],

  env: {
    AUTH_KEY: "adeef231asdqwd123",
    baseURL:
      (process.env.NODE_ENV !== "production"
        ? `http://localhost:${5000}/`
        : `https://botikanialingcoring.herokuapp.com/`) + "api"
  },

  axios: {
    credentials: true,
    baseURL:
      (process.env.NODE_ENV !== "production"
        ? `http://localhost:${5000}/`
        : `https://botikanialingcoring.herokuapp.com/`) + "api",
    APP_PORT: 5000
  },

  auth: {
    plugins: ["@/plugins/auth-reload.js"],
    strategies: {
      local: {
        autoFetchUser: false,
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "get" }
          //getInfo: {url: '/auth/user', method: 'post'}
        }
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 5000
  },
  serverMiddleware: [
    //"~/api/server.js",
    { path: "", handler: "~/api/server.js" }
  ]
};

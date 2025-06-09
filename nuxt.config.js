var toTitleCase = function (phrase) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// -6t+ed+2i-1n-4w - 6664530793

module.exports = {
  serverMiddleware: [
   //  "redirect-ssl"
    //'~/servermiddleware/seo.js'
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: "Treatment Centers, Halfway & Sober Houses",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "FIND THE BEST REHAB FOR YOU OR A LOVED ONE! Discover treatment centers around the world."
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
      },
      { rel: "stylesheet", href: "/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "/css/style.css" },
      { rel: "stylesheet", href: "/css/tables.css" },
      { rel: "stylesheet", href: "/css/vendors.css" },
      { rel: "stylesheet", href: "/css/site.css" }
      // { rel: 'stylesheet', href: '/css/animate.css' }
    ],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-Y993L934VZ",
        async:true
      },
      {
        src:"//84143.cctm.xyz/t.js",
        async:true
      },
      {
        src: "js/ga.js"
      },
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
      },
      { src: "/js/sweetalert.min.js" },
      { src: "https://unpkg.com/lodash@latest/lodash.min.js" },
      { src: "/js/bootstrap.js" },
      { src: "/js/modernizr.js" },
      // { src: '/node-analytics/node-analytics.js' },
      { src: "/js/common_scripts.js" },
      { src: "/js/functions.js" },

      { src: "/js/video_header.js" },
      // {
      //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0367568677254318",
      //   raj: "ss",
      //   crossorigin: "anonymous",
      // },

      // { src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181438337538149",raj:"ss", crossorigin:"anonymous"},
      {
        src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
        async: true,
        defer: true
      }
      // { src: 'https://www.paypal.com/sdk/js?client-id=AbEtZ8S-ahalHfUmc_4Em6MB4WOJocAvoZ9j-cI0ay4he3zzDMXxg4k5_-eDhEYojDEci4nDM6bic7wb&currency=USD&disable-funding=credit,card' }
    ]
  },
  modules: [
    "@nuxtjs/font-awesome",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    // '@nuxtjs/pwa',
    "@nuxtjs/redirect-module",
    '@nuxtjs/robots'
  ],
  buildModules: ["@nuxtjs/google-analytics", "@nuxtjs/moment"],
  googleAnalytics: {
    id: "UA-23900484-1"
  },
  redirect: [
    { from: "^/meetings/aa_meetings?(.*)$", to: "/meeting", statusCode: 301 }, // /meetings/aa_meetings?location=philadelphia%2C%20pa%2C%2019126&meetingid=25663
    { from: "^/meetings/aa", to: "/meeting", statusCode: 301 }, // /meetings/aa
    { from: "^/meetings/na", to: "/meeting", statusCode: 301 }, // /meetings/na
    { from: "^/meetings/state/(.*)$", to: "/meeting", statusCode: 301 },
    { from: "^/meetings/(.*)$", to: "/meeting/$1", statusCode: 301 },
    // { from: "^/meetings/na_meetings(.*)$", to: "/meetings/na" },
    // { from: "^/meetings/aa_meetings(.*)$", to: "/meetings/aa" },
    { from: "^/12stepmeetings-alcohol?(.*)$", to: "/meeting", statusCode: 301 },
    { from: "^/meetings/families-anonymous", to: "https://www.familiesanonymous.org/" },
    { from: "^/facilities/detox_centers", to: "/directory/detox_centers" },
    { from: "^/facilities/alternative_treatment", to: "/directory/alternative_treatment" },
    { from: "^/facilities/drug_alcohol", to: "/directory/drug_alcohol" },
    { from: "^/facilities/outpatient", to: "/directory/outpatient" },
    { from: "^/facilities/adolescent_treatment", to: "/directory/adolescent_treatment" },
    { from: "^/facilities/exclusive_rehabs", to: "/directory/housing" },
    { from: "^/facilities/halfway_houses", to: "/directory/housing" },
    { from: "^/home/advertising", to: "/advertising" },
    { from: "^/facilitymanagement/facilitynew", to: "/facility/add" },
    { from: "^/account/login", to: "/login" },
    { from: "^/account/register", to: "/register" },
    { from: "^/directory/listings", to: "/directory/search" },
    { from: "^/directory/recoverycoaches", to: "https://recoverycoach.net/coaches" }
  ],
  robots: {
    UserAgent: "*",
    Disallow: ['/api/', '/_nuxt/', '/__webpack_hmr/', '/css/', '/js/', '/images/'],
    Sitemap: (req) => `https://${req.headers.host}/sitemapindex.xml`
  },
  axios: {
    proxy: true,
    prefix: "/api",
    baseURL: "http://localhost:3000/api",
    proxyHeaders: false,
    credentials: false,
  },
  rootDir: __dirname,
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/login", method: "post", propertyName: "token" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get", propertyName: "user" }
        }
      },
      facebook: {
        client_id: "250554158969749",
        clientSecret: "ebf5b0a85a4c12ca43453dd2b7892eb4",
        userinfo_endpoint:
          "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday",
        scope: ["public_profile", "email", "user_birthday"]
      },
      google: {
        client_id: "..."
      }
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: "~/components/loading.vue",
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    publicPath: "/_nuxt/dist/",
    transpile: [/^vue2-google-maps($|\/)/],
    extend(config, { isDev, isClient }) {
      config.devtool = isClient ? "eval-source-map" : "inline-source-map";

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  /*
   ** Register Plugins
   */
  plugins: [
    { src: "plugins/vue2GoogleMaps", ssr: false },
    { src: "plugins/router-plugin", mode: "client" },
    { src: "plugins/vueSocial", ssr: false },
    { src: "plugins/filters", ssr: true },
    { src: "plugins/reCaptcha", ssr: false },
    { src: "plugins/rich-editor", ssr: false },
    { src: "plugins/vue-select-2", ssr: false },
    { src: "plugins/vue-google-adsense", ssr: false },
    { src: "plugins/tooltip", ssr: false },
    { src: "plugins/functions", ssr: false },
    { src: "plugins/date-picker", ssr: false },
    { src: "plugins/linkify", ssr: false },
    { src: "plugins/cropper", ssr: false },
    { src: "plugins/vue-drag", ssr: false }
  ],
  telemetry: false,
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false
  }
};

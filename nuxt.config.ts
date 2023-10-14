// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/ScenarioEditor/",
  },
  experimental: {
    payloadExtraction: false,
  },
  devtools: { enabled: true },
});

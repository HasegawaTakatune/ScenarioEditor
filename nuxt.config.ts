// console.log("------------------------");
// console.log(`NODE_ENV >> ${process.env.NODE_ENV}`);
// console.log({ ...process.env });
// console.log("------------------------");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/ScenarioEditor/",
  },
  devtools: { enabled: true },
});

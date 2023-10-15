const getBaseUrl = () => {
  console.log("------------------------");
  console.log(`NODE_ENV >> ${process.env.NODE_ENV}`);
  console.log({ ...process.env });
  console.log("------------------------");

  const environment = process.env.NODE_ENV;

  switch (environment) {
    case "development":
      return "/ScenarioEditor/";

    case "staging":
    case "production":
      return "/https://hasegawatakatune.github.io/ScenarioEditor";
    default:
      return "/";
  }
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: getBaseUrl(),
    // baseURL: "/ScenarioEditor/",
  },
  devtools: { enabled: true },
});

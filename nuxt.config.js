import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
        useApiClient: true,
        bridge: true,
      },
    ],
    "@nuxtjs/tailwindcss",
  ],
  css: ["@/assets/css/fonts.css"],
});

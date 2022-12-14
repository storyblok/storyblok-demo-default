import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    [
      '@storyblok/nuxt',
      {
        /*
        If you would like to use this as a template for your project, simply provide the access token here.
        Also please remove line 14 (usePlugin) as well as the file plugins/storyblok.js.
        */
        // accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
        usePlugin: false,
      },
    ],
    '@nuxtjs/tailwindcss',
  ],
  ssr: false,
  css: ['@/assets/css/fonts.css'],
  runtimeConfig: {
    public: {
      templateToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
  },
})

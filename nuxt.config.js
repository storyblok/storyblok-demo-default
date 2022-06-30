import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_PREVIEW_TOKEN }], '@nuxtjs/tailwindcss'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['model-viewer'].includes(tag),
    },
  },
  head: {
    bodyAttrs: {
      class: 'test',
    },
  },
  publicRuntimeConfig: {
    STORYBLOK_PUBLIC_TOKEN: process.env.STORYBLOK_PUBLIC_TOKEN,
  },
})

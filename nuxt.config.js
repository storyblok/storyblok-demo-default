// https://nuxt.com/docs/getting-started/configuration
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
  ],
  ssr: false,
  css: ['@/assets/css/tailwind.css', '@/assets/css/fonts.css'],
  runtimeConfig: {
    public: {
      templateToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

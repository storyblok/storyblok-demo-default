import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { defineNuxtPlugin, useRuntimeConfig, useRoute } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const { storyblok } = useRuntimeConfig
  const route = useRoute()

  vueApp.use(StoryblokVue, {
    ...storyblok,
    accessToken: route.query.token,
    use: [apiPlugin],
  })
})

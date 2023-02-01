import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { defineNuxtPlugin, useRuntimeConfig, useRoute } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  vueApp.use(StoryblokVue, {
    ...config.storyblok,
    accessToken: route.query.token || config.public.templateToken,
    use: [apiPlugin],
  })
})

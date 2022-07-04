<template>
  <main :style="cssVariables">
    <Header />
    <slot />
    <Footer />
  </main>
</template>

<script setup>
const theme = reactive({
  primary: '#437C90',
  primary_highlight: '#2cafdc',
  secondary: '#D55672',
  tertiary: '#E8985E',
  light: '#f6f7f7',
  medium: '#bfc7c5',
  dark: '#152336',
})

const siteConfig = ref()

const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
})

siteConfig.value = data.story

const cssVariables = computed(() => {
  if (siteConfig.value.content.use_custom_colors) {
    theme.primary = siteConfig.value.content.primary.color
    theme.primary_highlight = siteConfig.value.content.primary_highlight.color
    theme.secondary = siteConfig.value.content.secondary.color
    theme.tertiary = siteConfig.value.content.tertiary.color
    theme.light = siteConfig.value.content.light.color
    theme.dark = siteConfig.value.content.dark.color
  }
  return {
    '--primary': theme.primary,
    '--primary_highlight': theme.primary_highlight,
    '--secondary': theme.secondary,
    '--tertiary': theme.tertiary,
    '--white': theme.white,
    '--dark': theme.dark,
    '--light': theme.light,
  }
})
</script>

<style>
body {
  @apply pt-32;
}
section.page-section {
  @apply py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-40;
}

section.banner-section + section.banner-section {
  @apply pt-0;
}
</style>

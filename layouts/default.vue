<template>
  <main :style="cssVariables">
    <Header
      :logo="siteConfig.content.header_logo"
      :disable_transparency="siteConfig.content.header_disable_transparency"
      :nav="siteConfig.content.header_nav"
      :buttons="siteConfig.content.header_buttons"
    />
    <slot />
    <Footer
      :logo="siteConfig.content.footer_logo"
      :about="siteConfig.content.footer_about"
      :navs="{
        nav_1_headline: siteConfig.content.footer_nav_1_headline,
        nav_2_headline: siteConfig.content.footer_nav_2_headline,
        nav_3_headline: siteConfig.content.footer_nav_3_headline,
        nav_1: siteConfig.content.footer_nav_1,
        nav_2: siteConfig.content.footer_nav_2,
        nav_3: siteConfig.content.footer_nav_3,
      }"
      :twitter="siteConfig.content.footer_twitter"
      :instagram="siteConfig.content.footer_instagram"
      :youtube="siteConfig.content.footer_youtube"
      :facebook="siteConfig.content.footer_facebook"
    />
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
  rounded_sm: '0.125rem',
  rounded_default: '0.25rem',
  rounded_md: '0.375rem',
  rounded_lg: '0.5rem',
  rounded_xl: '0.75rem',
  rounded_2xl: '1rem',
  rounded_3xl: '1.6rem',
  rounded_full: '9999px',
})

const siteConfig = ref()

const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
  resolve_links: 'url',
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
  if (siteConfig.value.content.disable_rounded_corners) {
    for (const key in theme) {
      if (key.startsWith('rounded_')) theme[key] = 0
    }
  }
  return {
    '--primary': theme.primary,
    '--primary_highlight': theme.primary_highlight,
    '--secondary': theme.secondary,
    '--tertiary': theme.tertiary,
    '--white': theme.white,
    '--dark': theme.dark,
    '--light': theme.light,
    '--rounded_sm': theme.rounded_md,
    '--rounded_default': theme.rounded_md,
    '--rounded_md': theme.rounded_md,
    '--rounded_lg': theme.rounded_lg,
    '--rounded_xl': theme.rounded_xl,
    '--rounded_2xl': theme.rounded_2xl,
    '--rounded_3xl': theme.rounded_3xl,
    '--rounded_full': theme.rounded_full,
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

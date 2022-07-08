<template>
  <main :style="cssVariables" v-editable="story.content">
    <Header
      :logo="story.content.header_logo"
      :disable_transparency="story.content.header_disable_transparency"
      :nav="story.content.header_nav"
      :buttons="story.content.header_buttons"
    />
    <slot />
    <Footer
      :logo="story.content.footer_logo"
      :about="story.content.footer_about"
      :navs="{
        nav_1_headline: story.content.footer_nav_1_headline,
        nav_2_headline: story.content.footer_nav_2_headline,
        nav_3_headline: story.content.footer_nav_3_headline,
        nav_1: story.content.footer_nav_1,
        nav_2: story.content.footer_nav_2,
        nav_3: story.content.footer_nav_3,
      }"
      :twitter="story.content.twitter"
      :instagram="story.content.instagram"
      :youtube="story.content.youtube"
      :facebook="story.content.facebook"
    />
  </main>
</template>

<script setup>
const defaultColors = {
  '--primary': '#437C90',
  '--primary_highlight': '#2cafdc',
  '--secondary': '#D55672',
  '--tertiary': '#E8985E',
  '--light': '#f6f7f7',
  '--medium': '#bfc7c5',
  '--dark': '#152336',
}

const defaultBorderRadiuses = {
  '--rounded_sm': '0.125rem',
  '--rounded_default': '0.25rem',
  '--rounded_md': '0.375rem',
  '--rounded_lg': '0.5rem',
  '--rounded_xl': '0.75rem',
  '--rounded_2xl': '1rem',
  '--rounded_3xl': '1.6rem',
  '--rounded_full': '9999px',
}

const theme = reactive({ ...defaultColors, ...defaultBorderRadiuses })

//const story = await useStoryblok('site-config', { version: 'draft', resolve_links: 'url' }, { resolveLinks: 'url' })

const story = ref()
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
  resolve_links: 'url',
})

story.value = data.story

const cssVariables = computed(() => {
  if (story.value.content.use_custom_colors) {
    theme['--primary'] = story.value.content.primary.color
    theme['--primary_highlight'] = story.value.content.primary_highlight.color
    theme['--secondary'] = story.value.content.secondary.color
    theme['--tertiary'] = story.value.content.tertiary.color
    theme['--light'] = story.value.content.light.color
    theme['--dark'] = story.value.content.dark.color
  } else {
    Object.assign(theme, defaultColors)
  }
  if (story.value.content.disable_rounded_corners) {
    for (const key in theme) {
      if (key.startsWith('--rounded_')) theme[key] = 0
    }
  } else {
    Object.assign(theme, defaultBorderRadiuses)
  }
  return theme
})

const { slug } = useRoute().params

onMounted(() => {
  if (slug && slug[0] !== 'site-config') return
  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
    preventClicks: true, // useful here to prevent default behavior when clicking on buttons/links
  })
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

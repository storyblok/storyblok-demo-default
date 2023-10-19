<script setup>
const defaultFontFamilies = {
  '--font-family-display': 'Roboto, sans-serif',
  '--font-family-body': 'Roboto, sans-serif',
}

const defaultColors = {
  '--primary': '#395ECE',
  '--secondary': '#00B3B0',
  '--light': '#F8F8F8',
  '--medium': '#435366',
  '--dark': '#0A0F15',
}

const defaultBorderRadiuses = {
  '--rounded_sm': '4px',
  '--rounded_default': '6px',
  '--rounded_md': '8px',
  '--rounded_lg': '10px',
  '--rounded_xl': '15px',
  '--rounded_2xl': '20px',
  '--rounded_3xl': '25px',
  '--rounded_full': '9999px',
}

const theme = reactive({
  ...defaultFontFamilies,
  ...defaultColors,
  ...defaultBorderRadiuses,
})

const story = ref()
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
  resolve_links: 'url',
  resolve_relations: 'site-config.enable_breadcrumbs_per_story',
})

story.value = data.story

const cssVariables = computed(() => {
  if (story.value.content.use_custom_fonts) {
    if (story.value.content.custom_font_display) {
      theme['--font-family-display'] = story.value.content.custom_font_display
    }
    if (story.value.content.custom_font_body) {
      theme['--font-family-body'] = story.value.content.custom_font_body
    }
  } else {
    Object.assign(theme, defaultFontFamilies)
  }
  if (story.value.content.use_custom_colors) {
    theme['--primary'] = story.value.content.primary.color
    theme['--secondary'] = story.value.content.secondary.color
    theme['--light'] = story.value.content.light.color
    theme['--medium'] = story.value.content.medium.color
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

const autoNavFolder = computed(() => {
  if (!story.value.content.header_auto_nav_folder[0]?.slug) return ''
  return story.value.content.header_auto_nav_folder[0].slug
})

const processedSlug = await getProcessedSlug()

const altStyleBreadcrumbs = computed(
  () => processedSlug.startsWith('articles/') && processedSlug !== 'articles/',
)

const viewingSiteConfig = await isSiteConfig()
const { customParent } = useRuntimeConfig().public

onMounted(() => {
  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
    preventClicks: true,
    customParent,
  })
})
</script>

<template>
  <main :style="cssVariables" class="font-body">
    <Header
      :logo="story.content.header_logo"
      :disable_transparency="story.content.header_disable_transparency"
      :auto_nav="story.content.header_auto_nav"
      :auto_nav_folder="autoNavFolder"
      :nav="story.content.header_nav"
      :buttons="story.content.header_buttons"
      :light="story.content.header_light"
    />
    <div
      v-if="viewingSiteConfig && story.content.use_custom_colors"
      class="container py-12"
    >
      <Headline class="mb-8">Color Previews</Headline>
      <div
        class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <ColorPreview color="primary" />
        <ColorPreview color="secondary" />
        <ColorPreview color="light" />
        <ColorPreview color="medium" />
        <ColorPreview color="dark" />
      </div>
    </div>
    <Breadcrumbs
      v-if="story.content.enable_breadcrumbs && !viewingSiteConfig"
      :slug="processedSlug"
      :alt-style="altStyleBreadcrumbs"
    />
    <slot />
    <Footer
      :text_color="story.content.footer_text_color"
      :background_color="story.content.footer_background_color"
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

<style>
body {
  @apply pt-32;
}

body > div > main {
  @apply text-medium;
}

section.page-section {
  @apply py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32;
}

section.page-section.no-padding {
  @apply py-0;
}

section.page-section.bg-white:not(.banner-section)
  + section.page-section.bg-white:not(.banner-section),
section.page-section.bg-light:not(.banner-section)
  + section.page-section.bg-light:not(.banner-section),
section.banner-section + section.banner-section {
  @apply pt-0;
}

section.hero-section + section.text-section.overlap-preceding-hero {
  @apply -mb-16 py-0 sm:-mb-20 md:-mb-24 lg:-mb-28;
}

section.hero-section
  + section.text-section.overlap-preceding-hero
  > .container {
  @apply -translate-y-24;
}

section.banner-section.padding:first-child {
  @apply pt-0;
}

section.banner-section.padding.bg-white + section.page-section.bg-white,
section.banner-section.padding.bg-light + section.page-section.bg-light,
section.banner-section.bg-white + section.page-section.padding.bg-white,
section.banner-section.bg-light + section.page-section.padding.bg-light {
  @apply pt-0;
}

.overlay-15::before {
  content: '';
  @apply absolute left-0 top-0 z-10 h-full w-full;
  background-color: rgba(0, 0, 0, 0.15);
  background-blend-mode: overlay;
}

.overlay-30::before,
.overlay-pattern-1::before {
  content: '';
  @apply absolute left-0 top-0 z-10 h-full w-full;
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: overlay;
}

.overlay-pattern-1::after {
  content: '';
  @apply absolute left-0 top-0 z-20 h-full w-full;
  background-image: url('~/assets/images/plus-pattern.svg');
  background-repeat: repeat;
}
</style>

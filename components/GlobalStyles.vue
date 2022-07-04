<script setup>
const theme = reactive({
  primary: '#cccccc',
  primary_highlight: '#cccccc',
  secondary: '#cccccc',
  tertiary: '#cccccc',
  light: '#cccccc',
  dark: '#cccccc',
})

const fetchTheme = async () => {
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories/site-config', {
    version: 'draft',
  })

  theme.primary = await data.story.content.primary.color
  theme.primary_highlight = await data.story.content.primary_highlight.color
  theme.secondary = await data.story.content.secondary.color
  theme.tertiary = await data.story.content.tertiary.color
  theme.light = await data.story.content.light.color
  theme.dark = await data.story.content.dark.color
}

onMounted(() => {
  fetchTheme()
})
</script>

<template>
  <div class="grid grid-cols-6">
    <div class="w-32 h-32 sb-bg-primary"></div>
    <div class="w-32 h-32 sb-bg-primary-highlight"></div>
    <div class="w-32 h-32 sb-bg-secondary"></div>
    <div class="w-32 h-32 sb-bg-tertiary"></div>
    <div class="w-32 h-32 sb-bg-light"></div>
    <div class="w-32 h-32 sb-bg-dark"></div>
  </div>
</template>

<style>
.sb-bg-primary {
  background-color: v-bind('theme.primary');
}
.sb-bg-primary-highlight {
  background-color: v-bind('theme.primary_highlight');
}
.sb-bg-secondary {
  background-color: v-bind('theme.secondary');
}
.sb-bg-tertiary {
  background-color: v-bind('theme.tertiary');
}
.sb-bg-light {
  background-color: v-bind('theme.light');
}
.sb-bg-dark {
  background-color: v-bind('theme.dark');
}
</style>

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
    <div class="w-32 h-32 sb-bg-primary hover:bg-black"></div>
    <div class="w-32 h-32 sb-bg-primary-highlight"></div>
    <div class="w-32 h-32 sb-bg-secondary"></div>
    <div class="w-32 h-32 sb-bg-tertiary"></div>
    <div class="w-32 h-32 sb-bg-light"></div>
    <div class="w-32 h-32 sb-bg-dark"></div>
  </div>
</template>

<style>
/* Background colors */
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
.sb-hover-bg-primary:hover {
  background-color: v-bind('theme.primary');
}
.sb-hover-bg-primary-highlight:hover {
  background-color: v-bind('theme.primary_highlight');
}
.sb-hover-bg-secondary:hover {
  background-color: v-bind('theme.secondary');
}
.sb-hover-bg-tertiary:hover {
  background-color: v-bind('theme.tertiary');
}
.sb-hover-bg-light:hover {
  background-color: v-bind('theme.light');
}
.sb-hover-bg-dark:hover {
  background-color: v-bind('theme.dark');
}

/* Text colors */
.sb-text-primary {
  color: v-bind('theme.primary');
}
.sb-text-primary-highlight {
  color: v-bind('theme.primary_highlight');
}
.sb-text-secondary {
  color: v-bind('theme.secondary');
}
.sb-text-tertiary {
  color: v-bind('theme.tertiary');
}
.sb-text-light {
  color: v-bind('theme.light');
}
.sb-text-dark {
  color: v-bind('theme.dark');
}
.sb-hover-text-primary:hover {
  color: v-bind('theme.primary');
}
.sb-hover-text-primary-highlight:hover {
  color: v-bind('theme.primary_highlight');
}
.sb-hover-text-secondary:hover {
  color: v-bind('theme.secondary');
}
.sb-hover-text-tertiary:hover {
  color: v-bind('theme.tertiary');
}
.sb-hover-text-light:hover {
  color: v-bind('theme.light');
}
.sb-hover-text-dark:hover {
  color: v-bind('theme.dark');
}

/* Border colors */
.sb-border-primary {
  border-color: v-bind('theme.primary');
}
.sb-border-primary-highlight {
  border-color: v-bind('theme.primary_highlight');
}
.sb-border-secondary {
  border-color: v-bind('theme.secondary');
}
.sb-border-tertiary {
  border-color: v-bind('theme.tertiary');
}
.sb-border-light {
  border-color: v-bind('theme.light');
}
.sb-border-dark {
  border-color: v-bind('theme.dark');
}
</style>

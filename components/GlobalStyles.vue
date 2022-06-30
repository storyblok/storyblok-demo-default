<template>
  <div class="w-52 h-52 sb-bg-primary"></div>
  {{ colors.datasource_entries[0].value }}
  <div v-for="color in colors.datasource_entries" :key="color.id">{{ color }}</div>
</template>

<style>
/* .sb-bg-primary {
  background-color: v-bind('colors.datasource_entries[0].value');
} */
</style>

<script setup>
/* const { colors } = await getColors()

console.log(colors.value['datasource_entries']) */

/* const { data } = await useFetch('https://api.storyblok.com/v2/cdn/datasource_entries?datasource=background-colors&token=KMGXSqgSjQpemYx1UgjpAgtt') */
const colors = ref()
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/datasource_entries', {
  datasource: 'colors',
})

colors.value = data
/* 
const theme = computed(() => {
  let theme = []
  for (const color in colors.value.datasource_entries) {
    console.log(color)
    theme[color.name] = color.value
  }
  return theme
}) */
</script>

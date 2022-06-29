<template>
  <div class="w-52 h-52 sb-bg-primary"></div>
  <pre>{{ backgroundColors }}</pre>
</template>

<style>
.sb-bg-primary {
  background-color: v-bind('theme.primary');
}
</style>

<script setup>
const theme = reactive({
  primary: 'purple',
})
const backgroundColors = ref(null)

const { data } = await useFetch('https://api.storyblok.com/v2/cdn/datasource_entries?datasource=background-colors&token=KMGXSqgSjQpemYx1UgjpAgtt')
/* const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/datasource_entries', {
  datasource: 'colors',
})*/

backgroundColors.value = data
</script>

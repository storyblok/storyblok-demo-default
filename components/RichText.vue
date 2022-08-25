<template>
  <div v-html="richText" class="prose prose-lg" />
</template>

<script setup>
const props = defineProps({ text: Object })

const storyblokApi = useStoryblokApi()
const richText = computed(() =>
  storyblokApi.richTextResolver.render(props.text)
)
</script>

<style>
.prose ul li p {
  @apply p-0 m-0;
}
</style>

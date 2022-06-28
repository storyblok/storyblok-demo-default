<template>
  <div v-html="richText" class="prose prose-lg" />
</template>

<script setup>
import RichTextResolver from 'storyblok-js-client/source/richTextResolver'
const props = defineProps({ text: Object })

const resolver = new RichTextResolver()

const richText = computed(() => resolver.render(props.text))
</script>

<style>
.prose ul li p {
  @apply p-0 m-0;
}
</style>

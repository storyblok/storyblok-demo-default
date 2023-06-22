<style>
.prose ul li p {
  @apply m-0 p-0;
}
</style>

<template>
  <div v-html="richText" class="prose prose-lg" />
</template>

<script setup>
const props = defineProps({ text: Object })

const richText = computed(() => renderCustomRichText(props.text))
</script>

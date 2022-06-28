<script setup>
let { slug } = useRoute().params

const category = await useStoryblok(`categories/${slug}`, {
  version: 'draft',
})
</script>

<template>
  <Category v-if="category" :blok="category.content" :uuid="category.uuid" />
</template>

<script setup>
let { slug } = useRoute().params

const category = await useStoryblok(`categories/${slug}`, {
  version: 'draft',
})
</script>

<template>
  <!-- do we really need this extra fetch here just for the UUID? -->
  <Category v-if="category" :blok="category.content" :uuid="category.uuid" />
</template>

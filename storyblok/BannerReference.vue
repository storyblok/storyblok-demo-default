<template>
  <Banner v-if="blok.banner.content" :blok="blok.banner.content" />
</template>

<script setup>
defineProps({ blok: Object })
</script>

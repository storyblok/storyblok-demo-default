<template>
  <Banner :blok="blok.banner.content" />
</template>

<script setup>
defineProps({ blok: Object });
</script>

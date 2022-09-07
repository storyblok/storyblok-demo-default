<template>
  <div v-editable="blok">
    <Banner
      v-if="blok.banner.content"
      :blok="blok.banner.content"
      :referenced="true"
    />
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>

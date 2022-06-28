<template>
  <main class="container" v-editable="blok">
    <Headline>{{ blok.headline }}</Headline>
    <pre>{{ blok }}</pre>
  </main>
</template>

<script setup>
defineProps({ blok: Object })
</script>

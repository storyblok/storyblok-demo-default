<template>
  <section class="page-section container text-center max-w-2xl">
    <Overline>{{ blok.overline }}</Overline>
    <Headline>{{ blok.headline }}</Headline>
    <FormattedText>{{ blok.text }}</FormattedText>
  </section>
</template>

<script setup>
defineProps({ blok: Object })
</script>

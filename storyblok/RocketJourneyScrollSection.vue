<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section class="container mx-auto flex min-h-screen items-center justify-end">
    <div class="w-full px-8 text-right text-light sm:w-1/2 sm:px-0">
      <h2 class="mb-4 font-display text-6xl font-bold text-light">
        {{ blok?.headline }}
      </h2>
      <RichText
        class="font-italic prose-invert rounded bg-dark bg-opacity-80 text-2xl sm:bg-transparent"
        :text="blok.text"
      />
    </div>
  </section>
</template>

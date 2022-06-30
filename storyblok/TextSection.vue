<template>
  <section v-editable="blok" class="page-section text-section" :class="'bg-' + blok.background_color">
    <div class="container">
      <div class="max-w-3xl" :class="{ 'mx-auto text-center': blok.alignment === 'center' }">
        <Headline class="mb-4">{{ blok.headline }}</Headline>
        <Lead>
          {{ blok.lead }}
        </Lead>
        <RichText :text="blok.text" />
        <div class="mt-8">
          <Button v-for="button in blok.button" :key="button._uid" :button="button" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })
</script>

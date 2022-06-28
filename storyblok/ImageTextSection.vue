<template>
  <section v-editable="blok" class="page-section image-text-section" :class="'bg-' + blok.background_color">
    <div class="container grid md:grid-cols-2 gap-12 items-center">
      <div class="order-last text-left" :class="blok.reverse_layout ? '' : 'lg:order-first'">
        <Headline class="mb-2">{{ blok.headline }}</Headline>
        <RichText :text="blok.text" />
        <div class="mt-8">
          <Button v-for="button in blok.button" :key="button._uid" :button="button" />
        </div>
      </div>
      <div>
        <img :src="blok.image.filename" :alt="blok.image.alt" class="rounded-3xl pointer-events-none" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ blok: Object })
</script>

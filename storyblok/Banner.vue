<template>
  <section class="relative flex items-center py-12" v-editable="blok">
    <div class="container relative z-10">
      <h1 class="text-3xl md:text-7xl font-bold mb-4 text-center" :class="[textColor, textAlignment]">
        {{ blok.headline }}
      </h1>
      <h2 class="text-xl md:text-4xl font-light text-center" :class="[textColor, textAlignment]">
        {{ blok.subheadline }}
      </h2>
      <div class="flex items-center justify-center space-x-8 mt-12 mx-auto">
        <Button v-for="button in blok.buttons" :key="button._uid" :button="button" />
      </div>
    </div>
    <img :src="blok.background_image.filename" :alt="blok.background_image.alt" class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none" />
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const textAlignment = computed(() => {
  return 'text-' + props.blok.alignment
})
</script>

<script setup>
const props = defineProps({ blok: Object })

const fixedHeightImages = computed(() => {
  if (props.blok.image_layout !== 'fixed-height') return false
  let images = {
    mobile: getOptimizedImage(props.blok.image, 600, 300),
    tablet: getOptimizedImage(props.blok.image, 1000, 500),
    desktop: getOptimizedImage(props.blok.image, 1000, 1250),
  }

  return images
})

const optimizedImage = computed(() => getOptimizedImage(props.blok.image, 1000))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section image-text-section"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div
        class="order-last text-left"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline v-if="blok.headline" size="small" class="mb-2">
          {{ blok.headline }}
        </Headline>
        <RichText :text="blok.text" />
        <div v-if="blok.button.length" class="mt-8">
          <Button
            v-for="button in blok.button"
            :key="button._uid"
            :button="button"
          />
        </div>
      </div>
      <div>
        <div v-if="blok.image.filename">
          <img
            v-if="!fixedHeightImages"
            :src="optimizedImage"
            :alt="blok.image.alt"
            class="pointer-events-none rounded-lg shadow-2xl"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.mobile"
            :alt="blok.image.alt"
            class="pointer-events-none rounded-lg shadow-2xl md:invisible md:hidden"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.tablet"
            :alt="blok.image.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl md:visible md:block lg:invisible lg:hidden"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.desktop"
            :alt="blok.image.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl lg:visible lg:block"
          />
        </div>
      </div>
    </div>
  </section>
</template>

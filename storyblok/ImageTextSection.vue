<template>
  <section
    v-editable="blok"
    class="page-section image-text-section"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center"
    >
      <div
        class="order-last text-left"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline v-if="blok.headline" size="small" class="mb-2">{{
          blok.headline
        }}</Headline>
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
            class="rounded-lg shadow-2xl pointer-events-none"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.mobile"
            :alt="blok.image.alt"
            class="rounded-lg shadow-2xl pointer-events-none md:hidden md:invisible"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.tablet"
            :alt="blok.image.alt"
            class="rounded-lg shadow-2xl pointer-events-none hidden invisible md:block md:visible lg:hidden lg:invisible"
          />
          <img
            v-if="fixedHeightImages"
            :src="fixedHeightImages.desktop"
            :alt="blok.image.alt"
            class="rounded-lg shadow-2xl pointer-events-none hidden invisible lg:block lg:visible"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const fixedHeightImages = computed(() => {
  if (props.blok.image_layout !== 'fixed-height') return false
  let images = {
    mobile: props.blok.image.filename + '/m/600x300',
    tablet: props.blok.image.filename + '/m/1000x500',
    desktop: props.blok.image.filename + '/m/1000x1250',
  }

  if (props.blok.image.focus) {
    for (const key of Object.keys(images)) {
      images[key] += '/filters:focal(' + props.blok.image.focus + ')'
    }
  }

  return images
})

const optimizedImage = computed(() => props.blok.image.filename + '/m/1000x0')
</script>

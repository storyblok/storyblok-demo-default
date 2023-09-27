<script setup>
const props = defineProps({ blok: Object })

const optimizedImages1 = computed(() => {
  return {
    mobile: getOptimizedImage(props.blok.image_1, 800, 600),
    tablet: getOptimizedImage(props.blok.image_1, 700, 600),
    desktop: getOptimizedImage(props.blok.image_1, 1200, 800),
  }
})

const optimizedImages2 = computed(() => {
  return {
    mobile: getOptimizedImage(props.blok.image_2, 800, 600),
    tablet: getOptimizedImage(props.blok.image_2, 500, 600),
    desktop: getOptimizedImage(props.blok.image_2, 600, 800),
  }
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section two-col-image-text-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <div
        class="flex flex-col items-center space-y-6 md:flex-row md:space-x-12 md:space-y-0"
      >
        <div class="w-full text-left md:w-7/12 lg:w-8/12">
          <Headline v-if="blok.headline">
            {{ blok.headline }}
          </Headline>
        </div>
        <div class="w-full text-left md:w-5/12 lg:w-4/12 lg:text-lg">
          <div v-if="blok.subheadline">
            {{ blok.subheadline }}
          </div>
        </div>
      </div>
      <div
        class="my-12 h-[1px] w-full bg-gradient-to-r from-transparent via-medium to-transparent"
      />
      <div
        class="flex flex-col items-center space-y-6 md:flex-row md:space-x-12 md:space-y-0"
      >
        <div class="block h-full w-full md:w-7/12 lg:w-8/12">
          <img
            v-if="optimizedImages1"
            :src="optimizedImages1.mobile"
            :alt="blok.image_1?.alt"
            class="pointer-events-none rounded-lg shadow-2xl md:invisible md:hidden"
          />
          <img
            v-if="optimizedImages1"
            :src="optimizedImages1.tablet"
            :alt="blok.image_1?.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl md:visible md:block lg:invisible lg:hidden"
          />
          <img
            v-if="optimizedImages1"
            :src="optimizedImages1.desktop"
            :alt="blok.image_1?.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl lg:visible lg:block"
          />
        </div>
        <div class="block h-full w-full md:w-5/12 lg:w-4/12">
          <img
            v-if="optimizedImages2"
            :src="optimizedImages2.mobile"
            :alt="blok.image_2?.alt"
            class="pointer-events-none rounded-lg shadow-2xl md:invisible md:hidden"
          />
          <img
            v-if="optimizedImages2"
            :src="optimizedImages2.tablet"
            :alt="blok.image_2?.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl md:visible md:block lg:invisible lg:hidden"
          />
          <img
            v-if="optimizedImages2"
            :src="optimizedImages2.desktop"
            :alt="blok.image_2?.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl lg:visible lg:block"
          />
        </div>
      </div>
    </div>
  </section>
</template>

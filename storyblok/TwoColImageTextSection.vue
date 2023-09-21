<script setup>
const props = defineProps({ blok: Object })

const optimizedImage1 = computed(() =>
  getOptimizedImage(props.blok.image_1, 0, 800),
)
const optimizedImage2 = computed(() =>
  getOptimizedImage(props.blok.image_2, 0, 800),
)
</script>

<template>
  <section
    v-editable="blok"
    class="page-section two-col-image-text-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <div
        class="flex flex-col items-center space-y-6 sm:space-x-10 md:flex-row md:space-x-12 md:space-y-0"
      >
        <div class="w-full text-left md:w-7/12 lg:w-8/12">
          <Headline v-if="blok.headline">
            {{ blok.headline }}
          </Headline>
        </div>
        <div class="w-full md:w-5/12 lg:w-4/12">
          <div v-if="blok.subheadline">
            {{ blok.subheadline }}
          </div>
        </div>
      </div>
      <div
        class="my-12 h-[1px] w-full bg-gradient-to-r from-transparent via-medium to-transparent"
      />
      <div
        class="flex flex-col items-center space-y-6 md:h-[420px] md:flex-row md:space-x-12 md:space-y-0 lg:h-[600px]"
      >
        <div class="block h-full w-full md:w-7/12 lg:w-8/12">
          <img
            v-if="optimizedImage1"
            :src="optimizedImage1"
            :alt="blok.image_1?.alt"
            class="pointer-events-none h-full max-h-[300px] min-h-[240px] w-full rounded-lg object-cover shadow-2xl md:h-full md:max-h-full"
          />
        </div>
        <div class="block h-full w-full md:w-5/12 lg:w-4/12">
          <img
            v-if="optimizedImage2"
            :src="optimizedImage2"
            :alt="blok.image_2?.alt"
            class="pointer-events-none h-full max-h-[300px] min-h-[240px] w-full rounded-lg object-cover shadow-2xl md:h-full md:max-h-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

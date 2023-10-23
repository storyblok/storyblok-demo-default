<script setup>
const props = defineProps({ blok: Object, index: Number })

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const optimizedImage = computed(() => getOptimizedImage(props.blok.image, 800))

const composedImages = computed(() => {
  return {
    one: getOptimizedImage(props.blok.image_1, 300, 450),
    two: getOptimizedImage(props.blok.image_2, 600, 450),
    three: getOptimizedImage(props.blok.image_3, 600, 450),
    four: getOptimizedImage(props.blok.image_4, 300, 450),
  }
})
</script>

<template>
  <!-- <pre>{{ blok }}</pre> -->
  <section
    class="hero-section group container relative grid items-center gap-12 overflow-x-visible py-36 lg:grid-cols-2"
    :class="[{ '-mt-32': index == 0 }]"
    v-editable="blok"
  >
    <div>
      <Headline :class="[textColor]">
        {{ blok.headline }}
      </Headline>
      <Lead :class="[textColor]">
        {{ blok.lead }}
      </Lead>
      <div
        v-if="blok.buttons.length"
        class="mt-12 flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0"
      >
        <Button
          v-for="button in blok.buttons"
          :key="button._uid"
          :button="button"
        />
      </div>
      <div
        v-if="blok.labels.length || blok.badges.length"
        class="mt-12 flex flex-col gap-y-6"
      >
        <div v-if="blok.labels.length" class="grid grid-cols-3 gap-8">
          <div
            v-for="entry in blok.labels"
            :key="entry._uid"
            :class="[textColor]"
          >
            <h4 v-if="entry?.label" class="font-display text-xl">
              {{ entry.label }}
            </h4>
            <span v-if="entry?.description" class="text-sm">
              {{ entry.description }}
            </span>
          </div>
        </div>
        <div v-if="blok.badges.length" class="grid grid-cols-3 gap-8">
          <img
            v-for="entry in blok.badges"
            :key="entry._uid"
            :src="entry.badge?.filename"
            :alt="entry.badge?.alt"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="blok.enable_composed_image"
        class="flex flex-col gap-y-4"
        :style="`transform: rotate(${blok.rotate.value}deg);`"
      >
        <div class="flex gap-x-4">
          <div
            class="w-1/3 overflow-hidden rounded-lg bg-medium transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl"
          >
            <img
              :src="composedImages.one"
              :alt="blok.image_1?.alt"
              class="pointer-events-none"
            />
          </div>
          <div
            class="col-span-2 w-2/3 overflow-hidden rounded-lg bg-medium transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl"
          >
            <img
              :src="composedImages.two"
              :alt="blok.image_2?.alt"
              class="pointer-events-none"
            />
          </div>
        </div>
        <div class="flex gap-x-4">
          <div
            class="col-span-2 w-2/3 overflow-hidden rounded-lg bg-medium transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl"
          >
            <img
              :src="composedImages.three"
              :alt="blok.image_3?.alt"
              class="pointer-events-none"
            />
          </div>
          <div
            class="w-1/3 overflow-hidden rounded-lg bg-medium transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl"
          >
            <img
              :src="composedImages.four"
              :alt="blok.image_4?.alt"
              class="pointer-events-none"
            />
          </div>
        </div>
      </div>
      <img
        v-else
        :src="optimizedImage"
        :alt="blok.image_1?.alt"
        class="pointer-events-none rounded-lg transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl"
      />
    </div>
  </section>
</template>

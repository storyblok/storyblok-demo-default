<template>
  <section
    class="page-section banner-section"
    :class="{ 'no-padding': blok.full_width }"
    v-editable="blok"
  >
    <div :class="{ container: !blok.full_width }">
      <div
        class="relative bg-light py-12 px-4 sm:px-6 md:px-8 lg:px-12 lg:py-24 xl:py-28 2xl:py-32 overflow-hidden"
        :class="[
          { 'rounded-lg': !blok.full_width },
          { 'plus-pattern': blok.pattern_overlay },
        ]"
      >
        <div class="relative lg:min-h-[360px] z-30 flex flex-col h-full">
          <div class="grow">
            <h2
              class="text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight text-center font-black mb-4"
              :class="[textColor]"
            >
              {{ blok.headline }}
            </h2>
            <h3
              class="text-lg md:text-xl lg:text-2xl text-center font-thin"
              :class="[textColor]"
            >
              {{ blok.subheadline }}
            </h3>
          </div>
          <div
            class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 mt-12 mx-auto"
          >
            <Button
              v-for="button in blok.buttons"
              :key="button._uid"
              :button="button"
            />
          </div>
        </div>
        <img
          v-if="blok.background_image.filename"
          :src="optimizedImage + filters"
          :alt="blok.background_image.alt"
          class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const textColor = computed(() => {
  return 'text-' + props.blok.text_color
})

const filters = computed(() => {
  const blur =
    props.blok.background_blur > 0
      ? 'blur(' + props.blok.background_blur + ')'
      : ''
  const brightness =
    props.blok.background_brightness != 0
      ? 'brightness(' + props.blok.background_brightness + ')'
      : ''

  let filters = '/filters:'
  if (blur && !brightness) {
    return filters + blur
  } else if (!blur && brightness) {
    return filters + brightness
  } else if (blur && brightness) {
    return filters + blur + ':' + brightness
  } else {
    return ''
  }
})

const optimizedImage = computed(
  () => props.blok.background_image?.filename + '/m/2000x0'
)
</script>

<template>
  <section
    class="page-section banner-section"
    :class="[
      { 'no-padding': blok.full_width },
      { 'pointer-events-none': referenced },
    ]"
    v-editable="blok"
  >
    <div :class="{ container: !blok.full_width }">
      <div
        class="relative bg-light py-16 px-4 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:py-40 2xl:py-48 overflow-hidden min-h-[540px] md:min-h-[600px] lg:min-h-[720px] flex items-center justify-center"
        :class="[
          { 'rounded-lg': !blok.full_width },
          { 'plus-pattern': blok.pattern_overlay },
        ]"
      >
        <div class="relative z-30">
          <h2
            class="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight text-center font-black mb-4"
            :class="[textColor]"
          >
            {{ blok.headline }}
          </h2>
          <div class="max-w-3xl mx-auto">
            <h3
              class="text-md md:text-lg lg:text-xl text-center font-thin"
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
          v-if="blok.background_image?.filename"
          :src="optimizedImage + filters"
          :alt="blok.background_image.alt"
          class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object, referenced: Boolean })

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

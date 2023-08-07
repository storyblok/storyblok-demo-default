<script setup>
const props = defineProps({ blok: Object, referenced: Boolean })

const textColor = computed(() => {
  return 'text-' + props.blok.text_color
})

const filters = computed(() => {
  const blur =
    props.blok.background_blur.value > 0
      ? 'blur(' + props.blok.background_blur.value + ')'
      : ''
  const brightness =
    props.blok.background_brightness.value != 0
      ? 'brightness(' + props.blok.background_brightness.value + ')'
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

const showVideo = computed(() => {
  if (
    props.blok.background_image?.filename &&
    !props.blok.background_video?.filename
  ) {
    return false
  } else if (props.blok.background_video.filename) {
    return true
  }
})
</script>

<template>
  <section
    class="page-section banner-section bg-white"
    :class="[
      { 'no-padding': blok.full_width },
      { 'pointer-events-none': referenced },
    ]"
    v-editable="blok"
  >
    <div :class="{ container: !blok.full_width }">
      <div
        class="relative flex min-h-[540px] items-center justify-center overflow-hidden bg-light px-4 py-16 sm:px-6 md:min-h-[600px] md:px-8 lg:min-h-[720px] lg:px-12 lg:py-32 xl:py-40 2xl:py-48"
        :class="[
          { 'rounded-lg': !blok.full_width },
          blok.overlay !== 'no-overlay' ? blok.overlay : '',
        ]"
      >
        <div class="relative z-30">
          <h2
            class="mb-4 text-center text-3xl font-black leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight"
            :class="[textColor]"
          >
            {{ blok.headline }}
          </h2>
          <div class="mx-auto max-w-3xl">
            <h3
              class="text-md text-center font-thin md:text-lg lg:text-xl"
              :class="[textColor]"
            >
              {{ blok.subheadline }}
            </h3>
          </div>
          <div
            class="mx-auto mt-12 flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0"
          >
            <Button
              v-for="button in blok.buttons"
              :key="button._uid"
              :button="button"
            />
          </div>
        </div>
        <video
          v-if="showVideo"
          :src="blok.background_video.filename"
          :alt="blok.background_video.alt"
          class="absolute left-0 top-0 z-0 h-full w-full object-cover"
          autoplay
          muted
          loop
        ></video>
        <img
          v-else-if="!showVideo && blok.background_image.filename"
          :src="optimizedImage + filters"
          :alt="blok.background_image.alt"
          class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>

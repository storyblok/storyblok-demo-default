<template>
  <section class="page-section banner-section" v-editable="blok">
    <div class="container">
      <div class="relative rounded-xl lg:rounded-[60px] bg-light py-12 px-4 sm:px-6 md:px-8 lg:px-12 lg:py-24 xl:py-28 2xl:py-32 overflow-hidden shadow-md">
        <div class="relative min-h-[360px] z-20 flex flex-col h-full">
          <div class="grow">
            <h2 class="text-2xl md:text-5xl lg:text-7xl text-center font-bold mb-4" :class="[textColor]">
              {{ blok.headline }}
            </h2>
            <h3 class="text-xl md:text-2xl lg:text-4xl text-center ont-thin" :class="[textColor]">
              {{ blok.subheadline }}
            </h3>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-x-8 mt-12 mx-auto">
            <Button v-for="button in blok.buttons" :key="button._uid" :button="button" />
          </div>
        </div>
        <img :src="optimizedImage + filters" :alt="blok.background_image.alt" class="absolute z-0 top-0 left-0 w-full h-full pointer-events-none" :class="backgroundFit" />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const backgroundFit = computed(() => {
  return props.blok.background_fit === 'cover' ? 'object-cover' : 'object-contain'
})

const filters = computed(() => {
  const blur = props.blok.background_blur > 0 ? 'blur(' + props.blok.background_blur + ')' : ''
  const brightness = props.blok.background_brightness != 0 ? 'brightness(' + props.blok.background_brightness + ')' : ''

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

const optimizedImage = computed(() => props.blok.background_image.filename + '/m/2000x0')
</script>

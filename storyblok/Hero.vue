<template>
  <section
    class="hero-section relative overflow-hidden flex py-36"
    :class="[
      height,
      verticalAlignment,
      { '-mt-32': index == 0 },
      { 'plus-pattern': blok.pattern_overlay },
    ]"
    v-editable="blok"
  >
    <div class="container relative z-40">
      <h1
        class="text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight font-black mb-4"
        :class="[textColor, horizontalAlignment]"
      >
        {{ blok.headline }}
      </h1>
      <h2
        class="text-2xl md:text-3xl lg:text-4xl"
        :class="[textColor, horizontalAlignment]"
      >
        {{ blok.subheadline }}
      </h2>
      <div
        class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 mt-12 mx-auto"
        :class="
          props.blok.horizontal_alignment === 'left'
            ? 'items-start md:justify-start'
            : 'items-center md:justify-center'
        "
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
      class="absolute z-0 top-0 left-0 w-full h-full object-cover"
      autoplay
      muted
      loop
    ></video>
    <img
      v-else-if="!showVideo && blok.background_image.filename"
      :src="optimizedImage"
      :alt="blok.background_image.alt"
      class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none"
    />
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object, index: Number })

const height = computed(() => {
  if (props.blok.full_height) {
    return props.index > 0 ? 'min-h-[calc(100vh-128px)]' : 'min-h-screen'
  } else {
    return 'min-h-[500px] md:min-h-[700px]'
  }
})

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const horizontalAlignment = computed(() => {
  return 'text-' + props.blok.horizontal_alignment
})

const verticalAlignment = computed(() => {
  return 'items-' + props.blok.vertical_alignment
})

const optimizedImage = computed(
  () => props.blok.background_image.filename + '/m/2000x0'
)

const showVideo = computed(() => {
  if (
    props.blok.background_image.filename &&
    !props.blok.background_video.filename
  ) {
    return false
  } else if (props.blok.background_video.filename) {
    return true
  }
})
</script>

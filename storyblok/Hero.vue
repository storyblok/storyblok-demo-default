<template>
  <section class="relative min-h-[700px] overflow-hidden flex items-center py-12" v-editable="blok">
    <!--  h-[calc(100vh-128px)] -->
    <div class="container relative z-10">
      <h1 class="text-3xl md:text-7xl font-bold mb-4" :class="[textColor, textAlignment]">
        {{ blok.headline }}
      </h1>
      <h2 class="text-xl md:text-4xl font-thin" :class="[textColor, textAlignment]">
        {{ blok.subheadline }}
      </h2>
      <div class="flex flex-col space-y-8 mt-12 mx-auto" :class="props.blok.alignment === 'left' ? 'items-start' : 'items-center'">
        <Button v-for="button in blok.buttons" :key="button._uid" :button="button" />
      </div>
    </div>
    <video v-if="showVideo" :src="blok.background_video.filename" :alt="blok.background_video.alt" class="absolute z-0 top-0 left-0 w-full h-full object-cover" autoplay muted loop></video>
    <img v-else :src="blok.background_image.filename" :alt="blok.background_image.alt" class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none" :style="transform" />
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const textAlignment = computed(() => {
  return 'text-' + props.blok.alignment
})

const showVideo = computed(() => {
  if (props.blok.background_image.filename && !props.blok.background_video.filename) {
    return false
  } else if (props.blok.background_video.filename) {
    return true
  }
})

const moveY = ref(0)
const scale = ref(1)

const transform = computed(() => {
  return 'transform: translateY(' + moveY.value + 'px) scale(' + scale.value + ')'
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    moveY.value = (window.scrollY / 100) * 30
    scale.value = 1 + window.scrollY / 5000
  })
})
</script>

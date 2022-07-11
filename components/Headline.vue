<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>

<script setup>
const props = defineProps({ color: String, size: String })

const classes = computed(() => {
  let classes = 'font-bold py-2 mb-2 md:mb-3'

  if (props.size === 'small') {
    classes += ' text-3xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl'
  } else {
    classes += ' text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl'
  }

  if (props.color === 'white') {
    classes += ' text-white'
  } else {
    classes += ' text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary_highlight to-primary'
  }

  return classes
})
</script>

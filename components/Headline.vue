<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>

<script setup>
const props = defineProps({ color: String, size: String })

const classes = computed(() => {
  let classes = 'font-extrabold py-2 mb-2 md:mb-3'

  if (props.size === 'small') {
    classes += ' text-2xl sm:text-3xl md:text-4xl leading-tighter sm:leading-tighter md:leading-tighter 2xl:text-5xl'
  } else {
    classes += ' text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  }

  if (props.color === 'white') {
    classes += ' text-white'
  } else {
    classes += ' text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary_highlight to-primary'
  }

  return classes
})
</script>

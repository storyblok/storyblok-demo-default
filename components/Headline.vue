<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>

<script setup>
const props = defineProps({ color: String, size: String })

const classes = computed(() => {
  let classes =
    'font-extrabold py-2 mb-2 md:mb-3 leading-tight sm:leading-tight md:leading-tight lg:leading-tight 2xl:leading-tight'

  if (props.size === 'small') {
    classes += ' text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl'
  } else {
    classes += ' text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  }

  if (props.color === 'white') {
    classes += ' text-white'
  } else {
    classes +=
      ' text-transparent bg-clip-text bg-gradient-to-r from-primary_highlight via-primary to-primary_highlight'
  }

  return classes
})
</script>

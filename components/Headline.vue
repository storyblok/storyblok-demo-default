<template>
  <h2 class="font-bold" :class="classes">
    <slot />
  </h2>
</template>

<script setup>
const props = defineProps({ color: String, size: String })

const classes = computed(() => {
  let classes = ''

  if (props.size === 'small') {
    classes += ' text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl'
  } else {
    classes += ' text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl'
  }

  if (props.color === 'white') {
    classes += ' text-white'
  } else {
    classes += ' text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary_alt to-primary py-4'
  }

  return classes
})
</script>

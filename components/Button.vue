<template>
  <NuxtLink :to="button.link.cached_url" :class="classes" v-editable="button">
    {{ button.label }}
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ button: Object })

const type = props.button.link.linktype

const classes = computed(() => {
  let classes = 'inline-flex items-center rounded-full font-bold cursor-pointer transition-all duration-300 border border-' + props.button.button_color

  switch (props.button.size) {
    case 'small':
      classes += ' py-2 px-4 text-sm'
      break
    case 'large':
      classes += ' py-4 px-8 text-2xl'
      break
    case 'medium':
    default:
      classes += ' py-3 px-6'
      break
  }

  if (props.button.ghost == false) {
    if (props.button.button_color !== 'white') {
      classes += ' text-white'
    } else {
      classes += ' text-dark'
    }
    classes += ' hover:scale-105 transform hover:shadow-lg bg-' + props.button.button_color
  } else {
    if (props.button.button_color !== 'white') {
      classes += ' hover:text-white'
    } else {
      classes += ' hover:text-dark'
    }
    classes += ' bg-transparent text-' + props.button.button_color + ' hover:bg-' + props.button.button_color
  }

  return classes
})
</script>

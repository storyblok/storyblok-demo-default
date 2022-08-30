<template>
  <button>
    <NuxtLink
      :to="inEditor ? '' : url"
      :class="classes"
      v-editable="button"
      class="block w-full h-full"
    >
      {{ button.label }}
      <slot />
    </NuxtLink>
  </button>
</template>

<script setup>
const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok ? true : false
})

const props = defineProps({ button: Object })

const url = computed(() => {
  switch (props.button.link.linktype) {
    case 'story':
      // here we need to test if the story object exists because it won't be resolved when the bridge is used on site-config
      return '/' + props.button.link.story?.full_slug
    case 'url':
    case 'asset':
      return props.button.link.url
    case 'email':
      return 'mailto:' + props.button.link.email
    default:
      return '#'
  }
})

const classes = computed(() => {
  let classes =
    'inline-flex items-center rounded-full tracking-wider cursor-pointer transition-all duration-300 border border-' +
    props.button.button_color

  switch (props.button.size) {
    case 'small':
      classes += ' py-2 px-6 text-sm'
      break
    case 'large':
      classes += ' py-4 px-10 text-xl'
      break
    case 'medium':
    default:
      classes += ' py-3 px-8'
      break
  }

  if (props.button.style === 'default') {
    if (
      props.button.button_color !== 'white' &&
      props.button.button_color !== 'light'
    ) {
      classes += ' text-white'
    } else {
      classes += ' text-dark'
    }
    classes += ' hover:scale-105 transform bg-' + props.button.button_color
  } else {
    if (
      props.button.button_color !== 'white' &&
      props.button.button_color !== 'light'
    ) {
      classes += ' hover:text-white'
    } else {
      classes += ' hover:text-dark'
    }
    if (props.button.style === 'semi') {
      classes += ' bg-opacity-10 backdrop-blur-lg bg-white'
    } else {
      classes += ' bg-transparent'
    }
    classes +=
      ' text-' +
      props.button.button_color +
      ' hover:bg-' +
      props.button.button_color
  }

  return classes
})
</script>

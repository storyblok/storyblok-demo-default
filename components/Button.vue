<script setup>
const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok ? true : false
})

const props = defineProps({ button: Object, link: String })

const url = computed(() => {
  if (props.link) return props.link
  switch (props.button?.link?.linktype) {
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
    'inline-flex items-center tracking-wider cursor-pointer transition-all duration-300 border border-' +
    props.button.background_color

  if (props.button.border_radius) {
  }

  switch (props.button.border_radius) {
    case 'small':
      classes += ' rounded-md'
      break
    case 'default':
    default:
      classes += ' rounded-full'
  }

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

  switch (props.button.style) {
    case 'semi':
      classes +=
        ' bg-opacity-10 backdrop-blur-lg bg-white hover:bg-opacity-20 text-' +
        props.button.background_color
      break
    case 'ghost':
      classes +=
        ' bg-transparent text-' +
        props.button.background_color +
        ' hover:bg-' +
        props.button.background_color +
        ' hover:text-' +
        props.button.text_color
      break
    case 'default':
    default:
      classes +=
        ' hover:scale-105 transform bg-' +
        props.button.background_color +
        ' text-' +
        props.button.text_color
  }

  return classes
})
</script>

<template>
  <button>
    <NuxtLink
      :to="inEditor ? '' : url"
      :class="classes"
      v-editable="button"
      class="block h-full w-full"
    >
      {{ button.label }}
      <slot />
    </NuxtLink>
  </button>
</template>

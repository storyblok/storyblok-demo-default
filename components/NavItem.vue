<template>
  <NuxtLink :to="url" class="transition-colors cursor-pointer" v-editable="item">
    {{ item.label }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ item: Object })

const url = computed(() => {
  switch (props.item.link.linktype) {
    case 'story':
      return '/' + props.item.link.story.full_slug
    case 'url':
    case 'asset':
      return props.item.link.url
    case 'email':
      return 'mailto:' + props.item.link.email
    default:
      return '#'
  }
})
</script>

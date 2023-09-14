<script setup>
const props = defineProps({ blok: Object })

const route = useRoute()

const visitedPaths = useCookie('visitedPaths', { default: () => [] })
const visitor = ref('new_visitor')

if (route.query.path && !visitedPaths.value.includes(route.query.path)) {
  // add current path to cookie array
  visitedPaths.value?.push(route.query.path)
} else {
  // user already visited this path
  visitor.value = 'returning_visitor'
}

const show = computed(() =>
  // if in Visual Editor, allow previewing of content for both scenarios, otherwise show content depending on cookie value
  route.query._storyblok ? props.blok.preview : visitor.value,
)
</script>

<template>
  <div v-if="show === 'new_visitor'">
    <StoryblokComponent v-for="blok in blok.new_visitor_blocks" :blok="blok" />
  </div>
  <div v-else>
    <StoryblokComponent
      v-for="blok in blok.returning_visitor_blocks"
      :blok="blok"
    />
  </div>
</template>

<script setup>
//const story = await useStoryblok("test", { version: "draft" });

const story = ref()

const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/test', {
  version: 'draft',
  resolve_links: 'url',
})

story.value = data.story

onMounted(() => {
  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory))
})
</script>

<template>
  <div v-editable="story.content">
    <pre>{{ story.content.test_text }}</pre>
  </div>
</template>

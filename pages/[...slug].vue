<script setup>
definePageMeta({
  layout: false,
})

const slug = await getSlug()
const processedSlug = await getProcessedSlug()
const language = await getLanguage(slug)
const releaseId = await getReleaseId()
const resolveRelations = [
  'banner-reference.banners',
  'featured-articles-section.articles',
  'article-page.categories',
  'article-page.author',
]
const story = ref(null)
const storyblokApi = useStoryblokApi()

const apiParams = {
  version: 'draft',
  language: language,
  fallback_lang: 'default',
  resolve_relations: resolveRelations,
  resolve_links: 'url',
  from_release: releaseId,
}

const error404 = ref(false)
const { customParent } = useRuntimeConfig().public

try {
  try {
    if (processedSlug === 'error-404') error404.value = true
    const { data } = await storyblokApi.get(
      'cdn/stories/' + processedSlug,
      apiParams,
    )
    story.value = data.story
  } catch (error) {
    if (error.status === 404) error404.value = true
    const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
    story.value = data.story
  }

  onMounted(() => {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations: resolveRelations,
      customParent,
      preventClicks: false,
    })
  })
} catch (error) {
  console.log(error)
}
</script>

<template>
  <NuxtLayout
    name="default"
    :story-uuid="story.uuid"
    :story-full-slug="story.full_slug"
  >
    <Error404 v-if="error404">
      Unfortunately, this page could not be found.
    </Error404>
    <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
  </NuxtLayout>
</template>

<script setup>
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
    const { status } = JSON.parse(error)
    if (status === 404) error404.value = true
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

const enableBreadcrumbs = useState('enableBreadcrumbs')
const breadcrumbsExcludedStories = useState('breadcrumbsExcludedStories')
const enableBreadcrumbsForStory = computed(() => {
  if (processedSlug.startsWith('site-config')) return false
  if (error404.value === true) return false
  if (!enableBreadcrumbs.value) return false
  const found = breadcrumbsExcludedStories.value.find(
    (storyUuid) => storyUuid === story.value.uuid,
  )
  if (!found) return true
})
const breadCrumbsAltStyle = computed(
  () => processedSlug.startsWith('articles/') && processedSlug.length > 9,
)
</script>

<template>
  <Error404 v-if="error404">
    Unfortunately, this page could not be found.
  </Error404>
  <Breadcrumbs
    v-if="enableBreadcrumbsForStory"
    :slug="processedSlug"
    :alt-style="breadCrumbsAltStyle"
  />
  <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
</template>

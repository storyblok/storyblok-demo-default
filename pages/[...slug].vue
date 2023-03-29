<script setup>
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */

// Here we are getting the path as a URL parameter
let slug = []
if (route.query.path) {
  slug = route.query.path?.split('/')
} else {
  // fallback if no path parameter found (e.g. in template space)
  slug = route.params.slug.slice()
}
// In your project you would typically want to do the following:
// let slug = route.params.slug.slice()
let language = 'default'

if (slug) {
  language = await getLanguage(slug)
  // remove first slug entry if it matches query language
  if (language !== 'default') slug = slug.slice(1)
  slug = slug.join('/')
} else {
  slug = 'home'
}

/**
 * Fetch current release
 */
const releaseId = route.query?._storyblok_release || 0

/**
 * Resolve relations
 */
let resolveRelations = [
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
    if (slug === 'error-404') error404.value = true
    const { data } = await storyblokApi.get('cdn/stories/' + slug, apiParams)
    story.value = data.story
  } catch (error) {
    if (error.response.status === 404) error404.value = true
    const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
    story.value = data.story
  }

  onMounted(() => {
    if (slug[0] !== undefined && slug[0] === 'site-config') return
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations: resolveRelations,
      customParent,
    })
  })
} catch (error) {
  console.log(error)
}
</script>

<template>
  <Error404 v-if="error404">
    Unfortunately, this page could not be found.
  </Error404>
  <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
</template>

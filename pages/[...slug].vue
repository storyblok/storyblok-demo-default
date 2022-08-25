<script setup>
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */

// Here we are getting the path as a URL parameter
let slug = route.query.path?.split('/')
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
 * Resolve relations
 */
let resolveRelations = [
  'banner-reference.banner',
  'featured-articles-section.articles',
]

// resolve relations for all article single views, exclude article overview page
if (slug.includes('articles') && slug.length > 1) {
  resolveRelations.push('article-page.categories', 'article-page.author')
}

const story = ref(null)
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/' + slug, {
  version: 'draft',
  language: language,
  fallback_lang: 'default',
  resolve_relations: resolveRelations,
  resolve_links: 'url',
})

story.value = data.story

/**
 * Use Bridge
 */
onMounted(() => {
  if (slug[0] !== undefined && slug[0] === 'site-config') return
  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
    resolveRelations: resolveRelations,
  })
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
</template>

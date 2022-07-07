<script setup>
const route = useRoute()
const languageCodes = ref()
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/spaces/me')
languageCodes.value = data.space.language_codes

/**
 * Create correct slug and handle language parameter
 */
let slug = route.params.slug
let language = 'default'

if (slug) {
  if (languageCodes.value.includes(slug[0])) {
    // set correct language
    language = slug[0]
    // remove first slug entry if it matches query language
    slug.shift()
  }
  slug = slug.join('/')
} else {
  slug = 'home'
}

/**
 * Resolve relations
 */
let resolveRelations = ['banner-reference.banner', 'featured-articles-section.articles']

// resolve relations for all article single views, exclude article overview page
if (slug.includes('articles') && slug.length > 1) {
  resolveRelations.push('article-page.categories', 'article-page.author')
}

/**
 * Fetch story
 */
const story = await useStoryblok(
  slug,
  {
    version: 'draft',
    language: language,
    fallback_lang: 'default',
    resolve_relations: resolveRelations,
  },
  {
    resolveRelations: resolveRelations,
  }
)
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

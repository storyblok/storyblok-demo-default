<script setup>
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */
let slug = route.params.slug.slice()
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
  <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
</template>

<script setup>
const route = useRoute()

/**
 * Handle language parameter
 */
let language = 'default'
if (route.query._storyblok_lang && route.query._storyblok_lang !== 'default') {
  language = route.query._storyblok_lang
}

/**
 * Create correct slug
 */
let slug = route.params.slug

if (slug) {
  // remove first slug entry if it matches query language
  if (slug[0] === language) slug.shift()
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

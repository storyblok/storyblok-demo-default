<script setup>
let { slug } = useRoute().params

let resolveRelations = ['banner-reference.banner']

// resolve relations for all article single views, exclude article overview page
if (slug.includes('articles') && slug.length > 1) {
  resolveRelations.push('article-page.categories', 'article-page.author')
}

if (slug) {
  slug = slug.join('/')
} else if (slug === 'site-config') {
  slug = 'home'
} else {
  slug = 'home'
}

const story = await useStoryblok(slug, {
  version: 'draft',
  resolve_relations: resolveRelations,
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

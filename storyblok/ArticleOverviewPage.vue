<template>
  <main class="container py-12 md:py-16" v-editable="blok">
    <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 my-16">
      <ArticleCard
        v-for="article in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
        class="bg-light"
      />
    </div>
  </main>
</template>

<script setup>
defineProps({ blok: Object })

let { slug } = useRoute().params
let language = 'default'

if (slug) language = await getLanguage(slug)

const articles = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/', {
  version: 'draft',
  starts_with: 'articles',
  language: language,
  fallback_lang: 'default',
})
articles.value = data.stories.filter((story) => story.is_startpage !== true)
</script>

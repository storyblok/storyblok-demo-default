<template>
  <main class="container" v-editable="blok">
    <Headline>{{ blok.headline }}</Headline>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12-12 my-16">
      <ArticleCard v-for="article in articles" :key="article.uuid" :article="article.content" :slug="article.full_slug" />
    </div>
  </main>
</template>

<script setup>
defineProps({ blok: Object })

const articles = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/', {
  version: 'draft',
  starts_with: 'articles',
})
articles.value = data.stories.filter((story) => story.is_startpage !== true)
</script>

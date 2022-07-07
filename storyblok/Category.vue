<template>
  <main class="container py-12 md:py-16" v-editable="blok">
    <Headline>{{ blok.headline }}</Headline>
    <Lead>{{ blok.description }}</Lead>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12 my-16">
      <ArticleCard
        v-for="article in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </main>
</template>
<script setup>
const props = defineProps({ blok: Object, uuid: String })

const articles = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get(`cdn/stories/`, {
  version: 'draft',
  starts_with: 'articles',
  filter_query: {
    categories: {
      in_array: props.uuid,
    },
  },
})

articles.value = data.stories
</script>

<script setup>
const props = defineProps({ blok: Object, uuid: String })

let { slug } = useRoute().params
let language = 'default'

if (slug) language = await getLanguage(slug)

const articles = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get(`cdn/stories/`, {
  version: getVersion(),
  starts_with: 'articles',
  filter_query: {
    categories: {
      in_array: props.uuid,
    },
  },
  language: language,
  fallback_lang: 'default',
})

articles.value = data.stories
</script>

<template>
  <main class="container py-12 md:py-16" v-editable="blok">
    <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
    <Lead v-if="blok.description">{{ blok.description }}</Lead>
    <div
      class="my-16 grid place-items-center gap-6 sm:gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
    >
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

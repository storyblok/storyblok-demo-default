<template>
  <main class="container py-12 md:py-16" v-editable="blok">
    <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
    <section class="flex my-16">
      <section
        class="flex-col space-y-6 md:w-[210px] xl:w-[240px] flex-shrink-0 md:mr-6 xl:mr-12 hidden invisible md:visible md:flex"
      >
        <div>
          <label for="search" class="block font-medium text-lg mb-3"
            >Search for a term</label
          >
          <input
            type="search"
            name="search"
            id="search"
            v-model="searchTerm"
            class="border border-medium px-4 py-2 rounded-full focus:outline-none"
          />
        </div>
        <fieldset>
          <legend class="font-medium text-lg mb-3">Select a category</legend>
          <div class="flex flex-col space-y-3">
            <div
              v-for="category in categories"
              :key="category.uuid"
              class="checkbox flex"
            >
              <input
                type="checkbox"
                :id="category.uuid"
                :name="category.uuid"
                :value="category.uuid"
                v-model="checkedCategories"
                class="hidden invisible"
              />
              <Indicator />
              <label :for="category.uuid">{{ category.name }}</label>
            </div>
          </div>
        </fieldset>
        <div>
          <fieldset>
            <legend class="font-medium text-lg mb-3">Select an author</legend>
            <div class="flex flex-col space-y-3">
              <div
                v-for="author in authors"
                :key="author.uuid"
                class="radio flex"
              >
                <input
                  type="radio"
                  :id="author.uuid"
                  name="author"
                  v-model="checkedAuthor"
                  :value="author.uuid"
                  class="hidden invisible"
                />
                <Indicator />
                <label :for="author.uuid">{{ author.name }}</label>
              </div>
            </div>
          </fieldset>
        </div>
        <div>
          <Button
            :button="button1"
            @click.prevent="fetchArticles()"
            class="mt-4"
            >Apply filters</Button
          >
        </div>
        <div>
          <Button :button="button2" @click.prevent="resetFilters()"
            >Reset filters</Button
          >
        </div>
      </section>
      <section
        v-if="!loading && articles.length"
        class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-12"
      >
        <ArticleCard
          v-for="article in articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
          class="bg-light"
        />
      </section>
      <section v-else-if="!loading && !articles.length">
        Unfortunately, no articles matched your criteria.
      </section>
    </section>
  </main>
</template>

<script setup>
defineProps({ blok: Object })

let { slug } = useRoute().params
let language = 'default'

if (slug) language = await getLanguage(slug)

// filters
const searchTerm = ref('')
const checkedCategories = ref([])
const checkedAuthor = ref('')

const filterQuery = computed(() => {
  let query = {}

  if (checkedCategories.value.length > 0) {
    query.categories = {
      in_array: checkedCategories.value.join(','),
    }
  }

  if (checkedAuthor.value !== '') {
    query.author = {
      in: checkedAuthor.value,
    }
  }

  return query
})

const resetFilters = () => {
  searchTerm.value = ''
  checkedCategories.value = []
  checkedAuthor.value = ''
  fetchArticles()
}

const storyblokApi = useStoryblokApi()

const loading = ref(true)

const articles = ref(null)

const fetchArticles = async () => {
  loading.value = true
  articles.value = null
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: 'draft',
    starts_with: 'articles',
    language: language,
    fallback_lang: 'default',
    search_term: searchTerm.value,
    filter_query: filterQuery.value,
  })
  articles.value = data.stories.filter((story) => story.is_startpage !== true)
  loading.value = false
}

fetchArticles()

// Get all authors
const authors = ref(null)

const getAuthors = async () => {
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: 'draft',
    starts_with: 'authors',
  })
  authors.value = data.stories
}

getAuthors()

// Get all categories
const categories = ref(null)

const getCategories = async () => {
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: 'draft',
    starts_with: 'categories',
  })
  categories.value = data.stories.filter((story) => story.is_startpage !== true)
}

getCategories()

const button1 = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'default',
  button_color: 'primary',
}

const button2 = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'ghost',
  button_color: 'medium',
}
</script>

<style scoped>
.checkbox :deep(div.indicator > svg),
.radio :deep(div.indicator > svg) {
  @apply invisible hidden;
}
.checkbox :deep(input:checked + div.indicator > sv)g,
.radio :deep(input:checked + div.indicator > svg) {
  @apply visible block;
}
</style>

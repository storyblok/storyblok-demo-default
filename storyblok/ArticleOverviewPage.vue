<script setup>
defineProps({ blok: Object })

let { slug } = useRoute().params
let language = 'default'

if (slug) language = await getLanguage(slug)

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

watch(searchTerm, () => {
  fetchArticles()
})

watch(checkedCategories, () => {
  fetchArticles()
})

watch(checkedAuthor, () => {
  fetchArticles()
})

const storyblokApi = useStoryblokApi()

const loading = ref(true)

const articles = ref(null)

const fetchArticles = async () => {
  loading.value = true
  articles.value = null
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: getVersion(),
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

const authors = ref(null)

const getAuthors = async () => {
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: getVersion(),
    starts_with: 'authors',
  })
  authors.value = data.stories
}

getAuthors()

const categories = ref(null)

const getCategories = async () => {
  const { data } = await storyblokApi.get('cdn/stories/', {
    version: getVersion(),
    starts_with: 'categories',
  })
  categories.value = data.stories.filter((story) => story.is_startpage !== true)
}

getCategories()

const button = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'ghost',
  text_color: 'light',
  background_color: 'dark',
}
</script>

<template>
  <main class="container py-12 md:py-16" v-editable="blok">
    <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
    <section class="my-16 flex text-dark">
      <aside
        class="invisible hidden flex-shrink-0 flex-col space-y-6 md:visible md:mr-6 md:flex md:w-[210px] xl:mr-12 xl:w-[240px]"
      >
        <div>
          <label for="search" class="mb-3 block text-lg font-medium">
            Search for a term
          </label>
          <input
            type="search"
            name="search"
            id="search"
            v-model="searchTerm"
            class="rounded-full border border-dark px-4 py-2 focus:outline-none"
            @keypress.enter="fetchArticles()"
          />
        </div>
        <fieldset>
          <legend class="mb-3 text-lg font-medium">Select a category</legend>
          <div class="flex flex-col space-y-3">
            <label
              v-for="category in categories"
              :key="category.uuid"
              :for="category.uuid"
              class="checkbox flex"
            >
              <input
                type="checkbox"
                :id="category.uuid"
                :name="category.uuid"
                :value="category.uuid"
                v-model="checkedCategories"
                class="invisible hidden"
              />
              <Indicator />
              <span>{{ category.name }}</span>
            </label>
          </div>
        </fieldset>
        <div>
          <fieldset>
            <legend class="mb-3 text-lg font-medium">Select an author</legend>
            <div class="flex flex-col space-y-3">
              <label
                v-for="author in authors"
                :key="author.uuid"
                :for="author.uuid"
                class="radio flex"
              >
                <input
                  type="radio"
                  :id="author.uuid"
                  name="author"
                  v-model="checkedAuthor"
                  :value="author.uuid"
                  class="invisible hidden"
                />
                <Indicator />
                <span>{{ author.name }}</span>
              </label>
            </div>
          </fieldset>
        </div>
        <div>
          <Button :button="button" @click.prevent="resetFilters()" class="mt-4">
            Reset filters
          </Button>
        </div>
      </aside>

      <section
        v-if="!loading && articles.length"
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-12"
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

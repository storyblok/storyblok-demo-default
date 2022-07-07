<template>
  <article v-editable="blok">
    <header class="w-full h-[300px] sm:h-[400px] md:h-[600px]">
      <img
        v-if="blok.image.filename"
        :src="optimizedArticleImage"
        :alt="blok.image.alt"
        class="w-full h-full object-cover pointer-events-none"
      />
    </header>
    <main class="relative container py-12 md:py-16 lg:flex lg:items-start">
      <section class="mb-12 lg:mb-0 lg:pr-32">
        <Headline>{{ blok.headline }}</Headline>
        <Subheadline class="mb-6">{{ blok.subheadline }}</Subheadline>
        <Lead>{{ blok.teaser }}</Lead>
        <RichText :text="blok.text" />
      </section>
      <section class="sticky top-32 w-[300px] shrink-0 flex flex-col space-y-6">
        <div class="flex flex-col space-y-3">
          <div class="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
            <h4 class="font-bold text-lg">Categories</h4>
          </div>
          <ul class="flex flex-col space-y-2">
            <li v-for="cat in blok.categories" :key="cat.uuid">
              <NuxtLink :to="'/' + cat.full_slug"
                ><h5 class="text-secondary hover:text-primary transition-all">{{ cat.name }}</h5></NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="flex flex-col space-y-3">
          <div class="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
            <h4 class="font-bold text-lg">Author</h4>
          </div>
          <div class="flex items-center space-x-2">
            <img
              v-if="blok.author.content.profile_picture.filename"
              :src="optimizedAuthorImage"
              :alt="blok.author.content.profile_picture.alt"
              class="w-20 h-20 rounded-full object-cover pointer-events-none border border-secondary"
            />
            <h5 class="text-secondary">{{ blok.author.name }}</h5>
            <div>{{ blok.author.content.description }}</div>
          </div>
        </div>
      </section>
    </main>
  </article>
</template>

<script setup>
const props = defineProps({ blok: Object })

const route = useRoute()

const optimizedArticleImage = computed(() => props.blok.image.filename + '/m/2000x0')
const optimizedAuthorImage = computed(() => props.blok.author.content.profile_picture.filename + '/m/80x0')
</script>

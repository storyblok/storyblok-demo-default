<template>
  <article v-editable="blok">
    <header
      class="relative w-full h-[75vh] lg:h-screen flex items-end pb-40 lg:pb-80 -mt-32 plus-pattern"
    >
      <img
        v-if="blok.image.filename"
        :src="optimizedArticleImage"
        :alt="blok.image.alt"
        class="absolute top-0 left-0 z-0 w-full h-full object-cover pointer-events-none"
      />
      <div v-if="blok.headline" class="container text-white relative z-10">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight font-black mb-4"
        >
          {{ blok.headline }}
        </h1>
      </div>
    </header>
    <main class="relative z-50 container">
      <div
        class="lg:flex lg:items-start bg-white bg-opacity-80 backdrop-blur-lg -mt-32 lg:-mt-64 rounded-lg p-6 lg:p-12"
      >
        <section class="mb-12 lg:mb-0 lg:pr-32">
          <Headline v-if="blok.subheadline" size="small" class="mb-10">{{
            blok.subheadline
          }}</Headline>
          <Lead v-if="blok.teaser" class="mb-10">{{ blok.teaser }}</Lead>
          <RichText :text="blok.text" />
        </section>
        <section
          class="sticky top-32 w-full max-w-[300px] shrink-0 flex flex-col space-y-6"
        >
          <div class="flex flex-col space-y-1.5 bg-light p-4 rounded-lg">
            <h4 class="font-normal tracking-wide uppercase text-medium text-sm">
              Categories
            </h4>
            <ul class="flex flex-col space-y-1.5">
              <li v-for="cat in blok.categories" :key="cat.uuid">
                <NuxtLink :to="'/' + cat.full_slug"
                  ><h5 class="text-primary hover:text-secondary transition-all">
                    {{ cat.name }}
                  </h5></NuxtLink
                >
              </li>
            </ul>
          </div>
          <div
            v-if="blok.author"
            class="flex flex-col space-y-3 bg-light p-4 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <img
                v-if="blok.author.content.profile_picture.filename"
                :src="optimizedAuthorImage"
                :alt="blok.author.content.profile_picture.alt"
                class="w-24 h-24 rounded-full object-cover pointer-events-none"
              />
              <div>
                <h4 class="font-normal tracking-wide uppercase text-sm mb-1.5">
                  Author
                </h4>
                <h5 class="text-secondary">{{ blok.author.name }}</h5>
              </div>
            </div>
            <div class="text-sm leading-relaxed font-light">
              {{ blok.author.content.description }}
            </div>
          </div>
        </section>
      </div>
    </main>
  </article>
</template>

<script setup>
const props = defineProps({ blok: Object })

const optimizedArticleImage = computed(
  () => props.blok.image.filename + '/m/2000x0'
)
const optimizedAuthorImage = computed(
  () => props.blok.author.content.profile_picture.filename + '/m/200x0'
)
</script>

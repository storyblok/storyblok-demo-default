<script setup>
const props = defineProps({ blok: Object })

const optimizedArticleImage = computed(
  () => props.blok.image.filename + '/m/2000x0'
)
const optimizedAuthorImage = computed(
  () => props.blok.author.content.profile_picture.filename + '/m/200x0'
)
</script>

<template>
  <article v-editable="blok">
    <header
      class="plus-pattern relative -mt-32 flex h-[75vh] w-full items-end pb-40 lg:h-screen lg:pb-80"
    >
      <img
        v-if="blok.image.filename"
        :src="optimizedArticleImage"
        :alt="blok.image.alt"
        class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
      <div v-if="blok.headline" class="container relative z-10 text-white">
        <h1
          class="mb-4 text-2xl font-black leading-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight"
        >
          {{ blok.headline }}
        </h1>
      </div>
    </header>
    <main class="container relative z-50">
      <div
        class="-mt-32 rounded-lg bg-white bg-opacity-80 p-6 backdrop-blur-lg lg:-mt-64 lg:flex lg:items-start lg:p-12"
      >
        <section class="mb-12 w-full lg:mb-0 lg:pr-32">
          <Headline v-if="blok.subheadline" size="small" class="mb-10">
            {{ blok.subheadline }}
          </Headline>
          <Lead v-if="blok.teaser" class="mb-10">{{ blok.teaser }}</Lead>
          <RichText :text="blok.text" />
        </section>
        <section
          class="sticky top-32 flex w-full max-w-[300px] shrink-0 flex-col space-y-6"
        >
          <div class="flex flex-col space-y-1.5 rounded-lg bg-light p-4">
            <h4 class="text-sm font-normal uppercase tracking-wide text-medium">
              Categories
            </h4>
            <ul class="flex flex-col space-y-1.5">
              <li v-for="cat in blok.categories" :key="cat.uuid">
                <NuxtLink :to="'/' + cat.full_slug">
                  <h5 class="text-primary transition-all hover:text-secondary">
                    {{ cat.name }}
                  </h5>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div
            v-if="blok.author"
            class="flex flex-col space-y-3 rounded-lg bg-light p-4"
          >
            <div class="flex items-center space-x-3">
              <img
                v-if="blok.author.content.profile_picture.filename"
                :src="optimizedAuthorImage"
                :alt="blok.author.content.profile_picture.alt"
                class="pointer-events-none h-24 w-24 rounded-full object-cover"
              />
              <div>
                <h4 class="mb-1.5 text-sm font-normal uppercase tracking-wide">
                  Author
                </h4>
                <h5 class="text-secondary">{{ blok.author.name }}</h5>
              </div>
            </div>
            <div class="text-sm font-light leading-relaxed">
              {{ blok.author.content.description }}
            </div>
          </div>
        </section>
      </div>
    </main>
  </article>
</template>

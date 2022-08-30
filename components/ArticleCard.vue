<template>
  <NuxtLink
    :to="inEditor ? '' : '/' + slug"
    v-if="article"
    class="max-w-md flex flex-col h-full rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg group"
  >
    <div class="w-full h-[210px] xl:h-[300px] overflow-hidden">
      <img
        :src="optimizedImage"
        :alt="article.image && article.image.alt"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="grow p-6 text-left">
      <h3 class="text-dark font-medium mb-3 text-xl">
        {{ article.headline }}
      </h3>
      <div class="line-clamp-3 font-light leading-relaxed">
        {{ article.teaser }}
      </div>
    </div>
    <div class="flex text-primary justify-between px-6 py-3">
      <span class="uppercase font-light tracking-widest">Read</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ article: Object, slug: String })

const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok ? true : false
})

const optimizedImage = computed(
  () => props.article?.image?.filename + '/m/400x0'
)
</script>

<template>
  <NuxtLink
    :to="'/' + slug"
    v-if="article"
    class="max-w-md flex flex-col h-full rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl group"
  >
    <div class="w-full h-[210px] xl:h-[300px] overflow-hidden">
      <img
        :src="optimizedImage"
        :alt="article.image && article.image.alt"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="grow p-6 text-left">
      <h3 class="text-secondary font-medium mb-3 text-xl">
        {{ article.headline }}
      </h3>
      <div class="line-clamp-3 font-light leading-relaxed">
        {{ article.teaser }}
      </div>
    </div>
    <div class="flex text-secondary justify-between px-6 py-3">
      <span class="uppercase font-light tracking-widest">Read</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 group-hover:translate-x-3 transition-transform duration-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ article: Object, slug: String })

const optimizedImage = computed(
  () => props.article?.image?.filename + '/m/400x0'
)
</script>

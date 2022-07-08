<template>
  <NuxtLink
    :to="'/' + slug"
    class="flex flex-col bg-light rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
  >
    <div class="w-full h-[180px] overflow-hidden">
      <img
        :src="optimizedImage"
        :alt="article.image.alt"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="p-4">
      <h3 class="text-secondary font-bold mb-4 text-xl">{{ article.headline }}</h3>
      <div class="line-clamp-3">{{ article.teaser }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ article: Object, slug: String })

const optimizedImage = computed(() => props.article.image.filename + '/m/400x0')
</script>

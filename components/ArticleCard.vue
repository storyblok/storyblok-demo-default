<template>
  <NuxtLink :to="'/' + slug" class="flex flex-col bg-zinc-100 rounded-3xl overflow-hidden group">
    <div class="w-full h-[180px] overflow-hidden">
      <img :src="article.image.filename" :alt="article.image.alt" class="w-full h-full object-cover group-hover:scale-125 transition-all duration-700 transform" />
    </div>
    <div class="p-4">
      <h3 class="text-secondary font-bold mb-4 text-xl">{{ article.headline }}</h3>
      <div class="line-clamp-3">{{ article.teaser }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ article: Object, slug: String })
</script>

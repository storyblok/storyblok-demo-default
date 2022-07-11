<template>
  <section v-editable="blok" class="page-section grid-section" :class="'bg-' + blok.background_color">
    <div class="container text-center">
      <Headline>{{ blok.headline }}</Headline>
      <Lead>
        {{ blok.lead }}
      </Lead>
      <div :class="gridClasses">
        <ArticleCard
          v-for="article in blok.articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const gridClasses = computed(() => {
  let gridClasses = 'grid md:grid-cols-2 gap-6 sm:gap-10 md:gap-12 md:mt-12 place-items-center'

  switch (props.blok.cols) {
    case '4':
      gridClasses += ' lg:grid-cols-3 xl:grid-cols-4'
      break
    case '3':
      gridClasses += ' lg:grid-cols-3'
      break
  }

  return gridClasses
})
</script>

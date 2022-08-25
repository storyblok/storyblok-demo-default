<template>
  <section
    v-editable="blok"
    class="page-section grid-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-center">
      <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <div :class="gridClasses">
        <ArticleCard
          v-for="article in blok.articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
          :class="gridCardColor"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const gridCardColor = computed(() => {
  let color = 'bg-light'
  if (props.blok.background_color === 'light') color = 'bg-white'
  return color
})

const gridClasses = computed(() => {
  let gridClasses =
    'grid md:grid-cols-2 gap-10 md:gap-12 md:mt-12 place-items-center items-start'

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

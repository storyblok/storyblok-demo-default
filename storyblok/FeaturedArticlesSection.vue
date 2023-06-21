<script setup>
import getGridClasses from '~~/composables/getGridClasses'

const props = defineProps({ blok: Object })

const gridCardColor = computed(() => {
  let color = 'bg-light'
  if (props.blok.background_color === 'light') color = 'bg-white'
  return color
})

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

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

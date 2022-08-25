<template>
  <section
    v-editable="blok"
    class="page-section grid-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-center">
      <Headline v-if="blok.headline" class="mb-4">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <div :class="gridClasses">
        <GridCard
          v-for="card in blok.cards"
          :key="card._uid"
          :card="card"
          :class="gridCardColor"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object })

const gridCardColor = computed(() => {
  return props.blok.background_color === 'light' ? 'bg-white' : 'bg-light'
})

const gridClasses = computed(() => {
  let gridClasses =
    'grid md:grid-cols-2 gap-10 md:gap-12 place-items-center items-start mt-16'

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

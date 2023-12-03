<script setup>
const props = defineProps({ blok: Object })

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.image, 800, 450),
)
</script>
<template>
  <section class="grid gap-6 pb-6 text-dark md:grid-cols-2" v-editable="blok">
    <img
      v-if="blok?.image?.filename"
      :src="optimizedImage"
      :alt="blok.image?.alt"
      class="rounded-lg md:order-1"
    />
    <div class="md:order-0">
      <p>{{ blok.description }}</p>
      <Button
        v-for="button in blok.button"
        class="mt-6"
        :key="button._uid"
        :button="button"
      />
    </div>
  </section>
</template>

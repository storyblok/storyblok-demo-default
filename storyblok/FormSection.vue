<script setup>
import ContactForm from '../components/ContactForm.vue'
import NewsletterForm from '../components/NewsletterForm.vue'

const props = defineProps({ blok: Object })

const textColor = computed(() => {
  return props.blok.text_color === 'light' ? 'text-white' : 'text-dark'
})

const backgroundColor = computed(() => {
  return 'bg-' + props.blok.background_color
})

const selectedForm = computed(() => {
  switch (props.blok.form) {
    case 'newsletter':
      return NewsletterForm
    case 'contact':
    default:
      return ContactForm
  }
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section form-section relative"
    :class="backgroundColor"
  >
    <div
      class="container relative z-10 grid place-items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div class="text-center text-white lg:text-left">
        <Headline
          v-if="blok.headline"
          class="mb-4"
          :color="blok.text_color === 'light' ? 'white' : 'dark'"
        >
          {{ blok.headline }}
        </Headline>
        <Lead v-if="blok.lead" :class="textColor">{{ blok.lead }}</Lead>
      </div>
      <div class="w-full max-w-md">
        <component :is="selectedForm" :textColor="textColor" />
      </div>
    </div>
  </section>
</template>

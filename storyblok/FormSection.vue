<script setup>
import ContactForm from '../components/ContactForm.vue'
import NewsletterForm from '../components/NewsletterForm.vue'

const props = defineProps({ blok: Object })

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
  <section v-editable="blok" class="page-section form-section relative bg-dark">
    <div
      class="container relative z-10 grid place-items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div class="text-center text-white lg:text-left">
        <Headline v-if="blok.headline" class="mb-4" color="white">
          {{ blok.headline }}
        </Headline>
        <Lead v-if="blok.lead">{{ blok.lead }}</Lead>
      </div>
      <div class="w-full max-w-md">
        <component :is="selectedForm" />
      </div>
    </div>
  </section>
</template>

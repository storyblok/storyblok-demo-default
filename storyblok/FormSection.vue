<template>
  <section v-editable="blok" class="relative page-section form-section bg-dark">
    <div
      class="container relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 place-items-center"
    >
      <div class="text-center lg:text-left text-white">
        <Headline v-if="blok.headline" class="mb-4" color="white">{{
          blok.headline
        }}</Headline>
        <Lead v-if="blok.lead">{{ blok.lead }}</Lead>
      </div>
      <div class="w-full max-w-md">
        <component :is="selectedForm" />
      </div>
    </div>
  </section>
</template>

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

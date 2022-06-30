<template>
  <section v-editable="blok" class="relative page-section form-section bg-dark">
    <div class="container relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 place-items-center">
      <div class="text-center lg:text-left text-white">
        <Headline class="mb-4" color="white">{{ blok.headline }}</Headline>
        <Lead>
          {{ blok.lead }}
        </Lead>
      </div>
      <div class="w-full max-w-md">
        <component :is="selectedForm" />
      </div>
    </div>
    <img src="https://a.storyblok.com/f/163682/2880x1490/d29080cc4c/tailwind-salient-background.png/m/2000x0" alt="" class="object-cover absolute z-0 top-0 left-0 w-full h-full pointer-events-none" />
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

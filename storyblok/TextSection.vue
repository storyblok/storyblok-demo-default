<script setup>
const props = defineProps({ blok: Object })

const containerColor = computed(() => {
  return props.blok.background_color === 'light' ? 'bg-white' : 'bg-light'
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section text-section relative z-50"
    :class="[
      'bg-' + blok.background_color,
      { 'overlap-preceding-hero': blok.overlap_preceding_hero },
    ]"
  >
    <div class="container">
      <div
        class="mx-auto w-full max-w-7xl rounded-lg p-12 md:py-24"
        :class="[
          containerColor,
          { ' text-center': blok.alignment === 'center' },
        ]"
      >
        <Headline v-if="blok.headline" class="mb-4">
          {{ blok.headline }}
        </Headline>
        <Lead v-if="blok.lead">
          {{ blok.lead }}
        </Lead>
        <RichText
          :text="blok.text"
          :class="{ 'mx-auto': blok.alignment === 'center' }"
        />
        <div
          v-if="blok.button.length"
          class="mt-8 inline-flex gap-6"
          :class="[{ ' mx-auto': blok.alignment === 'center' }]"
        >
          <Button
            v-for="button in blok.button"
            :key="button._uid"
            :button="button"
          />
        </div>
      </div>
    </div>
  </section>
</template>

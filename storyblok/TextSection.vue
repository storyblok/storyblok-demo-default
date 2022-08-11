<template>
  <section
    v-editable="blok"
    class="page-section text-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <div
        class="max-w-3xl"
        :class="{ 'mx-auto text-center': blok.alignment === 'center' }"
      >
        <Headline v-if="blok.headline" class="mb-4">{{
          blok.headline
        }}</Headline>
        <Lead v-if="blok.lead">
          {{ blok.lead }}
        </Lead>
        <RichText
          :text="blok.text"
          :class="{ 'mx-auto': blok.alignment === 'center' }"
        />
        <div class="mt-8">
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

<script setup>
const props = defineProps({ blok: Object });
</script>

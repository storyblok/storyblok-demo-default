<template>
  <div
    class="w-full max-w-md lg:max-w-none h-full flex flex-col rounded-lg p-6 shadow-sm"
    v-editable="card"
  >
    <img
      v-if="card.icon.filename"
      :src="card.icon.filename"
      :alt="card.icon.alt"
      class="w-20 mx-auto mb-6 pointer-events-none"
    />
    <div class="flex flex-col grow">
      <div class="grow">
        <h3 class="text-dark font-medium mb-3 text-xl">
          {{ card.label }}
        </h3>
        <div class="font-light leading-relaxed">{{ card.text }}</div>
      </div>
      <div v-if="card.button.length" class="mt-4">
        <Button
          v-for="button in card.button"
          :key="button._uid"
          :button="button"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ card: Object })
</script>

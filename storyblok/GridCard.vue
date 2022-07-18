<template>
  <div class="max-w-md h-full flex flex-col rounded-lg p-4 shadow-md" v-editable="card">
    <img
      v-if="card.icon.filename"
      :src="card.icon.filename"
      :alt="card.icon.alt"
      class="w-20 mx-auto my-8 pointer-events-none"
    />
    <div class="flex flex-col grow">
      <div class="grow">
        <h3 class="text-xl font-medium mb-2">{{ card.label }}</h3>
        <div>{{ card.text }}</div>
      </div>
      <div class="mt-4">
        <Button v-for="button in card.button" :key="button._uid" :button="button" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ card: Object })
</script>

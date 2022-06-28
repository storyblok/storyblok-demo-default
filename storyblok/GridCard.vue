<template>
  <div class="flex flex-col bg-zinc-100 rounded-3xl p-4" v-editable="card">
    <div v-if="card.icon.filename" class="inline-flex items-center justify-center rounded-full bg-zinc-50 w-32 h-32 mx-auto transform -translate-y-8 -mb-4">
      <img :src="card.icon.filename" :alt="card.icon.alt" class="w-24 pointer-events-none" />
    </div>
    <div class="flex flex-col grow">
      <div class="grow">
        <h3 class="text-xl font-bold mb-2">{{ card.label }}</h3>
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

<script setup>
defineProps({ color: String })
</script>
<template>
  <div class="text-center">
    <div
      class="flex aspect-square w-full items-center justify-center rounded-3xl shadow-sm"
      :class="`bg-${color}`"
    ></div>
    <span class="text-sm text-dark">{{ color }}</span>
  </div>
</template>

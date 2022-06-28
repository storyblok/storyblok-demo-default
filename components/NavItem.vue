<template>
  <NuxtLink :to="item.link.cached_url" class="transition-colors cursor-pointer" v-editable="item">
    {{ item.label }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ item: Object })

const type = props.item.link.linktype
</script>

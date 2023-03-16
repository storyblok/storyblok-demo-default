<script setup>
defineProps({ blok: Object, uuid: String })
</script>

<template>
  <div v-editable="blok">
    <ComponentCheck
      v-for="(blok, index) in blok.body"
      :key="blok._uid"
      :blok="blok"
      :index="index"
    />
  </div>
</template>

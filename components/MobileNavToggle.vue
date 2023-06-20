<script setup>
defineProps({ color: String })

const active = ref(false)

const toggle = () => {
  active.value = !active.value
}

const route = useRoute()
watch(route, (to) => {
  active.value = false
})
</script>

<template>
  <button
    class="cursor-pointer lg:invisible lg:hidden"
    :class="{ active: active }"
    @click="toggle"
  >
    <div
      class="bar1 my-1 h-0.5 w-7 transform transition-all"
      :class="color"
    ></div>
    <div
      class="bar2 my-1 h-0.5 w-7 transform transition-all"
      :class="color"
    ></div>
    <div
      class="bar3 my-1 h-0.5 w-7 transform transition-all"
      :class="color"
    ></div>
  </button>
</template>

<style scoped>
button.active .bar1 {
  @apply translate-y-[3px] rotate-45;
}

button.active .bar2 {
  @apply hidden;
}

button.active .bar3 {
  @apply -translate-y-[3px] -rotate-45;
}
</style>

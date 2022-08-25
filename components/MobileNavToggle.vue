<template>
  <button
    class="lg:hidden lg:invisible cursor-pointer"
    :class="{ active: active }"
    @click="toggle"
  >
    <div
      class="bar1 transform transition-all h-0.5 w-7 my-1"
      :class="color"
    ></div>
    <div
      class="bar2 transform transition-all h-0.5 w-7 my-1"
      :class="color"
    ></div>
    <div
      class="bar3 transform transition-all h-0.5 w-7 my-1"
      :class="color"
    ></div>
  </button>
</template>

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

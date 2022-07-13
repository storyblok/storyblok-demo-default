<template>
  <!-- <pre>{{ headerNav }}</pre> -->
  <Transition name="slide">
    <nav
      v-if="mobileNavOpen"
      class="fixed top-0 min-w-[240px] max-w-[400px] w-[calc(100%-120px)] h-screen z-50 bg-white bg-opacity-70 backdrop-blur-lg flex items-center justify-center shadow-lg"
    >
      <ul class="flex flex-col space-y-4 text-lg font-medium p-4">
        <li v-for="item in headerNav" :key="item._uid">
          <NavItem class="text-primary hover:text-secondary" :item="item" />
        </li>
        <li>
          <NuxtLink to="/categories/international-space-station">Test Link</NuxtLink>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup>
defineProps({ mobileNavOpen: Boolean, headerNav: Object })
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s cubic-bezier(0.1, 0.76, 0.58, 0.98);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>

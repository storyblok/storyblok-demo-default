<script setup>
defineProps({
  mobileNavOpen: Boolean,
  headerNav: Object,
  autoNav: Boolean,
  folderStories: Object,
})
</script>

<template>
  <Transition name="slide">
    <nav
      v-if="mobileNavOpen"
      class="fixed top-0 min-w-[240px] max-w-[400px] w-[calc(100%-120px)] h-screen z-[99] bg-[#0B0F19] bg-opacity-80 backdrop-blur-lg flex flex-col justify-center p-8 shadow-lg"
    >
      <h2 class="text-white text-2xl uppercase font-black mb-4">Navigation</h2>
      <ul v-if="!autoNav" class="flex flex-col space-y-4 text-lg font-light">
        <li v-for="item in headerNav" :key="item._uid">
          <NavItem class="text-white" :item="item" />
        </li>
      </ul>
      <ul v-else class="flex flex-col space-y-4 text-lg font-light">
        <li v-for="story in folderStories" :key="story.uuid">
          <NuxtLink :to="story.full_slug" class="text-white">
            {{ story.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

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

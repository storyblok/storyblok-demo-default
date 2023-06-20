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
      class="fixed top-0 z-[99] flex h-screen w-[calc(100%-120px)] min-w-[240px] max-w-[400px] flex-col justify-center bg-[#0B0F19] bg-opacity-80 p-8 shadow-lg backdrop-blur-lg"
    >
      <h2 class="mb-4 text-2xl font-black uppercase text-white">Navigation</h2>
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

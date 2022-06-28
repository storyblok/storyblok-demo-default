<script setup>
const siteConfig = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
  resolve_links: 'url',
})
siteConfig.value = data.story

const today = new Date()
const currentYear = today.getFullYear()
</script>

<template>
  <footer class="relative w-full bg-dark">
    <div class="container grid grid-cols-3 py-16">
      <div v-for="index in 3" :key="index">
        <h3 class="text-white font-bold text-2xl mb-5">{{ siteConfig.content['footer_nav_' + index + '_headline'] }}</h3>
        <nav>
          <ul class="flex flex-col space-y-3 text-lg">
            <li v-for="item in siteConfig.content['footer_nav_' + index]" :key="item._uid">
              <NavItem class="text-white hover:text-secondary" :item="item" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="border-t border-gray-700 py-4">
      <div class="container text-white text-xs text-center">&copy; Storyblok {{ currentYear }}</div>
    </div>
  </footer>
</template>

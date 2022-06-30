<script setup>
import RichText from './RichText.vue'
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
    <div class="container grid md:grid-cols-3 lg:grid-cols-5 gap-12 py-16">
      <div class="md:col-span-3 lg:col-span-2 flex items-center">
        <div>
          <NuxtLink to="/" class="flex mb-8">
            <img :src="siteConfig.content.footer_logo.filename" :alt="siteConfig.content.header_logo.alt" class="w-[180px] sm:w-[250px] transition-transform origin-left duration-700" />
          </NuxtLink>
          <RichText :text="siteConfig.content.footer_about" class="text-white mb-8" />
          <SocialIcons :twitter="siteConfig.content.twitter" :instagram="siteConfig.content.instagram" :youtube="siteConfig.content.youtube" :facebook="siteConfig.content.facebook" />
        </div>
      </div>
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
    <div class="border-t border-primary/30 py-4">
      <div class="container text-white text-xs text-center">&copy; Storyblok {{ currentYear }}</div>
    </div>
  </footer>
</template>

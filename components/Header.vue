<script setup>
const siteConfig = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: 'draft',
  resolve_links: 'url',
})
siteConfig.value = data.story

/* const siteConfig = await useStoryblok('site-config', {
  version: 'draft',
  
}) */
//headerMenu.value = data.story.content.header_menu

const headerStyle = ref('h-32')
const logoScale = ref('scale-100')

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      headerStyle.value = ' bg-opacity-80 backdrop-blur-lg shadow-md h-20'
      logoScale.value = 'scale-75'
    } else {
      headerStyle.value = 'h-32'
      logoScale.value = 'scale-100'
    }
  })
})
</script>

<template>
  <header class="fixed z-50 top-0 left-0 w-full bg-white transition-all duration-700" :class="headerStyle">
    <div class="container h-full flex items-center">
      <NuxtLink to="/">
        <img :src="siteConfig.content.header_logo.filename" :alt="siteConfig.content.header_logo.alt" width="250" class="transition-transform origin-left duration-700" :class="logoScale" />
      </NuxtLink>
      <nav class="ml-8">
        <ul class="flex space-x-8 text-lg font-bold">
          <li v-for="item in siteConfig.content.header_nav" :key="item._uid">
            <NavItem class="text-primary hover:text-secondary" :item="item" />
          </li>
        </ul>
      </nav>
      <nav class="ml-auto">
        <ul class="flex space-x-8 items-center">
          <li v-for="button in siteConfig.content.header_buttons" :key="button._uid">
            <Button :button="button" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-[#50b0ae];
}
</style>

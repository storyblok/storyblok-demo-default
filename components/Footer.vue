<script setup>
defineProps({
  logo: Object,
  navs: Object,
  about: Object,
  twitter: Object,
  instagram: Object,
  youtube: Object,
  facebook: Object,
})
const today = new Date()
const currentYear = today.getFullYear()
</script>

<template>
  <footer class="relative w-full bg-dark">
    <div
      class="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 py-16"
    >
      <div class="sm:col-span-2 md:col-span-3 lg:col-span-2 flex items-center">
        <div>
          <NuxtLink to="/" class="flex mb-8">
            <img
              :src="logo.filename"
              :alt="logo.alt"
              class="w-[180px] sm:w-[250px] transition-transform origin-left duration-700 pointer-events-none"
            />
          </NuxtLink>
          <RichText
            :text="about"
            class="text-white mb-8 text-sm lg:text-base"
          />
          <SocialIcons
            :twitter="twitter"
            :instagram="instagram"
            :youtube="youtube"
            :facebook="facebook"
          />
        </div>
      </div>
      <div v-for="index in 3" :key="index">
        <h3 class="text-white font-black text-xl xl:text-2xl mb-5">
          {{ navs['nav_' + index + '_headline'] }}
        </h3>
        <nav>
          <ul class="flex flex-col space-y-3 text-lg">
            <li v-for="item in navs['nav_' + index]" :key="item._uid">
              <NavItem class="text-white hover:text-primary" :item="item" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div>
      <div
        class="h-[1px] w-full bg-gradient-to-r from-dark via-medium to-dark"
      ></div>
      <img
        src="~/assets/images/made-with-love.svg"
        width="180"
        class="block mx-auto py-9 pointer-events-none"
        alt="Made with love by the Storyblok team!"
      />
    </div>
  </footer>
</template>

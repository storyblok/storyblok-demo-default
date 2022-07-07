<script setup>
const props = defineProps({ logo: Object, disable_transparency: Boolean, nav: Object, buttons: Object })

const mobileNavOpen = ref(false)

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
}

const route = useRoute()
watch(route, () => {
  mobileNavOpen.value = false
})

const headerClasses = ref('h-32')
const logoScale = ref('scale-100')

onMounted(() => {
  let transparency = props.disable_transparency ? '' : 'bg-opacity-80 backdrop-blur-lg'
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      headerClasses.value = ' shadow-md h-20 ' + transparency
      logoScale.value = 'scale-75'
    } else {
      headerClasses.value = 'h-32'
      logoScale.value = 'scale-100'
    }
  })
})
</script>

<template>
  <header class="fixed z-50 top-0 left-0 w-full bg-white transition-all duration-700" :class="headerClasses">
    <div class="max-w-[1536px] mx-auto w-full px-4 lg:px-8 h-full flex items-center justify-between lg:justify-start">
      <NuxtLink to="/" class="flex shrink-0">
        <img
          :src="logo.filename"
          :alt="logo.alt"
          class="w-[180px] xl:w-[250px] transition-transform origin-left duration-700 pointer-events-none"
          :class="logoScale"
        />
      </NuxtLink>
      <!-- <nav class="ml-8 invisible hidden lg:visible lg:block">
        <ul class="flex space-x-4 xl:space-x-8 xl:text-lg font-bold">
          <li v-for="item in nav" :key="item._uid">
            <NavItem class="text-primary hover:text-secondary" :item="item" />
          </li>
        </ul>
      </nav> -->
      <nav class="ml-auto invisible hidden lg:visible lg:block">
        <ul class="flex space-x-4 xl:space-x-8 items-center">
          <li v-for="button in buttons" :key="button._uid">
            <Button :button="button" />
          </li>
        </ul>
      </nav>
      <MobileNavToggle @click="toggleMobileNav" />
    </div>
  </header>
  <MobileNav :mobileNavOpen="mobileNavOpen" :headerNav="nav" />
</template>

<style scoped>
nav a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-primary;
}
</style>

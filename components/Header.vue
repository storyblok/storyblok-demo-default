<script setup>
const props = defineProps({
  logo: Object,
  disable_transparency: Boolean,
  nav: Object,
  buttons: Object,
  light: Boolean,
})

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

const headerBg = computed(() => {
  return props.light ? 'bg-light' : 'bg-[#0B0F19]'
})

const headerTransparency = computed(() => {
  return props.disable_transparency ? '' : 'bg-opacity-80 backdrop-blur-lg'
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      headerClasses.value = ' shadow-md h-20'
      logoScale.value = 'scale-75'
    } else {
      headerClasses.value = 'h-32'
      logoScale.value = 'scale-100'
    }
  })
})
</script>

<template>
  <header
    class="fixed z-[99] top-0 left-0 w-full transition-all duration-700"
    :class="[headerClasses, headerBg, headerTransparency]"
  >
    <div
      class="max-w-[1536px] mx-auto w-full px-4 lg:px-8 h-full flex items-center justify-between lg:justify-start"
    >
      <NuxtLink to="/" class="flex shrink-0">
        <img
          :src="logo.filename"
          :alt="logo.alt"
          class="w-[180px] xl:w-[250px] transition-transform origin-left duration-700 pointer-events-none"
          :class="logoScale"
        />
      </NuxtLink>
      <nav class="main-nav mx-auto invisible hidden lg:visible lg:block">
        <ul class="flex space-x-4 xl:space-x-8 xl:text-lg">
          <li v-for="item in nav" :key="item._uid">
            <NavItem
              class="hover:text-primary"
              :class="light ? 'text-primary' : 'text-white'"
              :item="item"
            />
          </li>
        </ul>
      </nav>
      <nav
        class="invisible ml-auto lg:ml-0 hidden md:visible md:block md:mr-8 lg:mr-0"
      >
        <ul class="flex space-x-4 xl:space-x-8 items-center">
          <li v-for="button in buttons" :key="button._uid">
            <Button :button="button" />
          </li>
        </ul>
      </nav>
      <MobileNavToggle
        @click="toggleMobileNav"
        :color="light ? 'bg-dark' : 'bg-light'"
      />
    </div>
  </header>
  <MobileNav :mobileNavOpen="mobileNavOpen" :headerNav="nav" />
</template>

<style scoped>
header nav.main-nav a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-primary;
}
</style>

<template>
  <!-- <GlobalStyles /> -->
  <Header />
  <slot />
  <Footer />
</template>

<style>
body {
  @apply pt-32;
}
section.page-section {
  @apply py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-40;
}

section.banner-section + section.banner-section {
  @apply pt-0;
}
/* section.page-section + section.page-section:not(.image-text-section) {
  @apply pt-0;
} */
</style>

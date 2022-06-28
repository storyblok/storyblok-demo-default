<template>
  <Header />
  <slot />
  <Footer />
</template>

<style>
body {
  @apply pt-32;
}
section.page-section {
  @apply py-24;
}
/* section.page-section + section.page-section:not(.image-text-section) {
  @apply pt-0;
} */
</style>

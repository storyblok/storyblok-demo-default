<template>
  <main :style="cssVariables">
    <Header
      :logo="story.content.header_logo"
      :disable_transparency="story.content.header_disable_transparency"
      :nav="story.content.header_nav"
      :buttons="story.content.header_buttons"
      :dark="story.content.header_dark"
    />
    <div
      v-if="
        slug && slug[0] === 'site-config' && story.content.use_custom_colors
      "
      class="container py-12"
    >
      <Headline class="mb-8">Color Previews</Headline>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
      >
        <div
          class="bg-primary w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-white">Primary</span>
        </div>
        <div
          class="bg-primary_highlight w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-white">Primary Highlight</span>
        </div>
        <div
          class="bg-secondary w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-white">Secondary</span>
        </div>
        <div
          class="bg-tertiary w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-white">Tertiary</span>
        </div>
        <div
          class="bg-white w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-black">White</span>
        </div>
        <div
          class="bg-light w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-black">Light</span>
        </div>
        <div
          class="bg-dark w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
        >
          <span class="text-sm text-white">Dark</span>
        </div>
      </div>
    </div>
    <slot />
    <Footer
      :logo="story.content.footer_logo"
      :about="story.content.footer_about"
      :navs="{
        nav_1_headline: story.content.footer_nav_1_headline,
        nav_2_headline: story.content.footer_nav_2_headline,
        nav_3_headline: story.content.footer_nav_3_headline,
        nav_1: story.content.footer_nav_1,
        nav_2: story.content.footer_nav_2,
        nav_3: story.content.footer_nav_3,
      }"
      :twitter="story.content.twitter"
      :instagram="story.content.instagram"
      :youtube="story.content.youtube"
      :facebook="story.content.facebook"
    />
  </main>
</template>

<script setup>
const defaultColors = {
  "--primary": "#a04b60",
  //'--primary': '#693562',
  "--primary_highlight": "#6F3443",
  //'--primary_highlight': '#a04b60',
  "--secondary": "#1985A1",
  "--tertiary": "#ECA72C",
  "--light": "#f6f7f7",
  "--medium": "#f6f7f7",
  "--dark": "#101d25",
};

const defaultBorderRadiuses = {
  "--rounded_sm": "0.125rem",
  "--rounded_default": "0.25rem",
  "--rounded_md": "0.375rem",
  "--rounded_lg": "0.5rem",
  "--rounded_xl": "0.75rem",
  "--rounded_2xl": "1rem",
  "--rounded_3xl": "1.6rem",
  "--rounded_full": "9999px",
};

const theme = reactive({ ...defaultColors, ...defaultBorderRadiuses });
const { slug } = useRoute().params;

const story = await useStoryblok(
  "site-config",
  {
    version: "draft",
    resolve_links: "url",
  },
  { preventClicks: true }
);

const cssVariables = computed(() => {
  if (story.value.content.use_custom_colors) {
    theme["--primary"] = story.value.content.primary.color;
    theme["--primary_highlight"] = story.value.content.primary_highlight.color;
    theme["--secondary"] = story.value.content.secondary.color;
    theme["--tertiary"] = story.value.content.tertiary.color;
    theme["--light"] = story.value.content.light.color;
    theme["--dark"] = story.value.content.dark.color;
  } else {
    Object.assign(theme, defaultColors);
  }
  if (story.value.content.disable_rounded_corners) {
    for (const key in theme) {
      if (key.startsWith("--rounded_")) theme[key] = 0;
    }
  } else {
    Object.assign(theme, defaultBorderRadiuses);
  }
  return theme;
});
</script>

<style>
body {
  @apply pt-32;
}
section.page-section {
  @apply py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32;
}

section.banner-section + section.banner-section {
  @apply pt-0;
}
</style>

<script setup>
const props = defineProps({ slug: String, altStyle: Boolean })

const storyblokApi = useStoryblokApi()

const allLinks = ref()

const links = await storyblokApi.getAll('cdn/links', { version: getVersion() })
allLinks.value = links

const breadcrumbs = computed(() => {
  let breadcrumbs = []

  const slugArray = props.slug.split('/')

  for (let i = 1; i <= slugArray.length; i++) {
    const processedSlug = slugArray.slice(0, i).join('/')
    const matchingLink = allLinks.value.find(
      (link) => link.slug === processedSlug,
    )
    if (!matchingLink) continue
    breadcrumbs.push({ name: matchingLink.name, slug: '/' + processedSlug })
  }

  return breadcrumbs
})
</script>

<template>
  <div
    class="container invisible z-50 hidden md:visible md:block"
    :class="
      altStyle
        ? 'absolute left-1/2 top-36 -translate-x-1/2'
        : 'relative mb-12 mt-4'
    "
  >
    <ul
      v-if="breadcrumbs"
      class="flex space-x-2 rounded-lg bg-light px-6 py-3"
      :class="altStyle ? 'bg-white bg-opacity-60 backdrop-blur-md' : 'bg-light'"
    >
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.slug"
        class="flex items-center text-dark"
      >
        <NuxtLink
          v-if="index + 1 !== breadcrumbs.length"
          :to="breadcrumb.slug"
          class="hover:underline"
        >
          {{ breadcrumb.name }}
        </NuxtLink>
        <span v-else>
          {{ breadcrumb.name }}
        </span>
        <span
          v-if="index + 1 !== breadcrumbs.length"
          class="pointer-events-none ml-2 text-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

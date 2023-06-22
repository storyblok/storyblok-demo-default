<script setup>
const props = defineProps({ blok: Object })

const mobileTabsStates = ref(props.blok.entries.map((entry) => false))

// Mobile
const setActiveTabMobile = (index) => {
  mobileTabsStates.value[index] = !mobileTabsStates.value[index]
}

// Desktop
const activeTab = ref(0)

const setActiveTab = (index) => {
  activeTab.value = index
}

const tabWidth = computed(() => 100 / props.blok.entries.length)

const cssVars = computed(() => {
  return {
    '--indicatorWidth': tabWidth.value + '%',
    '--indicatorMarginLeft': activeTab.value * tabWidth.value + '%',
    '--activeTab': activeTab.value,
  }
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section tabbed-content-section container bg-white"
  >
    <div class="mb-12 text-center">
      <Headline v-if="blok.headline" class="mb-4">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
    </div>
    <div class="tabbed-content-section-mobile md:invisible md:hidden">
      <ul class="relative flex flex-col">
        <li v-for="(entry, index) in blok.entries" class="group">
          <button
            @click.prevent="setActiveTabMobile(index)"
            class="border-1 flex w-full cursor-pointer justify-between border-b border-gray-900 py-4 text-left text-lg text-dark group-last:border-0"
            ref="buttonRefs"
          >
            <span>{{ entry.headline }}</span>
            <span v-if="mobileTabsStates[index]">
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
                  d="M19.5 12h-15"
                />
              </svg>
            </span>
            <span v-else>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
          </button>
          <section v-if="mobileTabsStates[index]">
            <div
              class="flex flex-col space-y-6 py-6 text-dark"
              v-editable="entry"
            >
              <img
                :src="entry.image?.filename + '/m/800x0'"
                :alt="entry.image?.alt"
                class="rounded-lg md:order-last"
              />
              <div>
                <p>{{ entry.description }}</p>
                <Button
                  v-for="button in entry.button"
                  class="mt-6"
                  :key="button._uid"
                  :button="button"
                />
              </div>
            </div>
          </section>
        </li>
      </ul>
    </div>
    <div
      class="tabbed-content-section-desktop invisible hidden md:visible md:block"
      :style="cssVars"
    >
      <ul class="relative mb-8 flex border-b border-gray-900">
        <li
          v-for="(entry, index) in blok.entries"
          :key="entry._uid"
          :style="'width:' + tabWidth + '%'"
        >
          <button
            @click.prevent="setActiveTab(index)"
            class="w-full cursor-pointer p-3 text-center text-lg text-dark"
          >
            {{ entry.headline }}
          </button>
        </li>
      </ul>
      <section
        v-for="(entry, index) in blok.entries"
        :key="entry._uid"
        :id="'entry-' + entry._uid"
      >
        <div
          v-if="index === activeTab"
          class="grid grid-cols-2 gap-12 text-dark"
          v-editable="entry"
        >
          <div>
            <p>{{ entry.description }}</p>
            <Button
              v-for="button in entry.button"
              class="mt-6"
              :key="button._uid"
              :button="button"
            />
          </div>
          <img
            :src="entry.image?.filename + '/m/800x0'"
            :alt="entry.image?.alt"
            class="rounded-lg"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
@screen md {
  ul:after {
    content: '';
    @apply absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500;
    width: var(--indicatorWidth);
    margin-left: var(--indicatorMarginLeft);
    /* TODO: use v-bind once it works reliably */
    /* width: v-bind(tabWidth + '%');
    margin-left: v-bind(activeTab * tabWidth + '%'); */
  }
}
</style>

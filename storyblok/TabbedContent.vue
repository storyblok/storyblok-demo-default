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

const tabWidth = ref(100 / props.blok.entries.length)

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
    class="page-section tabbed-content-section container"
  >
    <div class="text-center mb-12">
      <Headline v-if="blok.headline" class="mb-4">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
    </div>
    <div class="tabbed-content-section-mobile md:hidden md:invisible">
      <ul class="relative flex flex-col">
        <li v-for="(entry, index) in blok.entries" class="group">
          <button
            @click.prevent="setActiveTabMobile(index)"
            class="cursor-pointer py-4 flex justify-between text-left w-full border-b border-gray-900 border-1 text-dark text-lg group-last:border-0"
            ref="buttonRefs"
          >
            <span>{{ entry.headline }}</span>
            <span v-if="mobileTabsStates[index]"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </span>
            <span v-else
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
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
                class="md:order-last rounded-lg"
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
      class="tabbed-content-section-desktop hidden invisible md:block md:visible"
      :style="cssVars"
    >
      <ul class="relative border-b border-gray-900 mb-8 flex">
        <li
          v-for="(entry, index) in blok.entries"
          :key="entry._uid"
          :style="'width:' + tabWidth + '%'"
        >
          <button
            @click.prevent="setActiveTab(index)"
            class="cursor-pointer p-3 text-center w-full text-dark text-lg"
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

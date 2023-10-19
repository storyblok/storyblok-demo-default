<script setup>
const props = defineProps({ card: Object, defaultColor: String })

const price = computed(() => {
  const priceText = String(props.card.price)
  if (!priceText) return null
  const priceArray = priceText.split('.')
  return priceArray
})

const textBelowPrice = computed(() =>
  renderCustomRichText(props.card.text_below_price),
)
const textBelowButton = computed(() =>
  renderCustomRichText(props.card.text_below_button),
)

const currency = computed(() => props.card?.currency || '€')
</script>

<template>
  <div
    class="relative flex w-full max-w-md flex-col rounded-lg px-6 py-12 text-dark lg:max-w-none"
    :class="[
      card.background_color?.value ? '' : defaultColor,
      { 'shadow-xl': card.most_popular },
    ]"
    :style="
      card.background_color?.value
        ? 'background-color: ' + card.background_color.value
        : ''
    "
    v-editable="card"
  >
    <div
      v-if="card.most_popular"
      class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-secondary px-4 py-1 text-sm uppercase text-white"
    >
      Most popular
    </div>
    <h3 class="mb-3 font-display text-2xl font-medium">{{ card.headline }}</h3>
    <h4 class="mb-6 font-display text-lg">{{ card.subheadline }}</h4>
    <span v-if="price" class="mx-auto inline-flex items-end">
      <span class="mr-2 block translate-y-[4px] self-start text-4xl font-bold">
        {{ currency }}
      </span>
      <span class="text-6xl font-bold">{{ price[0] }}</span>
      <span v-if="price[1]" class="block -translate-y-[1px] text-3xl">
        .{{ price[1] }}
      </span>
    </span>
    <div v-html="textBelowPrice" class="prose mx-auto max-w-xs"></div>
    <div v-if="card.button.length" class="my-6">
      <Button
        v-for="button in card.button"
        :key="button._uid"
        :button="button"
      />
    </div>
    <div
      v-html="textBelowButton"
      class="text-below-button prose mx-auto max-w-xs text-left prose-ul:list-none"
    ></div>
  </div>
</template>

<style>
.text-below-button ul li {
  position: relative;
}
.text-below-button ul li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-18px) translateY(6px);
  background-image: url('~/assets/images/check.svg');
  background-size: contain;
  width: 18px;
  height: 18px;
  z-index: 9;
}
</style>

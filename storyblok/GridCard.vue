<script setup>
const props = defineProps({ card: Object, defaultColor: String })

const optimizedIcon = computed(() => {
  const isSvg = props.card.icon?.filename.slice(-3) === 'svg'
  const optimize = isSvg ? '' : '/m/' + props.card?.icon_width + 'x0'
  return props.card.icon?.filename + optimize
})

const textColor = computed(() => {
  return props.card.text_color === 'light' ? 'text-white' : 'text-dark'
})
</script>

<template>
  <div
    class="flex h-full w-full max-w-md flex-col rounded-lg p-6 lg:max-w-none"
    :class="card.background_color?.value ? '' : defaultColor"
    :style="
      card.background_color?.value
        ? 'background-color: ' + card.background_color.value
        : ''
    "
    v-editable="card"
  >
    <img
      v-if="card.icon.filename"
      :src="optimizedIcon"
      :alt="card.icon.alt"
      :width="card.icon_width"
      class="pointer-events-none mx-auto mb-6"
    />
    <div class="flex grow flex-col">
      <div class="grow" :class="textColor">
        <h3 class="mb-3 font-display text-xl font-medium">
          {{ card.label }}
        </h3>
        <div class="font-light leading-relaxed">{{ card.text }}</div>
      </div>
      <div v-if="card.button.length" class="mt-4">
        <Button
          v-for="button in card.button"
          :key="button._uid"
          :button="button"
        />
      </div>
    </div>
  </div>
</template>

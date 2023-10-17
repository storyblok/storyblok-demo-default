<script setup>
import {
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  Vector3,
  Euler,
} from 'three'

const props = defineProps({ blok: Object, uuid: String })

const gl = {
  clearColor: '#181C3E',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

const progress = ref(0)
const scRef = ref()
const cameraRef = ref()
const rocketPosition = ref(new Vector3(20, -4, 0))
const rocketRotation = ref(new Euler(0, 0, -Math.PI / 2))

watch(progress, (value) => {
  if (value >= 0.2) {
    const t = (progress.value - 0.2) * 4 // Normalize progress from 0.5 to 1 to range 0 to 1
    cameraRef.value.position.x = lerp(0, 15, t * t) // Smoothly interpolate from -0.5 to 1 based on t
  }
})
</script>

<template>
  <StoryblokComponent
    v-for="blok in blok.sections"
    :key="blok._uid"
    :blok="blok"
  />
  <TresCanvas
    v-if="blok"
    v-bind="gl"
    :clear-color="blok.clearColor"
    window-size
  >
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 15]" />
    <ScrollControls
      ref="scRef"
      v-model="progress"
      :distance="progress < 0.45 ? 10 : 4"
      :smooth-scroll="0.1"
      html-scroll
    >
      <Levioso :speed="0.1" :float-factor="0.01" :range="[-0.1, 0.1]">
        <Suspense>
          <Astronaut />
        </Suspense>
      </Levioso>
    </ScrollControls>
    <Suspense>
      <Moon :progress="progress" />
    </Suspense>
    <Suspense>
      <Rocket
        uuid="rocket-flying"
        :position="rocketPosition"
        :rotation="rocketRotation"
        :progress="progress"
      />
    </Suspense>
    <Suspense>
      <FrameworkPlanets />
    </Suspense>
    <Stars />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[-4, -2, 2]"
      :intensity="1"
      cast-shadow
      color="purple"
    />
    <TresDirectionalLight
      :position="[4, 6, 4]"
      :intensity="2"
      cast-shadow
      color="cyan"
    />
  </TresCanvas>
</template>

<script setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#181C3E',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const story = await useAsyncStoryblok('product-custom', { version: 'draft' })

const state = useProductConfigurator()

const availableBaseMaterials = computed(() => {
  if (
    story.value.content &&
    story.value.content.baseMaterial.availableMaterials
  ) {
    return story.value.content.baseMaterial.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const availableAccentMaterials = computed(() => {
  if (
    story.value.content &&
    story.value.content.accentMaterial.availableMaterials
  ) {
    return story.value.content.accentMaterial.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const availableDetailMaterials = computed(() => {
  if (
    story.value.content &&
    story.value.content.detailMaterial.availableMaterials
  ) {
    return story.value.content.detailMaterial.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const { hasFinishLoading, progress } = await useProgress()

const cameraRef = ref()
const cameraPosition = ref(new Vector3(-0.63, 2, 0.63))

watch(hasFinishLoading, (hasFinishLoading) => {
  if (!cameraRef.value || !hasFinishLoading) return
  gsap.to(cameraRef.value.position, {
    duration: 4,
    x: 0,
    y: 2,
    z: 5,
    ease: 'power2.inOut',
    onUpdate: () => {
      cameraRef.value.lookAt(0, 1, 0)
    },
  })
})

function resetMaterials() {
  state.value.selectedBaseMaterial = {
    color: '#ffffff',
  }
  state.value.selectedAccentMaterial = {
    color: '#E73740',
  }
  state.value.selectedDetailMaterial = {
    color: '#563EE7',
  }
}
</script>

<template>
  <div class="pt-56px h-100vh flex flex-col bg-gray-800 sm:flex-row">
    <div class="h-50% sm:h-100% relative w-full sm:w-1/2">
      <Transition
        name="fade-overlay"
        enter-active-class="opacity-1 transition-opacity duration-200"
        leave-active-class="opacity-0 transition-opacity duration-200"
      >
        <div
          v-show="!hasFinishLoading"
          class="t-0 l-0 font-mono absolute z-30 flex h-full w-full items-center justify-center bg-black text-white"
        >
          <div class="font-italic title w-200px">
            Building Rocket 🚀... {{ progress }} %
          </div>
        </div>
      </Transition>
      <TresCanvas v-if="story" v-bind="gl">
        <TresPerspectiveCamera ref="cameraRef" :position="cameraPosition" />
        <OrbitControls />
        <Suspense>
          <RocketSetup />
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
        <TresGridHelper />
        <TresAmbientLight :intensity="1" />
      </TresCanvas>
    </div>
    <aside
      class="relative h-full w-full overflow-scroll p-8 text-white sm:w-1/2 sm:p-16"
    >
      <h1
        v-if="story.content.headline"
        class="mb-12 w-full text-center text-2xl font-bold"
      >
        {{ story.content.headline }}
      </h1>
      <p class="text-center text-sm text-gray-400">
        {{ story.content.description }}
      </p>
      <section class="mb-16 mt-32 flex w-full items-start text-gray-300">
        <h2 class="w-1/2 font-bold text-gray-300 lg:w-1/3">Base Color</h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li v-for="(material, index) in availableBaseMaterials" :key="index">
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border border-2 border-solid shadow-md lg:h-10 lg:w-10"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedBaseMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="mb-16 flex w-full items-start text-gray-300">
        <h2 class="w-1/2 font-bold text-gray-300 lg:w-1/3">Accent Color</h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li
            v-for="(material, index) in availableAccentMaterials"
            :key="index"
          >
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border border-2 border-solid shadow-md lg:h-10 lg:w-10"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedAccentMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="mb-16 flex w-full items-start text-gray-300">
        <h2 class="w-1/2 font-bold text-gray-300 lg:w-1/3">Detail Color</h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li
            v-for="(material, index) in availableDetailMaterials"
            :key="index"
          >
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border border-2 border-solid shadow-md lg:h-10 lg:w-10"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedDetailMaterial = material"
            />
          </li>
        </ul>
      </section>
      <footer
        class="flex w-full flex-col justify-end gap-8 p-0 sm:flex-row sm:p-8"
      >
        <button
          class="rounded border border-white px-4 py-2 font-bold text-white"
          @click="resetMaterials"
        >
          Reset
          <i class="i-carbon-reset ml-3" />
        </button>
        <NuxtLink
          class="rounded bg-white px-4 py-2 font-bold text-gray-800 transition hover:bg-gray-200"
          to="/scrollytelling"
        >
          Start Exploring
        </NuxtLink>
      </footer>
    </aside>
  </div>
</template>

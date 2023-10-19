<script setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'
import { OrbitControls } from '@tresjs/cientos'

const props = defineProps({ blok: Object, uuid: String })

const gl = {
  clearColor: '#181C3E',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const state = useProductConfigurator()

const availableBaseMaterials = computed(() => {
  if (props.blok && props.blok.baseMaterial.availableMaterials) {
    return props.blok.baseMaterial.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const availableAccentMaterials = computed(() => {
  if (props.blok && props.blok.accentMaterial.availableMaterials) {
    return props.blok.accentMaterial.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const availableDetailMaterials = computed(() => {
  if (props.blok && props.blok.detailMaterial.availableMaterials) {
    return props.blok.detailMaterial.availableMaterials.map(
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
  <div class="flex h-[100vh] flex-col bg-dark sm:flex-row">
    <div class="relative h-[50%] w-full sm:h-[100%] sm:w-1/2">
      <Transition
        name="fade-overlay"
        enter-active-class="opacity-1 transition-opacity duration-200"
        leave-active-class="opacity-0 transition-opacity duration-200"
      >
        <div
          v-show="!hasFinishLoading"
          class="t-0 l-0 absolute z-30 flex h-full w-full items-center justify-center bg-dark text-white"
        >
          <div class="w-[200px]">Building Rocket 🚀... {{ progress }} %</div>
        </div>
      </Transition>
      <TresCanvas v-if="blok" v-bind="gl">
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
      <Headline v-if="blok.headline" color="white" class="text-center">
        {{ blok.headline }}
      </Headline>
      <Lead v-if="blok.description" class="text-center text-light">
        {{ blok.description }}
      </Lead>
      <section class="mb-16 mt-32 flex w-full items-start text-light">
        <h2 class="w-1/2 font-display font-bold text-light lg:w-1/3">
          Base Color
        </h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li v-for="(material, index) in availableBaseMaterials" :key="index">
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border-2 border-solid shadow-md lg:h-10 lg:w-10"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedBaseMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="mb-16 flex w-full items-start text-light">
        <h2 class="w-1/2 font-display font-bold text-light lg:w-1/3">
          Accent Color
        </h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li
            v-for="(material, index) in availableAccentMaterials"
            :key="index"
          >
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border-2 border-solid shadow-md lg:h-10 lg:w-10"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedAccentMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="mb-16 flex w-full items-start text-light">
        <h2 class="w-1/2 font-display font-bold text-light lg:w-1/3">
          Detail Color
        </h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start pl-0"
        >
          <li
            v-for="(material, index) in availableDetailMaterials"
            :key="index"
          >
            <div
              class="border-blue mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border-2 border-solid shadow-md lg:h-10 lg:w-10"
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
        </button>
      </footer>
    </aside>
  </div>
</template>

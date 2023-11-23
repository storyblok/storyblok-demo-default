<script setup>
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { gsap } from 'gsap'

const props = defineProps({ blok: Object, uuid: String })

const gl = {
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Model loading
const { hasFinishLoading, progress } = await useProgress()

const environmentTexture = ref(null)

// Materials
const state = useProductConfigurator()

const availableBaseMaterials = computed(() => {
  if (props.blok && props.blok.baseMaterials.availableMaterials) {
    return props.blok.baseMaterials.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

const availableAccentMaterials = computed(() => {
  if (props.blok && props.blok.accentMaterials.availableMaterials) {
    return props.blok.accentMaterials.availableMaterials.map(
      (material, index) => ({
        id: index,
        ...material,
      }),
    )
  }
  return []
})

// Camera animation
const cameraRef = ref(null)
const firstTime = ref(true)

function animateCameraIn() {
  if (!firstTime.value) return
  gsap.to(cameraRef?.value?.position, {
    duration: 3,
    delay: 0.5,
    x: 5.04,
    y: 2.84,
    z: 7.46,
    ease: 'power4.out',
    onUpdate: () => {
      cameraRef?.value?.lookAt(0, 0, 0)
    },
    onComplete: () => {
      firstTime.value = false
    },
  })
}

watch(hasFinishLoading, (hasFinishLoading) => {
  if (!cameraRef.value || !hasFinishLoading) return
  animateCameraIn()
})
</script>

<template>
  <div class="flex h-[100vh] flex-col bg-dark sm:flex-row">
    <div class="relative h-[50%] w-full sm:h-[100%] sm:w-2/3">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera
          ref="cameraRef"
          :args="[45, 1, 0.1, 1000]"
          :position="firstTime ? [21, 9, 16.5] : [5.04, 2.84, 7.46]"
        />
        <Suspense>
          <Environment
            background
            ref="environmentTexture"
            :blur="0.3"
            preset="sunset"
          />
        </Suspense>
        <Suspense>
          <Vehicle :env="environmentTexture" />
        </Suspense>
        <OrbitControls />
        <TresAmbientLight :intensity="1" />
      </TresCanvas>
    </div>
    <aside
      class="relative h-full w-full overflow-scroll p-8 text-white sm:w-1/3 sm:p-16"
    >
      <Headline
        v-if="blok.headline"
        size="small"
        color="white"
        class="text-center"
      >
        {{ blok.headline }}
      </Headline>
      <section class="mb-16 mt-32 flex w-full items-center text-light">
        <h2 class="w-1/2 font-bold text-light lg:w-1/3">Paint Color</h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start gap-3 pl-0"
        >
          <li v-for="(material, index) in availableBaseMaterials" :key="index">
            <div
              class="h-6 w-6 cursor-pointer rounded-full border-2 border-white transition-all duration-500 lg:h-10 lg:w-10"
              :class="
                state.selectedBaseMaterial.id === material.id
                  ? 'shadow-[0_0_15px_0_rgba(255,255,255,0.9)]'
                  : ''
              "
              :style="{ backgroundColor: material.color }"
              @click="state.selectedBaseMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="mb-16 flex w-full items-center text-light">
        <h2 class="w-1/2 font-bold text-light lg:w-1/3">Accent Color</h2>
        <ul
          class="lg:2/3 ml-0 flex w-1/2 list-none flex-wrap justify-start gap-3 pl-0"
        >
          <li
            v-for="(material, index) in availableAccentMaterials"
            :key="index"
          >
            <div
              class="h-6 w-6 cursor-pointer rounded-full border-2 border-white transition-all duration-500 lg:h-10 lg:w-10"
              :class="
                state.selectedAccentMaterial.id === material.id
                  ? 'shadow-[0_0_15px_0_rgba(255,255,255,0.9)]'
                  : ''
              "
              :style="{ backgroundColor: material.color }"
              @click="state.selectedAccentMaterial = material"
            />
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

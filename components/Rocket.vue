<script setup>
import { MeshStandardMaterial } from 'three'

const props = defineProps({
  uuid: String,
  progress: Number,
  position: Object,
  rotation: Object,
})

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

const { position, rotation, progress, uuid } = toRefs(props)

const { nodes } = await useGLTF('/models/rocket.glb', { draco: true })

const rocketAccent = nodes['RocketAccent']
const rocketBase = nodes['RocketBase']
const rocketDetail = nodes['RocketDetail']
const rocketWindow = nodes['RocketWindow']

const rocketRef = ref()

const state = useProductConfigurator()

watch(
  () => state.value.selectedBaseMaterial,
  (selectedBaseMaterial) => {
    if (!selectedBaseMaterial) return
    rocketBase.material = new MeshStandardMaterial({
      color: selectedBaseMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedAccentMaterial,
  (selectedAccentMaterial) => {
    if (!selectedAccentMaterial) return

    rocketAccent.material = new MeshStandardMaterial({
      color: selectedAccentMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedDetailMaterial,
  (selectedDetailMaterial) => {
    if (!selectedDetailMaterial) return

    rocketDetail.material = new MeshStandardMaterial({
      color: selectedDetailMaterial.color,
    })
  },
  { immediate: true },
)

watchEffect(() => {
  if (!rocketRef.value) return
})

watch(progress, (value) => {
  if (value >= 0.45) {
    rocketRef.value.rotation.x = lerp(
      0,
      Math.PI + Math.PI / 2,
      (value - 0.45) * 15,
    )
  }
  if (value >= 0.72) {
    rocketRef.value.position.x = lerp(20, 40, (value - 0.72) * 11)
  }
})
</script>

<template>
  <TresGroup ref="rocketRef" :position="position" :rotation="rotation">
    <primitive :object="rocketAccent" />
    <primitive :object="rocketBase" />
    <primitive :object="rocketDetail" />
    <primitive :object="rocketWindow" />
  </TresGroup>
</template>

<script setup>
import { MeshPhysicalMaterial } from 'three'
const { nodes, materials } = await useGLTF('/models/american-roadster.glb', {
  draco: true,
})

const roadster = nodes['american-roadster']

const { seekByName } = useSeek()

const paint = seekByName(roadster, 'body')
const detail = seekByName(roadster, 'bodydetail')
const state = useProductConfigurator()
watch(
  () => state.value.selectedBaseMaterial,
  (selectedBaseMaterial) => {
    if (!selectedBaseMaterial) return

    console.log(selectedBaseMaterial)
    paint.material = new MeshPhysicalMaterial({
      color: selectedBaseMaterial.color,
      metalness: selectedBaseMaterial.metalness,
      roughness: selectedBaseMaterial.roughness,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedAccentMaterial,
  (selectedAccentMaterial) => {
    if (!selectedAccentMaterial) return

    console.log(selectedAccentMaterial)
    detail.material = new MeshPhysicalMaterial({
      color: selectedAccentMaterial.color,
      metalness: selectedAccentMaterial.metalness,
      roughness: selectedAccentMaterial.roughness,
    })
  },
  { immediate: true },
)
</script>

<template>
  <primitive :object="roadster" />
</template>

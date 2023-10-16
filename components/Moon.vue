<script setup>
import { Euler, MeshStandardMaterial, Vector3 } from 'three'

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

const props = defineProps({ progress: Number })
const { progress } = toRefs(props)

const rocketPosition = ref(new Vector3(-1.2, -7.8, -4))
const rocketRotation = ref(new Euler(0, 2.1, -2.2))

const { nodes } = await useGLTF('/models/moon.glb', { draco: true })

const groupRef = ref()

const model = nodes['Moon']
const bakedDisplacementTexture = await useTexture([
  '/models/moon_displacement.png',
])
bakedDisplacementTexture.flipY = false

const material = new MeshStandardMaterial({
  color: '#DDDBE7',
  map: bakedDisplacementTexture,
  displacementMap: bakedDisplacementTexture,
  displacementScale: 0.2,
  displacementBias: -0.1,
})
model.material = material

watch(progress, (value) => {
  if (value >= 0.1 && value < 0.2) {
    groupRef.value.rotation.y = lerp(0, -Math.PI, (value - 0.2) / 0.3)
  }
})
</script>

<template>
  <TresGroup
    ref="groupRef"
    name="Moon"
    :position="[-4, 0, 1]"
    :rotation="[0, 0, 0]"
  >
    <primitive :object="model" />
    <Suspense>
      <Rocket :position="rocketPosition" :rotation="rocketRotation" />
    </Suspense>
  </TresGroup>
</template>

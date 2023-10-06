<script setup>
import { MeshStandardMaterial } from 'three'

const { nodes, animations } = await useGLTF('/models/astronaut-storyblok.glb', {
  draco: true,
})

const astronaut = nodes['Astronaut']

const bakedTexture = await useTexture(['/models/astronaut-baked.png'])
bakedTexture.flipY = false

const material = new MeshStandardMaterial({
  map: bakedTexture,
})

astronaut.material = material

const { actions, mixer } = useAnimations(animations, astronaut)

const currentAction = ref(actions['Floating'])

currentAction.value.play()
</script>

<template>
  <TresGroup
    :position="[1, -0.5, 10]"
    :rotation="[0, -Math.PI / 8, Math.PI / 12]"
  >
    <primitive :object="astronaut" />
  </TresGroup>
</template>

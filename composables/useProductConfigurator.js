import { useStorage } from '@vueuse/core'

export const useProductConfigurator = () =>
  useStorage('product', {
    selectedBaseMaterial: {
      color: '#ffffff',
    },
    selectedAccentMaterial: {
      color: '#E73740',
    },
    selectedDetailMaterial: {
      color: '#563EE7',
    },
  })

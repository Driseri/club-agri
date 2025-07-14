import { ref, type Ref } from 'vue'
import type Direction from '../entities/Direction'
import { createSharedComposable } from '@vueuse/core'
import { getDirectionsAvailable } from '@/infra/store/directions'

interface useDirectionsComposableState {
  directions: Ref<Direction[]>;
}

export const useDirections = createSharedComposable((): useDirectionsComposableState => {
  const directions = ref<Direction[]>(getDirectionsAvailable())

  return {
    directions,
  }
})

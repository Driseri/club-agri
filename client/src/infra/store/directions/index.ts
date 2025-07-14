import type Direction from '@/domain/entities/Direction'

const directionsAvailable: Direction[] = []

export function getDirectionsAvailable(): Direction[] {
  return directionsAvailable
}

export function getDirectionById(id: Direction['id']): Direction | undefined {
  return directionsAvailable.find(direction => direction.id === id)
}

export async function loadDirections(): Promise<Direction[]> {
  const directions = (await import('./mock/directions')).directionsAvailable
  directionsAvailable.push(...directions)
  return directions
}

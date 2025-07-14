<script setup lang="ts">
import { List, ListItem, Sections, Section, Input, Placeholder, Lottie } from '@/presentation/components'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDirections } from '@/domain/services/useDirections'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram, useLottie } from '@/application/services'
import { useRouter } from 'vue-router'

/**
 * Directions list
 */
const { directions } = useDirections()

/**
 * Search input value
 */
const searchQuery = ref('')

/**
 * Selected directions ids
 */
const selectedIds = ref<number[]>([])

/**
 * Lottie animation used when no cities found
 */
const { animationData } = useLottie('eyes')

/**
 * Search result
 */
const directionsFiltered = computed(() => {
  return directions.value.filter(direction => {
    return direction.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

/**
 * Toggle direction selection
 *
 * @param id - Direction id to toggle
 */
function toggleDirection(id: number): void {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(item => item !== id)
  } else {
    selectedIds.value.push(id)
  }
}

const { setDirections, trip } = useTripDetails()
const { showMainButton, hideMainButton, expand, showBackButton, hideBackButton, vibrate } = useTelegram()
const router = useRouter()

/**
 * Vibrate when no cities found
 */
watch(directionsFiltered, () => {
  if (directionsFiltered.value.length === 0) {
    vibrate('light')
  }
})

onMounted(() => {
  if (trip.directions.length > 0) {
    selectedIds.value = [...trip.directions]
  }

  expand()

  showMainButton('Select', () => {
    setDirections(selectedIds.value)

    void router.push('/home')
  })

  showBackButton(() => {
    void router.back()
  })
})

onBeforeUnmount(() => {
  hideMainButton()
  hideBackButton()
})
</script>

<template>
  <div class="locations">
    <Sections>
      <Section
        padded
      >
        <Input
          v-model="searchQuery"
          placeholder="Search for a direction"
          left-icon="search"
        />
      </Section>
      <Section
        v-if="directionsFiltered.length"
        with-background
        standalone
      >
        <List>
          <ListItem
            v-for="direction in directionsFiltered"
            :id="direction.id"
            :key="direction.id"
            :title="direction.title"
            :right-icon="selectedIds.includes(direction.id) ? 'checkmark' : undefined"
            @click="toggleDirection(direction.id)"
          >
            <template #picture>
              <div class="list-emoji">
                {{ direction.emoji }}
              </div>
            </template>
          </ListItem>
        </List>
      </Section>
      <Placeholder
        v-else
        title="No results"
        caption="Try searching for something else"
      >
        <template #picture>
          <Lottie
            v-if="animationData"
            :animation-data="animationData"
            width="50px"
            height="50px"
            class="pic"
          />
        </template>
      </Placeholder>
    </Sections>
  </div>
</template>

<style scoped>
.list-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size-avatar-medium);
  height: var(--size-avatar-medium);
  border-radius: 30px;
  font-size: 1.3rem;
  background-color: var(--color-bg-tertiary);
  letter-spacing: -1px;
}

.locations {
  :deep(.icon-checkmark) {
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

    svg {
      stroke: var(--color-link);
    }
  }

  :deep(.placeholder .pic) {
    margin-top: 20px;
    padding-bottom: 6px;
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

@keyframes jump-in {
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>

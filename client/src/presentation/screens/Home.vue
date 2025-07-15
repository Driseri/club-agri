<!-- eslint-disable clean-timer/assign-timer-id -->
<script setup lang="ts">
import { Placeholder, List, ListItem, ListItemExpandable, Sections, Section, ListCard, Amount, Rating, Text, Lottie, Slider } from '@/presentation/components'
import { onMounted, ref, onBeforeUnmount, watchEffect, watch, computed } from 'vue'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram, useScroll, useLottie } from '@/application/services'
import { hotels } from '@/infra/store/hotels/mock/hotels'
import { shortNumber } from '@/infra/utils/number'
import { type Hotel, type TripDetails } from '@/domain/entities'

const {
  trip,
  location,
  selectDefault: selectDefaultLocation,
  setAddress,
  days,
  setMaxTravelTime,
  setTransport,
} = useTripDetails()

const directionsLabel = computed(() => {
  return trip.directions.length > 0 ? `${trip.directions.length} selected` : 'Any'
})

const travelTimeLabel = computed(() => {
  return trip.maxTravelTime >= 65 ? 'Не важно' : `${trip.maxTravelTime} min`
})

const transportLabel = computed(() => trip.transport === 'walking' ? 'Пешком' : 'На машине')

/**
 * Whether to show the start date picker
 */
const addressPickerShowed = ref(false)

/**
 * Whether to show the travel time picker
 */
const timePickerShowed = ref(false)

/**
 * Whether to show the transport picker
 */
const transportPickerShowed = ref(false)

/**
 * List loading state
 * Undefined when no search performed yet
 */
const isLoading = ref<boolean | undefined>(undefined)

/**
 * Whether search is finished and we have results
 */
const isSearchFinished = ref(false)

/**
 * Search results
 */
const result = ref<Hotel[]>([])

const { showMainButton, hideMainButton, setButtonLoader, expand, getViewportHeight, vibrate } = useTelegram()
const { scrollTo } = useScroll()
const { animationData } = useLottie('simp')

/**
 * Reference to the dates/location form wrapper
 */
const searchSettings = ref<InstanceType<typeof Section> | null>(null)

/**
 * Height of the dates/location form wrapper. Used in CSS to calculate landing height
 */
const searchSettingsHeight = ref(130)

/**
 * Reference to the date pickers
 */
const addressPicker = ref<HTMLElement | null>(null)
const timePicker = ref<HTMLElement | null>(null)
const transportPicker = ref<HTMLElement | null>(null)

/**
 * Reference to the landing
 */
const landing = ref<InstanceType<typeof Placeholder> | null>(null)

/**
 * Height of the date pickers. Changed after opening of DatePicker, used in CSS to calculate landing height
 */
const addressPickerHeight = ref(0)
const timePickerHeight = ref(0)
const transportPickerHeight = ref(0)

/**
 * Viewport height. Used in CSS to calculate landing height
 */
const viewportHeight = ref(window.innerHeight)

/**
 * Hook called before search
 */
function onBeforeSearch(): void {
  result.value = []

  requestAnimationFrame(() => {
    isLoading.value = true
    isSearchFinished.value = false
    addressPickerShowed.value = false
    timePickerShowed.value = false
    transportPickerShowed.value = false

    setButtonLoader(true)
  })
}

/**
 * Hook called after search
 */
function onAfterSearch(): void {
  expand()
  isLoading.value = false
  isSearchFinished.value = true
  setButtonLoader(false)
  hideMainButton()

  setTimeout(() => {
    if (searchSettings.value !== null) {
      scrollTo(searchSettings.value.$el, 16)
    }
  }, 200)
}

/**
 * Fake search method
 */
function search(): void {
  onBeforeSearch()

  setTimeout(() => {
    onAfterSearch()

    vibrate()

    setTimeout(() => {
      /**
       * Shuffle mocks to make it look more real
       */
      const hotelsShuffled = hotels.sort(() => Math.random() - 0.5)

      // hotelsShuffled.forEach((hotel, i) => {
      result.value = hotelsShuffled
      // })
    }, 200) // wait until Telegram expand is finished to prevent Cards going to minimized state
  }, 3000)
}

function onAddressClick(): void {
  expand()
  addressPickerShowed.value = !addressPickerShowed.value
  timePickerShowed.value = false
  transportPickerShowed.value = false
}

function onTimeClick(): void {
  expand()
  timePickerShowed.value = !timePickerShowed.value
  addressPickerShowed.value = false
  transportPickerShowed.value = false
}

function onTransportClick(): void {
  expand()
  transportPickerShowed.value = !transportPickerShowed.value
  addressPickerShowed.value = false
  timePickerShowed.value = false
}

function selectTransport(transport: TripDetails['transport']): void {
  setTransport(transport)
  transportPickerShowed.value = false
}

/**
 * We need to update stored date picker height because it is used to calculate "landing" height
 */
watchEffect(() => {
  if (timePickerShowed.value) {
    timePickerHeight.value = timePicker.value?.offsetHeight ?? 0
  } else {
    timePickerHeight.value = 0
  }

  if (transportPickerShowed.value) {
    transportPickerHeight.value = transportPicker.value?.offsetHeight ?? 0
  } else {
    transportPickerHeight.value = 0
  }

  if (addressPickerShowed.value) {
    addressPickerHeight.value = addressPicker.value?.offsetHeight ?? 0
  } else {
    addressPickerHeight.value = 0
  }
})

/**
 * Clear result and reset state to the initial
 */
function resetSearch(): void {
  result.value = []
  isLoading.value = undefined
  isSearchFinished.value = false
  showMainButton('Search', () => {
    search()
  })
}




onMounted(() => {
  if (trip.city === 0) {
    selectDefaultLocation()
  }

  resetSearch()

  requestAnimationFrame(() => {
    if (searchSettings.value !== null) {
      searchSettingsHeight.value = searchSettings.value.$el.offsetHeight
    }
  })

  viewportHeight.value = getViewportHeight()
})

onBeforeUnmount(() => {
  hideMainButton()
})

onBeforeUnmount(() => {
  setButtonLoader(false)
})
</script>
<template>
  <div class="home-page">
    <Placeholder
      ref="landing"
      class="landing"
      title="ClubBook"
      caption="Просто - как пустить шептуна"
      :class="{
        'landing--loading': isLoading,
        'landing--loaded': isSearchFinished,
      }"
    >
      <template #picture>
        <div class="landing-picture">
          <Transition name="switch">
            <img
              v-if="!isLoading"
              src="/telebook.svg"
              aria-hidden="true"
              width="68"
            >
            <Lottie
              v-else-if="animationData !== null"
              :animation-data="animationData"
              width="110px"
              height="110px"
            />
          </Transition>
        </div>
      </template>
    </Placeholder>
    <Sections>
      <Section
        ref="searchSettings"
        padded
      >
        <List
          with-background
          standalone
        >
          

          <ListItem
            label="Location"
            right-icon="chevron-right"
            :right-icon-label="location?.title"
            to="/location"
          />
          <ListItem
            label="Адрес проживания"
            right-icon="chevron-right"
            :right-icon-label="trip.address || 'Не указан'"
            @click="onAddressClick"
          />
          <ListItemExpandable :opened="addressPickerShowed">
            <div ref="addressPicker" class="address-picker">
              <div class="input-container">
                <input v-model="trip.address" placeholder="Введите адрес проживания" class="address-input" />
              </div>
            </div>
          </ListItemExpandable>
          <ListItem
            label="Directions"
            right-icon="chevron-right"
            :right-icon-label="directionsLabel"
            to="/directions"
          />
          <ListItem
            label="Как добираться"
            right-icon="chevron-right"
            :right-icon-label="transportLabel"
            @click="onTransportClick"
          />
          <ListItemExpandable :opened="transportPickerShowed">
            <div
              ref="transportPicker"
              class="transport-picker"
            >
              <button
                :class="{ selected: trip.transport === 'walking' }"
                @click="selectTransport('walking')"
              >
                Пешком
              </button>
              <button
                :class="{ selected: trip.transport === 'car' }"
                @click="selectTransport('car')"
              >
                На машине
              </button>
            </div>
          </ListItemExpandable>
          <ListItem
            label="Max travel time"
            right-icon="chevron-right"
            :right-icon-label="travelTimeLabel"
            @click="onTimeClick"
          />
          <ListItemExpandable :opened="timePickerShowed">
            <div
              ref="timePicker"
              class="time-picker"
            >
              <Slider
                :model-value="trip.maxTravelTime"
                :min="5"
                :max="65"
                :step="5"
                @update:model-value="setMaxTravelTime"
              />
            </div>
          </ListItemExpandable>
        </List>
      </Section>
      <Section
        v-if="isLoading === false"
        padded
      >
        <List
          gapped
          class="results"
        >
          <template
            v-for="(hotel, index) in result"
            :key="'hotel:' + hotel.id"
          >
            <ListCard
              v-if="index === 3 || index === 5"
              :title="index === 3 ? 'Выбор клиентов' : 'Лучшее совпадение'"
              :picture="hotel.picture"
              :picture-thumb="(hotel.pictureThumb as string)"
            >
              <template #visible>
                <ListItem
                  :id="1"
                  :avatar="{src: hotel.picture, placeholder: hotel.title, pictureThumb: hotel.pictureThumb}"
                  :title="hotel.title"
                  :subtitle="hotel.subtitle"
                  nowrap
                >
                  <template #right>
                    <Rating :value="hotel.rating.rating" />
                  </template>
                </ListItem>
              </template>
              <template #collapsed>
                <Sections>
                  <Section
                    title="About"
                    padded
                  >
                    <Text>
                      {{ hotel.description }}
                    </Text>
                  </Section>
                  <Section padded>
                    <List>
                      <ListItem
                        :id="hotel.id"
                        transaction-icon="clock-fill"
                        title="Подробнее"
                        :subtitle="`Доступно ${hotel.rooms.length} групп`"
                        :to="`/hotel/${hotel.id}`"
                        right-icon="chevron-right"
                        standalone
                      />
                    </List>
                  </Section>
                </Sections>
              </template>
            </ListCard>
            <ListItem
              v-else
              :id="hotel.id"
              :avatar="{src: hotel.picture, placeholder: hotel.title, pictureThumb: hotel.pictureThumb}"
              :title="hotel.title"
              :subtitle="hotel.subtitle"
              :to="`/hotel/${hotel.id}`"
              big-avatar
              standalone
              :is-loading="isLoading"
            >
              <template #right>
                <div class="room-cell-right">
                  <Amount>
                    <template #topline>
                      from
                    </template>
                    {{ shortNumber(hotel.price * days) }}$
                    <template #subline>
                      for {{ days }} night{{ days > 1 ? 's' : '' }}
                    </template>
                  </Amount>
                </div>
                <!-- <div class="viewed">
                  <span class="viewed-eyes">
                    👀
                  </span>
                  2 viewed
                </div> -->
              </template>
            </ListItem>
          </template>
        </List>
      </Section>
    </Sections>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: height;
  transition: height 300ms ease;
  padding-block: 20px;

  &:not(&--loaded) {
    height: calc(var(--tg-viewport-stable-height) - v-bind('searchSettingsHeight + "px"') - var(--size-cell-h-margin) - var(--size-cell-v-margin) - v-bind('addressPickerHeight + "px"') - v-bind('timePickerHeight + "px"') - v-bind('transportPickerHeight + "px"'));
  }

  &--loading,
  &--loaded {
    transition: none;
  }

  &-picture {
    height: 110px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transform: translateZ(0);

  .sections {
    flex-grow: 1;
    grid-auto-rows: min-content;
  }
}

.viewed {
  background-color: #000;
  font-size: 11px;
  border-radius: 13px;
  padding: 6px 7px;
  position: absolute;
  transform: translate(-24px, 72px);
  z-index: 9;
  white-space: nowrap;
  animation: fade-in 200ms ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.viewed-eyes {
  display: inline-block;
  animation: eye-blink 200ms ease;
  animation-delay: 200ms;
}

@keyframes eye-blink {
  0% {
    transform: scale(0.5);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: none;
  }
}

.small {
  @apply --caption-2;

  color: var(--color-hint)
}

.room-cell-right {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  :deep(.amount){
    text-align: center;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 2.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.results {
  min-height: 800px;
}

.time-picker {
  padding: 15px var(--size-cell-h-padding);
}

.transport-picker {
  display: flex;
  gap: 10px;
  padding: 10px var(--size-cell-h-padding) 20px;

  button {
    flex: 1;
    padding: 6px 14px;
    border-radius: var(--size-border-radius-small);
    background-color: var(--color-bg-tertiary);
    border: none;
    color: var(--color-text);
    @apply --headline;

    &.selected {
      background-color: var(--color-link);
      color: #fff;
    }
  }
}

.address-picker {
  padding: 10px var(--size-cell-h-padding) 20px;
  width: 100%;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--size-border-radius-small);
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
}

.address-input {
  width: 100%;
  padding: 8px 0;
  border: none;
  background-color: transparent;
  color: var(--color-text);
  @apply --headline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  outline: none;
  
  &::placeholder {
    color: var(--color-hint);
  }
}

.switch-enter-active,
.switch-leave-active {
  transition: transform 300ms cubic-bezier(.39,-0.26,.16,1.25), opacity 300ms ease;
  position: absolute;
}
.switch-enter-from {
  transform: scale(0.1);
}
.switch-leave-to {
  transform: scale(0.6);
  opacity: 0.5;
}
</style>

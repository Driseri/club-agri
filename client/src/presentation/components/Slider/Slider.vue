<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
}>(), {
  min: 5,
  max: 65,
  step: 5,
})

defineEmits(['update:modelValue'])

// Calculate the percentage of the current value within the range
const valuePercentage = computed(() => {
  const range = props.max - props.min
  const value = props.modelValue - props.min
  return (value / range) * 100
})

// Determine if the slider is at max value
const isMaxValue = computed(() => props.modelValue === props.max)
</script>

<template>
  <input
    class="slider"
    type="range"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :value="modelValue"
    @input="$emit('update:modelValue', parseInt(($event.target as HTMLInputElement).value, 10))"
  >
</template>

<style scoped>
.slider {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  height: 30px;
  position: relative;
}

.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background: var(--color-bg-tertiary);
}

.slider::-moz-range-track {
  width: 100%;
  height: 2px;
  background: var(--color-bg-tertiary);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  background: v-bind(isMaxValue ? '#9C27B0' : valuePercentage < 33 ? '#4CAF50' : valuePercentage < 66 ? '#FFC107' : '#F44336');
  border-radius: 50%;
  margin-top: -7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background: v-bind(isMaxValue ? '#9C27B0' : valuePercentage < 33 ? '#4CAF50' : valuePercentage < 66 ? '#FFC107' : '#F44336');
  border-radius: 50%;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.slider {
  background-image: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 1px,
    transparent 1px,
    transparent calc(100% / 12)
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 2px;
}

/* Custom styles for better visual feedback */
.slider:focus {
  outline: none;
}

.slider:hover::-webkit-slider-thumb {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.slider:hover::-moz-range-thumb {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>

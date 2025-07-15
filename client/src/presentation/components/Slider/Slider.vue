<script setup lang="ts">
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
  background: var(--color-link);
  border-radius: 50%;
  margin-top: -7px;
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background: var(--color-link);
  border-radius: 50%;
  border: none;
}

.slider {
  background-image: repeating-linear-gradient(
    to right,
    var(--color-bg-tertiary) 0,
    var(--color-bg-tertiary) 1px,
    transparent 1px,
    transparent calc(100% / 12)
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 2px;
}
</style>

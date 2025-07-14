<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
}>(), {
  min: 0,
  max: 60,
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
}
</style>

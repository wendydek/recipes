<script setup lang="ts">
import Checkbox from './Checkbox.vue';

import type { CheckboxOption } from './checkbox';

export interface Props {
  options: CheckboxOption[] | null;
  modelValue: string[];
  label?: string;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
});

const emit = defineEmits(['update:modelValue']);

const update = (checked: boolean, value: string) => {
  const updatedValue = [...props.modelValue];

  if (checked) {
    updatedValue.push(value);
  } else {
    updatedValue.splice(updatedValue.indexOf(value), 1);
  }
  emit('update:modelValue', updatedValue);
};
</script>

<template>
  <div class="wrapper">
    <h3 v-if="props.label">
      {{ props.label }}
    </h3>
    <Checkbox
      v-for="option in props.options"
      class="checkbox"
      :key="option.id"
      :model-value="props.modelValue.includes(option.value)"
      :value="option.value"
      :name="option.label + option.id"
      :label="option.label"
      :subLabel="option.subLabel"
      @update:model-value="(checked: boolean) => update(checked, option.value)"
    />
  </div>
</template>

<style scoped>

h3 {
  margin-bottom: .5rem;
}
.checkbox {
  margin-bottom: .5rem;
}
</style>
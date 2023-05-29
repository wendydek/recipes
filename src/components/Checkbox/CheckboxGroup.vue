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
  // issue: it emits all values seperately because updatedValue is set again on every call
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
    <p v-if="props.label">
      {{ props.label }}
    </p>
    <Checkbox
      v-for="option in props.options"
      :key="option.id"
      :model-value="option.defaultValue || props.modelValue.includes(option.value)"
      :value="option.value"
      :name="option.label + option.id"
      :label="option.label"
      @update:model-value="(checked: boolean) => update(checked, option.value)"
    />
  </div>
</template>

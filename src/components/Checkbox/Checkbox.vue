<script setup lang="ts">
import { onMounted } from 'vue';

export interface Props {
  label: string;
  name: string;
  modelValue: boolean;
  defaultValue?: boolean;
  value: string;
}
const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  if(props.modelValue) {
    console.log('test');
    emit('update:modelValue', props.modelValue);
  }
})

const updateModelValue = () => {
  emit('update:modelValue', props.modelValue);
};
</script>

<template>
  <div class="wrapper">
    <input
      type="checkbox"
      :id="props.name"
      :checked="props.modelValue"
      :value="props.value"
      :name="props.name"
      @change="updateModelValue"
    />
    <label :for="props.name">
        {{ props.label }}
    </label>
  </div>
</template>

<style scoped>
.wrapper {
  align-items: center;
  display: flex;
  gap: .5rem;
}

input {
  width: 20px;
  height: 20px;
  border-radius: 8px;
  accent-color: #eeac10;
}

label {
  font-size: 1rem;
  line-height: 1;
}
</style>
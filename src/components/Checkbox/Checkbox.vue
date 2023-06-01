<script setup lang="ts">
export interface Props {
  label: string;
  subLabel?: string;
  name: string;
  modelValue: boolean;
  value: string;
}
const props = withDefaults(defineProps<Props>(), {
  subLabel: '',
});
const emit = defineEmits(['update:modelValue']);

const updateModelValue = () => {
  emit('update:modelValue', !props.modelValue);
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
        {{ label }}
        <span class="sublabel" v-if="subLabel">{{ subLabel }}</span>
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
  flex-shrink: 0;
}

label {
  font-size: 1rem;
  line-height: 1;
}

.sublabel {
  font-size: .85rem;
  display: block;
  margin-top: 2px;
}
</style>
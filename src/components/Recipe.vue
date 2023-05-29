<script setup lang="ts">
  import { ref, computed } from 'vue';
  import CheckboxGroup from './Checkbox/CheckboxGroup.vue';

  import type { CheckboxOption } from './Checkbox/checkbox';

  interface Ingredient {
    name: string;
    isAlternative?: boolean;
    isAlternativeFor?: string;
    isExtra?: boolean;
  }

  interface Variant {
    name: string;
    difficulty: 1 | 2 | 3;
    health: number;
    time: string;
    persons: number;
    howToPrepare: string;
    forChild: string;
    ingredients: Ingredient[];
  }

  interface Meal {
    order: number;
    name: string;
    variants: Variant[];
  }

  interface Props {
    recipe: Meal;
  }

  const props = defineProps<Props>();

  const isCollapsed = ref(false);
  const checkboxGroupValues = ref([]);
  const variant = ref('');

  const activeRecipe = computed(() => {
    if(props.recipe.variants.length === 1) {
      return props.recipe.variants[0];
    };

    if(variant.value) {
      return props.recipe.variants.filter(recipeVariant => variant.value === recipeVariant.name)[0];
    }

    return null;
  });

  const checklist = computed<CheckboxOption[] | null>(() => {
    if(activeRecipe.value) {
      return activeRecipe.value.ingredients.map(ingredient => ({
        id: ingredient.name.replaceAll(' ', ''),
        label: ingredient.name,
        value: ingredient.name,
        defaultValue: true,
      }))
    }

    return null;
  })
</script>

<template>
    <div>
      <div
        class="title"
        @click="() => isCollapsed = !isCollapsed"
      >
        {{props.recipe.name}}
        <span class="collapse-icon">{{isCollapsed ? '☝🏼' : '👇🏼'}}</span>
      </div>
      <div 
        v-if="isCollapsed"
        class="content"
      >
      <div v-if="props.recipe.variants.length > 1">
          <label for="variants">
            Variant
          </label>
          <select
            class="select"
            v-model="variant"
            id="variants"
          >
            <option disabled value="">Selecteer een variant</option>
            <option
              v-for="variant in props.recipe.variants"
              :value="variant.name"
              :key="variant.name.replaceAll(' ', '')"
            >
              {{variant.name}}
            </option>
          </select>
      </div>
      <h3>{{ activeRecipe?.name }}</h3>
      <p>{{ activeRecipe?.howToPrepare }}</p>
      <CheckboxGroup
        v-model="checkboxGroupValues"
        :options="checklist"
        name="checkList"
        label="group"
      />
      value: {{ checkboxGroupValues }}
      </div>
    </div>
</template>

<style scoped>
.title {
  border-bottom: 1px solid var(--vt-c-text-dark-2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: .5rem 0;
  font-size: 1.1rem;
}
.collapse-icon {
  font-size: 1.2rem;
}

select {
  background-color: white;
  background-image:
    linear-gradient(45deg, transparent 50%, #5b2b00 50%),
    linear-gradient(135deg, #5b2b00 50%, transparent 50%),
    linear-gradient(to right, #eeac10, #eeac10);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
  border: thin solid #eeac10;
  border-radius: 4px;
  display: block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 360px;
  max-width: 100%;
}

.content {
  padding: 16px 8px;
}
</style>
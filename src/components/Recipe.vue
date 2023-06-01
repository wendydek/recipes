<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import CheckboxGroup from './Checkbox/CheckboxGroup.vue';
  import { useShoppingList } from '../stores/shopplingList';

  import type { CheckboxOption } from './Checkbox/checkbox';
  import type { Meal } from './recipe';

  interface Props {
    recipe: Meal;
  }

  const props = defineProps<Props>();

  const isCollapsed = ref(false);
  const variant = ref('');
  const shoppingList = useShoppingList();
  const router = useRouter();
  
  const activeRecipe = computed(() => {
    if(props.recipe.variants.length === 1) return props.recipe.variants[0];
    
    if(variant.value) return props.recipe.variants.filter(recipeVariant => variant.value === recipeVariant.name)[0];
    
    return null;
  });

  const getSelectedIngredients = () => {
    return activeRecipe.value?.ingredients
      .filter(ingredient => !ingredient.isAlternative && !ingredient.isExtra)
      .map(baseIngredient => baseIngredient.name) 
      || [];
  }

  const checkboxGroupValues = ref(getSelectedIngredients());

  const checklist = computed<CheckboxOption[] | null>(() => {
    if(activeRecipe.value) {
      return activeRecipe.value.ingredients.map(ingredient => ({
        id: ingredient.name.replaceAll(' ', ''),
        label: ingredient.name,
        value: ingredient.name,
        subLabel: ingredient.isAlternative ? `Alternatief voor: ${ingredient.isAlternativeFor}` : ingredient.isExtra ? 'extra' : '',
      }))
    }

    return null;
  });

  const addToList = () => {
    shoppingList.addToList({
      recipeName: props.recipe.name,
      variantName: activeRecipe.value?.name || '',
      ingredients: checkboxGroupValues.value,
    });

    router.push({ path: '/list' });
  }

  watch(
    activeRecipe,
    () => {
      checkboxGroupValues.value = getSelectedIngredients();
    }
  )
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
          <label for="variants">Variant</label>
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
      <div class="intro">
        <h3>{{ activeRecipe?.name }}</h3>
        <p>{{ activeRecipe?.howToPrepare }}</p>
      </div>
      <div class="stats">
        <div>
          <p>Tijd</p>
          <p>{{ activeRecipe?.time }} minuten</p>
        </div>
        <div>
          <p>Aantal personen</p>
          <p>{{ activeRecipe?.persons }} minuten</p>
        </div>
      </div>
      <div class="stats" v-if="activeRecipe">
        <div>
          <p>Moeilijkheid</p>
          <div class="difficulty">
            <div class="bar" :style="{ width: activeRecipe.difficulty * 33.3333 + '%'}">
              <span>👩‍🍳</span>
              <span>👩‍🍳</span>
              <span>👩‍🍳</span>
            </div>
            <span>👩‍🍳</span>
            <span>👩‍🍳</span>
            <span>👩‍🍳</span>
          </div>
        </div>
        <div>
          <p>Gezond</p>
          <div class="difficulty">
            <div class="bar" :style="{ width: activeRecipe.health * 20 + '%'}">
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
            </div>
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
              <span>💪</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="addToList">
        <CheckboxGroup
          v-model="checkboxGroupValues"
          :options="checklist"
          name="checkList"
          label="Ingrediënten"
          class="checkGroup"
        />
        <button type="submit" class="button">
          Voeg toe aan boodschappenlijst
        </button>
      </form>
      <!-- TODO: add other recept info -->
      </div>
    </div>
</template>

<style scoped>

.intro {
  margin-bottom: 1rem;
}
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
  margin-bottom: .5rem;
}

.content {
  padding: 16px 8px;
}

.checkGroup {
  margin-bottom: 1.2rem;
}

.difficulty {
  display: inline-block;
  font-size: 1.5rem;
  position: relative;
}

.stats {
  display: flex;
  margin-bottom: 1rem;
}

.stats > div {
  flex-basis: 50%;
}

.stats > div > p:first-child {
  font-weight: bold;
}
.difficulty > span {
  opacity: .35;
}

.bar {
  position: absolute;
  height: 100%;
  color: white;
  display: flex;
  overflow: hidden;
}

</style>
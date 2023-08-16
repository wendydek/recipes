<script setup lang="ts">
import recipes from '../data/recipes.json';
import Recipe from '../components/Recipe.vue';

import type { Meal } from '../components/recipe';

// liefst rechtstreeks in template gebruiken, even kijken wat er mis gaat met de ts type
const typedRecipes = recipes as unknown as Meal[];
</script>

<template>
  <main>
    <Recipe 
      v-for="(recipe, index) in typedRecipes"
      :key="`recipe-${index}`"
      :recipe="recipe"
      class="item"
    />
  </main>
</template>

<style scoped>

</style>
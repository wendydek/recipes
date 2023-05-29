<script setup lang="ts">
import recipes from '../data/recipes.json';
import Recipe from '../components/Recipe.vue';
</script>

<template>
  <main>
    <Recipe 
      v-for="(recipe, index) in recipes"
      :key="`recipe-${index}`"
      :recipe="recipe"
      class="item"
    />
  </main>
</template>

<style scoped>

</style>
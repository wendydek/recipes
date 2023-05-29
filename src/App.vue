<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="menu">
      <RouterLink to="/">Gerechten</RouterLink>
      <RouterLink to="/about">Boodschappenlijst</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.menu {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.menu a {
  color: white;
  font-size: 1.2rem;
}

header {
  margin-bottom: 1rem;
}
</style>

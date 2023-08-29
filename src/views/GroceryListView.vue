<script setup lang="ts">
import { useShoppingList } from '../stores/shopplingList';
import emailjs from '@emailjs/browser';

const shoppingList = useShoppingList();

const formattedShoppingList = shoppingList.list.map(item => ({
  gerecht: `${item.recipeName} ${item.variantName}`,
  ingredienten: item.ingredients,
}));

const stringifyShoppingList = JSON.stringify(formattedShoppingList, null, "\t");

const emailData = {
  from_name: 'Automatische boodschappenlijst',
  to_name: 'Eef',
  message: stringifyShoppingList.replace(/[{}\]\[]/mg, ''),
  reply_to: 'wendydekock@gmail.com',
}
const sendEmail = () => {
  emailjs.send('service_xhkamqa', 'template_hbafeij', emailData, 'aNKo99RCogitv-Iv5')
    .then(() => {
        shoppingList.removeAllFormList();
    }, (error) => {
        console.error('FAILED...', error.text);
    });
}
</script>

<template>
  <div class="wrapper">
    <h2>Boodschappenlijstje</h2>
    <div v-if="shoppingList.list.length">
      <div
        v-for="(listItem, index) in shoppingList.list"
        :key="index"
        class="item"
      >
      <div class="title">
        <h3>{{ listItem.recipeName }} {{ listItem.variantName.toLowerCase() }}</h3>
        <button
          class="button small"
          @click="() => shoppingList.removeFromList(listItem.recipeName)"
        >
        💩
        </button>
      </div>
        <ul>
          <li
            v-for="(ingredient, index) in listItem.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <button class="button" @click="sendEmail">
        Mail het boodschappenlijstje
      </button>
    </div>
    <div v-else>
      Er zijn nog geen items aan de lijst toegevoegd.
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin-bottom: 1rem;
}
.item {
  border-bottom: 1px solid;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.button.small {
  font-size: 2rem;
  padding: 2px 4px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
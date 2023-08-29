import { ref } from 'vue';
import { defineStore } from 'pinia';

interface ListItem {
  recipeName: string;
  variantName: string;
  ingredients: string[];
}

export const storeSetup = () => {
  const list = ref<ListItem[]>([]);

  const addToList = (listItem: ListItem) => {
    list.value.push(listItem);
  }

  const removeFromList = (recipeName: string) => {
    list.value = list.value.filter(item => item.recipeName !== recipeName);
  }

  const removeAllFormList = () => {
    list.value = [];
  }

  return {
    list,
    addToList,
    removeFromList,
    removeAllFormList,
  };
};

export const useShoppingList = defineStore('shopplingList', storeSetup, {
  persist: true
});
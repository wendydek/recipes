interface Ingredient {
  name: string;
  isAlternative?: boolean;
  isAlternativeFor?: string;
  isExtra?: boolean;
}

interface Variant {
  name: string;
  difficulty: number;
  health: number;
  time: number;
  persons: number;
  howToPrepare: string;
  forChild: string;
  ingredients: Ingredient[];
}

export interface Meal {
  order: number;
  name: string;
  variants: Variant[];
}
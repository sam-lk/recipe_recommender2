import { Recipe } from '../types/recipe';
export const COLORS = {
  background: '#FFF8F0',
  // Soft Cream
  primary: '#FF6B35',
  // Warm Orange
  secondary: '#C0392B',
  // Curry Red
  accent: '#F39C12',
  // Golden Yellow
  text: '#2C1810',
  // Dark Brown
  textLight: '#5D4037',
  // Lighter Brown
  white: '#FFFFFF'
};
export const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Dairy-Free'];
export const CUISINE_OPTIONS = ['Indian', 'Sri Lankan', 'Japanese', 'Chinese', 'Thai', 'Korean'];
export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];
export const SAMPLE_RECIPES: Recipe[] = [{
  id: '1',
  title: 'Butter Chicken',
  description: 'Tender chicken in a rich, creamy tomato sauce with butter and spices. A popular Indian dish that everyone loves.',
  timeMinutes: 45,
  difficulty: 'Medium',
  caloriesPerServing: 520,
  servings: 4,
  cuisine: 'Indian',
  dietaryTags: ['Gluten-Free'],
  ingredients: [{
    item: 'chicken breast',
    amount: '500',
    unit: 'g'
  }, {
    item: 'tomatoes',
    amount: '4',
    unit: 'large'
  }, {
    item: 'heavy cream',
    amount: '1/2',
    unit: 'cup'
  }, {
    item: 'butter',
    amount: '3',
    unit: 'tbsp'
  }, {
    item: 'garam masala',
    amount: '2',
    unit: 'tsp'
  }, {
    item: 'ginger paste',
    amount: '1',
    unit: 'tbsp'
  }, {
    item: 'garlic paste',
    amount: '1',
    unit: 'tbsp'
  }, {
    item: 'onions',
    amount: '2',
    unit: 'medium'
  }],
  preparation: ['Cut chicken into bite-sized pieces and marinate with yogurt and spices for 30 minutes.', 'Heat butter in a large pan. Cook onions until soft.', 'Add ginger and garlic paste. Cook for 1 minute.', 'Add tomatoes and spices. Cook until tomatoes are soft.', 'Blend the tomato mixture to make a smooth sauce.', 'Pour sauce back into the pan. Add cream and chicken.', 'Simmer for 15-20 minutes until chicken is cooked through.', 'Serve hot with naan or rice.']
}, {
  id: '2',
  title: 'Vegetable Biryani',
  description: 'Fragrant rice cooked with mixed vegetables and aromatic spices. A complete meal in one pot.',
  timeMinutes: 50,
  difficulty: 'Medium',
  caloriesPerServing: 380,
  servings: 4,
  cuisine: 'Indian',
  dietaryTags: ['Vegetarian'],
  ingredients: [{
    item: 'basmati rice',
    amount: '2',
    unit: 'cups'
  }, {
    item: 'mixed vegetables',
    amount: '2',
    unit: 'cups'
  }, {
    item: 'yogurt',
    amount: '1/2',
    unit: 'cup'
  }, {
    item: 'biryani masala',
    amount: '2',
    unit: 'tbsp'
  }, {
    item: 'saffron',
    amount: '1',
    unit: 'pinch'
  }, {
    item: 'fresh mint',
    amount: '1/4',
    unit: 'cup'
  }, {
    item: 'fried onions',
    amount: '1/2',
    unit: 'cup'
  }],
  preparation: ['Wash and soak rice for 20 minutes.', 'Cook vegetables with yogurt and spices until half done.', 'In a separate pot, cook rice with whole spices until 70% done.', 'Layer the vegetable mix and rice in a heavy pot.', 'Sprinkle saffron milk, mint, and fried onions on top.', 'Cover tightly and cook on very low heat (dum) for 20 minutes.', 'Fluff the rice gently and serve.']
}, {
  id: '3',
  title: 'Coconut Dhal Curry',
  description: "Creamy red lentils cooked with coconut milk and Sri Lankan spices. Comfort food that's healthy and filling.",
  timeMinutes: 30,
  difficulty: 'Easy',
  caloriesPerServing: 280,
  servings: 4,
  cuisine: 'Sri Lankan',
  dietaryTags: ['Vegan', 'Gluten-Free', 'Vegetarian'],
  ingredients: [{
    item: 'red lentils',
    amount: '1',
    unit: 'cup'
  }, {
    item: 'coconut milk',
    amount: '1',
    unit: 'cup'
  }, {
    item: 'curry leaves',
    amount: '1',
    unit: 'sprig'
  }, {
    item: 'turmeric powder',
    amount: '1/2',
    unit: 'tsp'
  }, {
    item: 'cumin seeds',
    amount: '1',
    unit: 'tsp'
  }, {
    item: 'tomatoes',
    amount: '2',
    unit: 'medium'
  }, {
    item: 'onion',
    amount: '1',
    unit: 'small'
  }, {
    item: 'green chili',
    amount: '2',
    unit: 'pcs'
  }],
  preparation: ['Wash lentils thoroughly.', 'Put lentils, onion, tomato, green chili, turmeric, and water in a pot.', 'Cook until lentils are soft and water is absorbed.', 'Add coconut milk and salt. Simmer for 5 minutes.', 'In a small pan, heat oil and fry cumin seeds and curry leaves (tempering).', 'Pour the tempering over the dhal curry and mix well.']
}, {
  id: '4',
  title: 'Chicken Teriyaki',
  description: 'Sweet and savory glazed chicken with a shiny teriyaki sauce. Simple to make and tastes amazing.',
  timeMinutes: 25,
  difficulty: 'Easy',
  caloriesPerServing: 420,
  servings: 2,
  cuisine: 'Japanese',
  dietaryTags: ['Dairy-Free'],
  ingredients: [{
    item: 'chicken thighs',
    amount: '500',
    unit: 'g'
  }, {
    item: 'soy sauce',
    amount: '1/4',
    unit: 'cup'
  }, {
    item: 'mirin',
    amount: '1/4',
    unit: 'cup'
  }, {
    item: 'sugar',
    amount: '2',
    unit: 'tbsp'
  }, {
    item: 'ginger, grated',
    amount: '1',
    unit: 'tsp'
  }, {
    item: 'garlic, minced',
    amount: '1',
    unit: 'tsp'
  }, {
    item: 'sesame seeds',
    amount: '1',
    unit: 'tsp'
  }],
  preparation: ['Mix soy sauce, mirin, sugar, ginger, and garlic in a bowl.', 'Pan-fry chicken thighs until golden brown on both sides.', 'Pour the sauce mixture over the chicken.', 'Simmer until the sauce thickens and coats the chicken.', 'Slice the chicken and sprinkle with sesame seeds.', 'Serve with steamed rice and vegetables.']
}, {
  id: '5',
  title: 'Kottu Roti',
  description: 'Chopped flatbread stir-fried with vegetables, eggs, and spices. A Sri Lankan street food favorite.',
  timeMinutes: 20,
  difficulty: 'Easy',
  caloriesPerServing: 450,
  servings: 2,
  cuisine: 'Sri Lankan',
  dietaryTags: ['Vegetarian Option'],
  ingredients: [{
    item: 'roti or paratha',
    amount: '4',
    unit: 'pcs'
  }, {
    item: 'eggs',
    amount: '2',
    unit: 'large'
  }, {
    item: 'cabbage, chopped',
    amount: '1',
    unit: 'cup'
  }, {
    item: 'carrots, grated',
    amount: '1',
    unit: 'cup'
  }, {
    item: 'onion',
    amount: '1',
    unit: 'large'
  }, {
    item: 'curry powder',
    amount: '1',
    unit: 'tbsp'
  }, {
    item: 'chili flakes',
    amount: '1',
    unit: 'tsp'
  }],
  preparation: ['Cut the roti into small strips or pieces.', 'Heat oil in a wok or large pan. Sauté onions, curry leaves, and vegetables.', 'Move vegetables to the side and scramble the eggs in the center.', 'Add the chopped roti, curry powder, chili flakes, and salt.', 'Stir-fry everything together on high heat for 3-5 minutes.', 'Serve hot with extra curry gravy if desired.']
}, {
  id: '6',
  title: 'Vegetable Tempura',
  description: 'Crispy battered vegetables fried until golden. Light and crunchy with a delicate flavor.',
  timeMinutes: 30,
  difficulty: 'Medium',
  caloriesPerServing: 320,
  servings: 4,
  cuisine: 'Japanese',
  dietaryTags: ['Vegetarian'],
  ingredients: [{
    item: 'mixed vegetables',
    amount: '500',
    unit: 'g'
  }, {
    item: 'tempura flour',
    amount: '1',
    unit: 'cup'
  }, {
    item: 'ice cold water',
    amount: '3/4',
    unit: 'cup'
  }, {
    item: 'oil',
    amount: 'for frying',
    unit: ''
  }, {
    item: 'soy sauce',
    amount: 'for dipping',
    unit: ''
  }],
  preparation: ['Cut vegetables (sweet potato, eggplant, bell pepper) into slices.', 'Mix tempura flour with ice cold water. Do not overmix; lumps are okay.', 'Heat oil in a deep pan to 170°C (340°F).', 'Dip vegetables into the batter and carefully place in hot oil.', 'Fry until light golden and crispy (about 2-3 minutes).', 'Drain on a wire rack and serve immediately with dipping sauce.']
}];
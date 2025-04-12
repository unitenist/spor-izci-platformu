
import { MealType } from '../types/NutritionTypes';

export const mockMeals: MealType[] = [
  {
    id: '1',
    name: 'Yulaf Ezmesi',
    type: 'Kahvaltı',
    calories: 350,
    protein: 15,
    carbs: 50,
    fat: 8,
    imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ingredients: ['1/2 su bardağı yulaf', '1 su bardağı süt', '1 tatlı kaşığı bal', '1 adet muz', 'Bir avuç çiğ badem'],
    time: '08:00'
  },
  {
    id: '2',
    name: 'Izgara Tavuk Salatası',
    type: 'Öğle Yemeği',
    calories: 420,
    protein: 40,
    carbs: 20,
    fat: 15,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ingredients: ['150g ızgara tavuk göğsü', '2 su bardağı yeşillik', '1 adet domates', '1/4 avokado', '1 yemek kaşığı zeytinyağı'],
    time: '13:00'
  },
  {
    id: '3',
    name: 'Proteinli Smoothie',
    type: 'Ara Öğün',
    calories: 220,
    protein: 25,
    carbs: 25,
    fat: 3,
    imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ingredients: ['1 ölçek protein tozu', '1 adet muz', '200ml badem sütü', '1 tatlı kaşığı yulaf ezmesi'],
    time: '16:00'
  },
  {
    id: '4',
    name: 'Somon ve Quinoa',
    type: 'Akşam Yemeği',
    calories: 480,
    protein: 35,
    carbs: 40,
    fat: 18,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ingredients: ['150g fırında somon', '1/2 su bardağı pişmiş kinoa', 'Mevsim yeşillikleri', '1 yemek kaşığı zeytinyağı', 'Limon suyu'],
    time: '19:30'
  }
];

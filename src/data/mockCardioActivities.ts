
import { CardioActivityType } from '../types/CardioTypes';

export const mockCardioActivities: CardioActivityType[] = [
  {
    id: '1',
    type: 'Yürüyüş',
    duration: 45,
    distance: 3.2,
    caloriesBurned: 210,
    date: '2024-04-11',
    notes: 'Parkta tempolu yürüyüş'
  },
  {
    id: '2',
    type: 'Bisiklet',
    duration: 60,
    distance: 15,
    caloriesBurned: 420,
    date: '2024-04-10',
    notes: 'Şehir turu'
  },
  {
    id: '3',
    type: 'Koşu',
    duration: 30,
    distance: 5,
    caloriesBurned: 350,
    date: '2024-04-09'
  },
  {
    id: '4',
    type: 'Yürüyüş',
    duration: 60,
    distance: 4.5,
    caloriesBurned: 280,
    date: '2024-04-08',
    notes: 'Dağ yürüyüşü'
  },
  {
    id: '5',
    type: 'Bisiklet',
    duration: 45,
    distance: 12,
    caloriesBurned: 315,
    date: '2024-04-07'
  }
];

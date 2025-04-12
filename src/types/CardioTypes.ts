
export interface CardioActivityType {
  id: string;
  type: 'Yürüyüş' | 'Koşu' | 'Bisiklet' | 'Yüzme' | 'Kürek' | 'Diğer';
  duration: number; // dakika
  distance?: number; // km
  caloriesBurned: number;
  date: string;
  notes?: string;
}

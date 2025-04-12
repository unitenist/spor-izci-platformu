
export interface WorkoutType {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: number;
  exercises: number;
  lastPerformed?: string;
  equipment?: string[];
  caloriesBurn?: number;
  difficulty?: 'Başlangıç' | 'Orta' | 'İleri';
}

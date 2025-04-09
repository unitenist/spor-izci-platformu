
export interface WorkoutType {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: number;
  exercises: number;
  lastPerformed?: string;
}

// Mock data for workouts
export const mockWorkouts: WorkoutType[] = [
  {
    id: '1',
    name: 'Tam Vücut Antrenmanı',
    description: 'Tüm vücut kaslarını çalıştıran egzersizler',
    type: 'Kardiyo + Güç',
    duration: 60,
    exercises: 8,
    lastPerformed: '3 gün önce'
  },
  {
    id: '2',
    name: 'Üst Vücut Güçlendirme',
    description: 'Üst vücut kaslarını hedefleyen program',
    type: 'Güç',
    duration: 45,
    exercises: 6
  },
  {
    id: '3',
    name: 'Alt Vücut Güçlendirme',
    description: 'Bacak ve kalça kaslarını geliştirme antrenmanı',
    type: 'Güç',
    duration: 50,
    exercises: 7,
    lastPerformed: '1 hafta önce'
  },
  {
    id: '4',
    name: 'HIIT Kardiyo',
    description: 'Yüksek yoğunluklu interval antrenmanı',
    type: 'Kardiyo',
    duration: 30,
    exercises: 10
  },
  {
    id: '5',
    name: 'Core Antrenmanı',
    description: 'Karın, bel ve sırt kaslarını güçlendirme',
    type: 'Güç',
    duration: 35,
    exercises: 8,
    lastPerformed: '2 gün önce'
  },
  {
    id: '6',
    name: 'Esneme ve Mobilite',
    description: 'Esnekliği artıran ve eklem hareketliliğini geliştiren egzersizler',
    type: 'Esneklik',
    duration: 40,
    exercises: 12
  }
];


export interface WorkoutType {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: number;
  exercises: number;
  lastPerformed?: string;
}

// Updated mock data for workouts including equipment-specific workouts
export const mockWorkouts: WorkoutType[] = [
  {
    id: '1',
    name: 'Barbell Güç Antrenmanı',
    description: 'Barbell ile yapılan temel güç egzersizleri',
    type: 'Güç',
    duration: 60,
    exercises: 5,
    lastPerformed: '3 gün önce'
  },
  {
    id: '2',
    name: 'Üst Vücut Bench Press',
    description: 'Bench kullanarak üst vücut kaslarını hedefleyen program',
    type: 'Güç',
    duration: 45,
    exercises: 6
  },
  {
    id: '3',
    name: 'Direnç Bandı Antrenmanı',
    description: 'Direnç bandı kullanarak tüm vücut egzersizleri',
    type: 'Güç + Esneklik',
    duration: 40,
    exercises: 8,
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
    name: 'Core ve Mat Antrenmanı',
    description: 'Yoga matı kullanarak karın, bel ve sırt kaslarını güçlendirme',
    type: 'Güç + Esneklik',
    duration: 35,
    exercises: 7,
    lastPerformed: '2 gün önce'
  },
  {
    id: '6',
    name: 'Kablo Makinesi Full Body',
    description: 'Kablo makinesi kullanarak tüm vücut egzersizleri',
    type: 'Güç',
    duration: 50,
    exercises: 8
  },
  {
    id: '7',
    name: 'Barbell ve Bench Kombinasyonu',
    description: 'Barbell ve bench press bankı kullanarak üst vücut geliştirme',
    type: 'Güç',
    duration: 55,
    exercises: 6
  },
  {
    id: '8',
    name: 'Ev Egzersizleri',
    description: 'Minimal ekipmanla evde yapılabilecek egzersizler',
    type: 'Kardiyo + Güç',
    duration: 40,
    exercises: 9
  }
];

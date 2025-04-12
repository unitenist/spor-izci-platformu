
import { WorkoutType } from '../types/WorkoutTypes';

export const mockWorkouts: WorkoutType[] = [
  {
    id: '1',
    name: 'Barbell Güç Antrenmanı',
    description: 'Barbell ile yapılan temel güç egzersizleri, büyük kas gruplarını hedefler',
    type: 'Güç',
    duration: 60,
    exercises: 5,
    lastPerformed: '3 gün önce',
    equipment: ['Barbell', 'Ağırlık Plakaları', 'Bench'],
    caloriesBurn: 450,
    difficulty: 'Orta'
  },
  {
    id: '2',
    name: 'Üst Vücut Bench Press',
    description: 'Bench kullanarak üst vücut kaslarını hedefleyen program',
    type: 'Güç',
    duration: 45,
    exercises: 6,
    equipment: ['Barbell', 'Bench', 'Ağırlık Plakaları'],
    caloriesBurn: 380,
    difficulty: 'Orta'
  },
  {
    id: '3',
    name: 'Direnç Bandı Antrenmanı',
    description: 'Direnç bandı kullanarak tüm vücut egzersizleri',
    type: 'Güç + Esneklik',
    duration: 40,
    exercises: 8,
    lastPerformed: '1 hafta önce',
    equipment: ['Direnç Bandı', 'Yoga Matı'],
    caloriesBurn: 300,
    difficulty: 'Başlangıç'
  },
  {
    id: '4',
    name: 'HIIT Kardiyo',
    description: 'Yüksek yoğunluklu interval antrenmanı, maksimum kalori yakımı için idealdir',
    type: 'Kardiyo',
    duration: 30,
    exercises: 10,
    equipment: ['Yoga Matı'],
    caloriesBurn: 400,
    difficulty: 'İleri'
  },
  {
    id: '5',
    name: 'Core ve Mat Antrenmanı',
    description: 'Yoga matı kullanarak karın, bel ve sırt kaslarını güçlendirme',
    type: 'Güç + Esneklik',
    duration: 35,
    exercises: 7,
    lastPerformed: '2 gün önce',
    equipment: ['Yoga Matı'],
    caloriesBurn: 250,
    difficulty: 'Başlangıç'
  },
  {
    id: '6',
    name: 'Kablo Makinesi Full Body',
    description: 'Kablo makinesi kullanarak tüm vücut egzersizleri',
    type: 'Güç',
    duration: 50,
    exercises: 8,
    equipment: ['Kablo Makinesi', 'Kablo Aparatları'],
    caloriesBurn: 400,
    difficulty: 'Orta'
  },
  {
    id: '7',
    name: 'Barbell ve Bench Kombinasyonu',
    description: 'Barbell ve bench press bankı kullanarak üst vücut geliştirme',
    type: 'Güç',
    duration: 55,
    exercises: 6,
    equipment: ['Barbell', 'Bench', 'Ağırlık Plakaları'],
    caloriesBurn: 420,
    difficulty: 'Orta'
  },
  {
    id: '8',
    name: 'Ev Egzersizleri',
    description: 'Minimal ekipmanla evde yapılabilecek egzersizler',
    type: 'Kardiyo + Güç',
    duration: 40,
    exercises: 9,
    equipment: ['Yoga Matı', 'Direnç Bandı'],
    caloriesBurn: 320,
    difficulty: 'Başlangıç'
  },
  {
    id: '9',
    name: 'Yoğun Barbell Antrenmanı',
    description: 'Barbell kullanarak tüm vücut için yüksek yoğunluklu antrenman',
    type: 'Güç',
    duration: 65,
    exercises: 7,
    equipment: ['Barbell', 'Ağırlık Plakaları'],
    caloriesBurn: 500,
    difficulty: 'İleri'
  },
  {
    id: '10',
    name: 'Bisiklet Kardiyosu',
    description: '30 dakikalık tempolu bisiklet antrenmanı, dayanıklılığı artırır',
    type: 'Kardiyo',
    duration: 30,
    exercises: 1,
    caloriesBurn: 350,
    difficulty: 'Orta'
  },
  {
    id: '11',
    name: 'Yürüyüş ve Koşu Kombinasyonu',
    description: 'Yürüyüş ve koşu aralıklarıyla yapılan kardiyo antrenmanı',
    type: 'Kardiyo',
    duration: 45,
    exercises: 2,
    caloriesBurn: 380,
    difficulty: 'Başlangıç'
  }
];

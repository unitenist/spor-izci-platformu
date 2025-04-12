
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

// Kardiyovasküler aktivite verileri
export interface CardioActivityType {
  id: string;
  type: 'Yürüyüş' | 'Koşu' | 'Bisiklet' | 'Yüzme' | 'Kürek' | 'Diğer';
  duration: number; // dakika
  distance?: number; // km
  caloriesBurned: number;
  date: string;
  notes?: string;
}

// Beslenme planı verileri
export interface MealType {
  id: string;
  name: string;
  type: 'Kahvaltı' | 'Öğle Yemeği' | 'Akşam Yemeği' | 'Ara Öğün';
  calories: number;
  protein: number; // gram
  carbs: number; // gram
  fat: number; // gram
  imageUrl?: string;
  ingredients?: string[];
  recipe?: string;
  time?: string;
}

// Günlük kalori takibi 
export interface DailyNutritionType {
  date: string;
  targetCalories: number;
  consumedCalories: number;
  burnedCalories: number;
  waterIntake: number; // ml
  meals: {
    breakfast?: MealType[];
    lunch?: MealType[];
    dinner?: MealType[];
    snacks?: MealType[];
  };
}

// Örnek kardiyovasküler aktivite verileri
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

// Örnek beslenme planı verileri
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

// Günlük beslenme örneği
export const mockDailyNutrition: DailyNutritionType = {
  date: '2024-04-12',
  targetCalories: 2200,
  consumedCalories: 1850,
  burnedCalories: 450,
  waterIntake: 2100,
  meals: {
    breakfast: [mockMeals[0]],
    lunch: [mockMeals[1]],
    dinner: [mockMeals[3]],
    snacks: [mockMeals[2]]
  }
};

// Güncellenmiş mockWorkouts veri seti - ekipman bilgisi, zorluk ve yakılan kalori bilgisi eklenmiş hali 
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

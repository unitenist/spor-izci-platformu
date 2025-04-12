
import { toast } from "@/hooks/use-toast";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  category?: string;
  imageUrl?: string;
}

// Yemek API'si entegrasyonu için ücretsiz bir API kullanabiliriz
// Bu örnek için statik bir veri kümesi oluşturuyoruz
// Gerçek projede burayı gerçek bir API ile değiştirebilirsiniz

// Örnek kategoriler ve yemek verileri
const foodCategories = [
  "Kahvaltılıklar",
  "Et Ürünleri",
  "Süt Ürünleri",
  "Baklagiller",
  "Meyveler",
  "Sebzeler",
  "Tahıllar",
  "İçecekler",
  "Atıştırmalıklar",
  "Tatlılar",
  "Hazır Yemekler"
];

// Geniş Türk ve dünya mutfaklarından yemekler koleksiyonu
export const foodDatabase: FoodItem[] = [
  // Kahvaltılıklar
  { id: "1", name: "Yulaf Ezmesi (1 porsiyon)", calories: 150, protein: 5, carbs: 27, fat: 3, portion: "40 g", category: "Kahvaltılıklar" },
  { id: "2", name: "Haşlanmış Yumurta", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, portion: "1 adet (50 g)", category: "Kahvaltılıklar" },
  { id: "3", name: "Tam Tahıllı Ekmek", calories: 80, protein: 3, carbs: 15, fat: 1, portion: "1 dilim (30 g)", category: "Kahvaltılıklar" },
  { id: "4", name: "Beyaz Peynir", calories: 93, protein: 6, carbs: 1, fat: 7, portion: "30 g", category: "Kahvaltılıklar" },
  { id: "5", name: "Bal", calories: 65, protein: 0, carbs: 17, fat: 0, portion: "1 yemek kaşığı (20 g)", category: "Kahvaltılıklar" },
  
  // Et Ürünleri
  { id: "6", name: "Tavuk Göğsü (pişmiş)", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: "100 g", category: "Et Ürünleri" },
  { id: "7", name: "Dana Kıyma (az yağlı)", calories: 200, protein: 24, carbs: 0, fat: 12, portion: "100 g", category: "Et Ürünleri" },
  { id: "8", name: "Somon (pişmiş)", calories: 206, protein: 22, carbs: 0, fat: 12, portion: "100 g", category: "Et Ürünleri" },
  { id: "9", name: "Hindi Göğsü (pişmiş)", calories: 157, protein: 29, carbs: 0, fat: 4, portion: "100 g", category: "Et Ürünleri" },
  
  // Süt Ürünleri
  { id: "10", name: "Süt (yarım yağlı)", calories: 50, protein: 3.5, carbs: 5, fat: 1.7, portion: "100 ml", category: "Süt Ürünleri" },
  { id: "11", name: "Yoğurt (süzme)", calories: 120, protein: 10, carbs: 4, fat: 7, portion: "100 g", category: "Süt Ürünleri" },
  { id: "12", name: "Ayran", calories: 40, protein: 2, carbs: 3, fat: 2, portion: "200 ml", category: "Süt Ürünleri" },
  { id: "13", name: "Kaşar Peyniri", calories: 120, protein: 8, carbs: 1, fat: 9, portion: "30 g", category: "Süt Ürünleri" },
  
  // Baklagiller
  { id: "14", name: "Mercimek (pişmiş)", calories: 115, protein: 9, carbs: 20, fat: 0.4, portion: "100 g", category: "Baklagiller" },
  { id: "15", name: "Nohut (pişmiş)", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6, portion: "100 g", category: "Baklagiller" },
  { id: "16", name: "Kuru Fasulye (pişmiş)", calories: 140, protein: 8.7, carbs: 25.8, fat: 0.5, portion: "100 g", category: "Baklagiller" },
  
  // Meyveler
  { id: "17", name: "Elma", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: "1 orta boy (100 g)", category: "Meyveler" },
  { id: "18", name: "Muz", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, portion: "1 orta boy (100 g)", category: "Meyveler" },
  { id: "19", name: "Çilek", calories: 33, protein: 0.7, carbs: 7.7, fat: 0.3, portion: "100 g", category: "Meyveler" },
  { id: "20", name: "Portakal", calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, portion: "1 orta boy (100 g)", category: "Meyveler" },
  
  // Sebzeler
  { id: "21", name: "Brokoli (pişmiş)", calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4, portion: "100 g", category: "Sebzeler" },
  { id: "22", name: "Havuç (çiğ)", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, portion: "100 g", category: "Sebzeler" },
  { id: "23", name: "Ispanak (pişmiş)", calories: 23, protein: 2.9, carbs: 3.8, fat: 0.4, portion: "100 g", category: "Sebzeler" },
  { id: "24", name: "Domates", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: "1 orta boy (100 g)", category: "Sebzeler" },
  
  // Tahıllar
  { id: "25", name: "Pirinç (pişmiş)", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: "100 g", category: "Tahıllar" },
  { id: "26", name: "Bulgur (pişmiş)", calories: 83, protein: 3.1, carbs: 18.6, fat: 0.2, portion: "100 g", category: "Tahıllar" },
  { id: "27", name: "Makarna (pişmiş)", calories: 158, protein: 5.8, carbs: 31, fat: 0.9, portion: "100 g", category: "Tahıllar" },
  { id: "28", name: "Kinoa (pişmiş)", calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, portion: "100 g", category: "Tahıllar" },
  
  // İçecekler
  { id: "29", name: "Elma Suyu", calories: 46, protein: 0.1, carbs: 11.6, fat: 0.1, portion: "100 ml", category: "İçecekler" },
  { id: "30", name: "Portakal Suyu", calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, portion: "100 ml", category: "İçecekler" },
  { id: "31", name: "Yeşil Çay", calories: 2, protein: 0, carbs: 0.5, fat: 0, portion: "200 ml", category: "İçecekler" },
  { id: "32", name: "Türk Kahvesi", calories: 2, protein: 0.1, carbs: 0.3, fat: 0, portion: "1 fincan (50 ml)", category: "İçecekler" },
  
  // Atıştırmalıklar
  { id: "33", name: "Kuruyemiş Karışımı", calories: 175, protein: 5, carbs: 6, fat: 15, portion: "30 g", category: "Atıştırmalıklar" },
  { id: "34", name: "Kuru Kayısı", calories: 53, protein: 0.8, carbs: 13.4, fat: 0.1, portion: "25 g (5 adet)", category: "Atıştırmalıklar" },
  { id: "35", name: "Meyve Barı", calories: 120, protein: 2, carbs: 25, fat: 2, portion: "1 adet (30 g)", category: "Atıştırmalıklar" },
  
  // Tatlılar
  { id: "36", name: "Sütlaç", calories: 150, protein: 3.5, carbs: 26, fat: 4, portion: "1 porsiyon (100 g)", category: "Tatlılar" },
  { id: "37", name: "Baklava", calories: 334, protein: 4.3, carbs: 40, fat: 18, portion: "1 adet (80 g)", category: "Tatlılar" },
  { id: "38", name: "Çikolata (bitter)", calories: 145, protein: 1.5, carbs: 15, fat: 10, portion: "25 g", category: "Tatlılar" },
  
  // Hazır Yemekler
  { id: "39", name: "Sebzeli Pilav", calories: 180, protein: 4, carbs: 35, fat: 3, portion: "1 porsiyon (150 g)", category: "Hazır Yemekler" },
  { id: "40", name: "Mercimek Çorbası", calories: 90, protein: 5, carbs: 15, fat: 2, portion: "1 kase (200 ml)", category: "Hazır Yemekler" },
  { id: "41", name: "Tavuk Döner", calories: 240, protein: 18, carbs: 20, fat: 12, portion: "1 porsiyon (150 g)", category: "Hazır Yemekler" },
  { id: "42", name: "Sebzeli Pizza", calories: 280, protein: 12, carbs: 35, fat: 10, portion: "1 dilim (100 g)", category: "Hazır Yemekler" }
];

// Yemek arama fonksiyonu
export const searchFoods = (query: string): FoodItem[] => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const lowerCaseQuery = query.toLowerCase();
  return foodDatabase.filter(
    food => food.name.toLowerCase().includes(lowerCaseQuery) || 
            (food.category && food.category.toLowerCase().includes(lowerCaseQuery))
  );
};

// Kategori bazlı yemek getirme
export const getFoodsByCategory = (category: string): FoodItem[] => {
  return foodDatabase.filter(food => food.category === category);
};

// Tüm kategorileri getirme
export const getAllCategories = (): string[] => {
  return foodCategories;
};

// Yemeği ID'ye göre bulma
export const getFoodById = (id: string): FoodItem | undefined => {
  return foodDatabase.find(food => food.id === id);
};

// Bu fonksiyonu kullanarak dışarıdan gerçek bir API'ye bağlanabilirsiniz
// Örnek: Edamam API, Nutritionix API, Spoonacular API
export const fetchFoodDataFromApi = async (query: string): Promise<FoodItem[]> => {
  try {
    // Gerçek bir API bağlantısı burada olacak
    // Şimdilik kendi veritabanımızı kullanıyoruz
    return searchFoods(query);
    
    /* Gerçek API örneği:
    const response = await fetch(`https://api.example.com/foods?query=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
      }
    });
    
    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }
    
    const data = await response.json();
    return data.map(item => ({
      id: item.id,
      name: item.food_name,
      calories: item.nf_calories,
      protein: item.nf_protein,
      carbs: item.nf_total_carbohydrate,
      fat: item.nf_total_fat,
      portion: item.serving_unit,
      category: item.food_group
    }));
    */
  } catch (error) {
    console.error('Yemek verisi çekilirken hata oluştu:', error);
    toast({
      title: "Hata",
      description: "Yemek verisi alınamadı. Lütfen tekrar deneyin.",
      variant: "destructive"
    });
    return [];
  }
};

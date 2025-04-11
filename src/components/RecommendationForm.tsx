
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Bike, 
  PersonStanding, 
  Weight, 
  ArrowRight,
  Check 
} from 'lucide-react';

type Activity = {
  type: 'walking' | 'cycling';
  duration: number;
  date: string;
}

type RecommendationFormProps = {
  isOpen: boolean;
  onClose: () => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ isOpen, onClose }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('weight-loss');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityType, setActivityType] = useState<'walking' | 'cycling'>('walking');
  const [activityDuration, setActivityDuration] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState({
    workoutName: '',
    workoutDescription: '',
    workoutType: '',
    nutritionTips: [] as string[],
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const calculateBMI = () => {
    if (!height || !weight) return 0;
    const heightInM = parseFloat(height) / 100;
    return parseFloat(weight) / (heightInM * heightInM);
  };
  
  const generateRecommendation = () => {
    if (!height || !weight) {
      toast({
        variant: "destructive",
        title: "Eksik bilgi",
        description: "Lütfen boy ve kilo değerlerinizi girin.",
      });
      return;
    }
    
    const bmi = calculateBMI();
    let recommendation = {
      workoutName: '',
      workoutDescription: '',
      workoutType: '',
      nutritionTips: [] as string[],
    };
    
    // Generate recommendation based on BMI and goal
    if (bmi < 18.5) {
      // Underweight
      recommendation = {
        workoutName: 'Kas Kazanım Programı',
        workoutDescription: 'Kilo almanıza ve kas kütlesi kazanmanıza yardımcı olacak bir antrenman programı.',
        workoutType: 'strength',
        nutritionTips: [
          'Günde 5-6 öğün beslenin.',
          'Protein açısından zengin gıdaları arttırın (et, tavuk, balık, yumurta, süt ürünleri).',
          'Kompleks karbonhidratlar tüketin (tam tahıllar, patates, pirinç).',
          'Sağlıklı yağlar ekleyin (avokado, fındık, zeytinyağı).',
          'Protein shake ve smoothie\'ler ile ek kalori alın.'
        ]
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      // Normal weight
      if (goal === 'weight-loss') {
        recommendation = {
          workoutName: 'Kardiyo & Ton Programı',
          workoutDescription: 'Mevcut kas kütlenizi korurken vücut şeklinizi iyileştirmeye odaklanan program.',
          workoutType: 'hybrid',
          nutritionTips: [
            'Porsiyon kontrolüne dikkat edin.',
            'Protein alımını yüksek tutun.',
            'Rafine şeker ve işlenmiş gıdaları sınırlayın.',
            'Sebze ve meyve tüketimini arttırın.',
            'Günde en az 2 litre su için.'
          ]
        };
      } else if (goal === 'muscle-gain') {
        recommendation = {
          workoutName: 'Güç & Hipertrofi Programı',
          workoutDescription: 'Kas kütlesi kazanmanıza odaklanan yoğun bir direnç antrenmanı programı.',
          workoutType: 'strength',
          nutritionTips: [
            'Günlük protein alımınızı vücut ağırlığınızın 1.6-2 katına çıkarın.',
            'Antrenman öncesi ve sonrası karbonhidrat alımını arttırın.',
            'Günlük kalori alımınızı %10-15 arttırın.',
            'Antrenman sonrası 30 dakika içinde beslenin.',
            'Kreatin takviyesi düşünebilirsiniz.'
          ]
        };
      } else {
        recommendation = {
          workoutName: 'Dengeli Fitness Programı',
          workoutDescription: 'Genel sağlık, kondisyon ve kas dengesini korumak için tasarlanmış program.',
          workoutType: 'hybrid',
          nutritionTips: [
            'Dengeli ve çeşitli beslenin.',
            'İşlenmiş gıdalardan kaçının.',
            'Protein, karbonhidrat ve yağ dengesine dikkat edin.',
            'Mevsimsel sebze ve meyve tüketin.',
            'Aşırı şeker ve tuz tüketiminden kaçının.'
          ]
        };
      }
    } else if (bmi >= 25 && bmi < 30) {
      // Overweight
      recommendation = {
        workoutName: 'Yağ Yakım Programı',
        workoutDescription: 'Kalori yakımını maksimize edip vücut kompozisyonunuzu iyileştiren program.',
        workoutType: 'cardio',
        nutritionTips: [
          'Kalori alımınızı %15-20 azaltın.',
          'Şeker ve işlenmiş karbonhidratları sınırlayın.',
          'Her öğünde protein bulundurun.',
          'Sebze tüketimini artırın.',
          'Aralıklı oruç (intermittent fasting) düşünebilirsiniz.'
        ]
      };
    } else {
      // Obese
      recommendation = {
        workoutName: 'Sağlıklı Yaşam Başlangıç Programı',
        workoutDescription: 'Eklemlere minimum yük bindirerek kademeli olarak fitness seviyenizi artıran program.',
        workoutType: 'cardio',
        nutritionTips: [
          'Porsiyonları küçültün.',
          'Su tüketimini arttırın (günde en az 3 litre).',
          'İşlenmiş gıda ve şekerli içecekleri kesin.',
          'Sebze ve protein ağırlıklı beslenin.',
          'Düzenli öğün saatleri belirleyin ve ara öğünleri sağlıklı atıştırmalıklarla değiştirin.'
        ]
      };
    }
    
    setRecommendation(recommendation);
    setShowRecommendation(true);
  };
  
  const addActivity = () => {
    if (!activityDuration) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen aktivite süresini girin.",
      });
      return;
    }
    
    const newActivity: Activity = {
      type: activityType,
      duration: parseInt(activityDuration),
      date: new Date().toISOString().split('T')[0]
    };
    
    setActivities([...activities, newActivity]);
    setActivityDuration('');
    
    toast({
      title: "Aktivite eklendi",
      description: `${activityType === 'walking' ? 'Yürüyüş' : 'Bisiklet'} aktivitesi başarıyla eklendi.`,
    });
  };
  
  const acceptRecommendation = () => {
    const { workoutName, workoutDescription, workoutType } = recommendation;
    
    // Create workout with the recommendation
    toast({
      title: "Program oluşturuluyor",
      description: "Önerilen program oluşturuluyor...",
    });
    
    // In a real app, we would save the workout to a database
    // For now, we'll just navigate the user to the workouts page
    setTimeout(() => {
      toast({
        title: "Başarılı",
        description: "Önerilen program başarıyla oluşturuldu!",
      });
      navigate('/workouts');
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${isMobile ? 'w-[95%] p-4' : ''}`}>
        {!showRecommendation ? (
          <>
            <DialogHeader>
              <DialogTitle>Kişiselleştirilmiş Program Oluştur</DialogTitle>
              <DialogDescription>
                Boy ve kilo bilgilerinizi girerek size özel beslenme ve antrenman programı alın.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Boy (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Örn: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Kilo (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Örn: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Hedefiniz</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bir hedef seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Kilo Vermek</SelectItem>
                    <SelectItem value="muscle-gain">Kas Kazanmak</SelectItem>
                    <SelectItem value="fitness">Genel Fitness</SelectItem>
                    <SelectItem value="endurance">Dayanıklılık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Günlük Aktivite Ekle</Label>
                <div className="flex space-x-2">
                  <Select value={activityType} onValueChange={(value: 'walking' | 'cycling') => setActivityType(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Aktivite tipi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walking">
                        <div className="flex items-center">
                          <PersonStanding className="mr-2 h-4 w-4" />
                          Yürüyüş
                        </div>
                      </SelectItem>
                      <SelectItem value="cycling">
                        <div className="flex items-center">
                          <Bike className="mr-2 h-4 w-4" />
                          Bisiklet
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Süre (dk)"
                    value={activityDuration}
                    onChange={(e) => setActivityDuration(e.target.value)}
                    className="w-[120px]"
                  />
                  <Button type="button" variant="outline" onClick={addActivity}>Ekle</Button>
                </div>
              </div>
              
              {activities.length > 0 && (
                <div className="space-y-2 mt-2">
                  <Label>Kaydedilen Aktiviteler</Label>
                  <div className="max-h-[150px] overflow-y-auto space-y-2 border rounded-md p-2">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          {activity.type === 'walking' ? (
                            <PersonStanding className="mr-2 h-4 w-4" />
                          ) : (
                            <Bike className="mr-2 h-4 w-4" />
                          )}
                          <span>
                            {activity.type === 'walking' ? 'Yürüyüş' : 'Bisiklet'} 
                            - {activity.duration} dakika
                          </span>
                        </div>
                        <span className="text-muted-foreground">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" onClick={generateRecommendation}>
                Program Önerisi Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Size Özel Program Önerisi</DialogTitle>
              <DialogDescription>
                BMI Değeriniz: {calculateBMI().toFixed(1)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <h3 className="font-semibold text-lg">{recommendation.workoutName}</h3>
                <p className="text-muted-foreground">{recommendation.workoutDescription}</p>
              </div>
              
              <div>
                <h4 className="font-semibold">Beslenme Önerileri</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                  {recommendation.nutritionTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
              <Button variant="outline" onClick={() => setShowRecommendation(false)}>
                Geri Dön
              </Button>
              <Button onClick={acceptRecommendation}>
                <Check className="mr-2 h-4 w-4" />
                Programı Oluştur
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationForm;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, PlayCircle, Edit, Clock, Dumbbell, Calendar, Timer, 
  CheckCircle2, XCircle, ImagePlus, Pencil, Save, Bike, Utensils, 
  Weight, HelpCircle, Flame, PersonStanding, Droplet
} from 'lucide-react';
import { mockWorkouts } from '@/data/mockWorkouts';
import { mockMeals } from '@/data/mockMeals';
import { mockCardioActivities } from '@/data/mockCardioActivities';
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Workout state
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  
  // Workout notes
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  
  // Cardio tracking
  const [cardioType, setCardioType] = useState<'Yürüyüş' | 'Bisiklet' | 'Koşu'>('Bisiklet');
  const [cardioDistance, setCardioDistance] = useState<number>(0);
  const [cardioDuration, setCardioDuration] = useState<number>(0);
  const [cardioCalories, setCardioCalories] = useState<number>(0);
  const [cardioIntensity, setCardioIntensity] = useState<'Düşük' | 'Orta' | 'Yüksek'>('Orta');
  
  // Nutrition tracking
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [currentWeight, setCurrentWeight] = useState<number>(70);
  const [targetWeight, setTargetWeight] = useState<number>(65);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  
  // Additional tracking
  const [showMealPlanner, setShowMealPlanner] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  
  // Timer ref for cleanup
  const intervalRef = useRef<number | null>(null);
  
  // Find the workout from our mock data
  const workout = mockWorkouts.find(w => w.id === id);
  
  // Sample exercises for the workout with tracking and images
  const [exercises, setExercises] = useState([
    { 
      id: '1', 
      name: 'Barbell Squat', 
      sets: 4, 
      reps: '8-10', 
      rest: '90 saniye', 
      completedSets: [false, false, false, false],
      image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Barbell'i omuzlarının üzerine yerleştir. Ayaklar omuz genişliğinde açık olmalı. Dizlerini bükerek kalçanı geriye doğru it. Dizler ayak parmak uçlarını geçmemeli. Sonra başlangıç pozisyonuna geri dön."
    },
    { 
      id: '2', 
      name: 'Dumbbell Bench Press', 
      sets: 3, 
      reps: '10-12', 
      rest: '60 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Sırt üstü bench'e uzan. Dumbbell'ları göğsünün her iki yanına getir. Dirseklerini vücuduna 45° açıyla tut. Ağırlıkları yukarı doğru it ve kontrollü şekilde indir."
    },
    { 
      id: '3', 
      name: 'Pull-ups', 
      sets: 3, 
      reps: '8-10', 
      rest: '90 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Bar'a avuç içleri dışa bakacak şekilde asıl. Omuzlarını stabilize et. Kendini yukarı çek, çeneni bar seviyesine getir. Kontrollü şekilde başlangıç pozisyonuna dön."
    },
    { 
      id: '4', 
      name: 'Shoulder Press', 
      sets: 3, 
      reps: '10-12', 
      rest: '60 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Dumbbell'ları omuz hizasında tut, avuç içleri öne baksın. Ağırlıkları başının üzerine doğru kaldır. Hareketin sonunda dirsekler tam olarak kilitlenmemeli. Kontrollü şekilde başlangıç pozisyonuna dön."
    },
    { 
      id: '5', 
      name: 'Barbell Row', 
      sets: 3, 
      reps: '10-12', 
      rest: '60 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Ayaklar omuz genişliğinde. Dizleri hafif bük, kalçalardan öne doğru eğil. Sırtı düz tut. Barbell'i vücudunun altında tut ve göğsüne doğru çek. Dirseklerini vücuduna yakın tut. Kontrollü şekilde geri indir."
    },
    { 
      id: '6', 
      name: 'Lunges', 
      sets: 3, 
      reps: '12-15', 
      rest: '45 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1434608019344-b4fab2ba2e4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Ayakta dik dur. Bir adım öne at ve ön dizini 90° açıyla bük. Arka dizin yere yakın olacak şekilde indir. Ön bacağınla kendini yukarı it ve başlangıç pozisyonuna dön. Her iki bacak için tekrarla."
    },
    { 
      id: '7', 
      name: 'Plank', 
      sets: 3, 
      reps: '30-60 saniye', 
      rest: '30 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', 
      instructions: "Dirsekler ve ayak parmakları üzerinde pozisyon al. Dirsekler omuz hizasının altında olmalı. Vücudunu düz bir çizgide tut, kalçaların ne yukarı ne aşağı olmalı. Karın kaslarını sıkı tut ve nefes almaya devam et."
    },
    { 
      id: '8', 
      name: 'Leg Raises', 
      sets: 3, 
      reps: '15-20', 
      rest: '30 saniye', 
      completedSets: [false, false, false],
      image: 'https://images.unsplash.com/photo-1541534741688-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      instructions: "Sırt üstü yat, eller vücudun yanında veya kalçanın altında. Bacaklarını düz tutarak, yerden yaklaşık 15 cm yüksekliğe kaldır. Sonra bacaklarını düz tutarak 90 dereceye kadar kaldır. Kontrollü şekilde başlangıç pozisyonuna dön."
    },
  ].slice(0, workout?.exercises || 0));
  
  // Sample workout progress data for chart
  const progressData = [
    { day: 'Pzt', weight: 70, reps: 8 },
    { day: 'Sal', weight: 72, reps: 9 },
    { day: 'Çar', weight: 71, reps: 8 },
    { day: 'Per', weight: 73, reps: 10 },
    { day: 'Cum', weight: 75, reps: 10 },
    { day: 'Cmt', weight: 75, reps: 11 },
    { day: 'Paz', weight: 76, reps: 12 },
  ];

  // Weight progress data for chart
  const weightData = [
    { week: 'Hafta 1', weight: 70 },
    { week: 'Hafta 2', weight: 69.2 },
    { week: 'Hafta 3', weight: 68.5 },
    { week: 'Hafta 4', weight: 67.8 },
    { week: 'Hafta 5', weight: 67.1 },
    { week: 'Hafta 6', weight: 66.5 },
    { week: 'Hafta 7', weight: 66.0 },
    { week: 'Hafta 8', weight: 65.4 },
  ];
  
  // Calorie data for nutrition tracking
  const calorieData = [
    { day: 'Pzt', consumed: 1900, burned: 2200, target: 2000 },
    { day: 'Sal', consumed: 2100, burned: 2300, target: 2000 },
    { day: 'Çar', consumed: 1800, burned: 2100, target: 2000 },
    { day: 'Per', consumed: 1950, burned: 2250, target: 2000 },
    { day: 'Cum', consumed: 2050, burned: 2400, target: 2000 },
    { day: 'Cmt', consumed: 2200, burned: 2500, target: 2000 },
    { day: 'Paz', consumed: 1900, burned: 2200, target: 2000 },
  ];
  
  // Cardio activities history data
  const cardioHistoryData = [
    { day: 'Pzt', yürüyüş: 20, bisiklet: 15, koşu: 10 },
    { day: 'Sal', yürüyüş: 15, bisiklet: 30, koşu: 0 },
    { day: 'Çar', yürüyüş: 25, bisiklet: 0, koşu: 15 },
    { day: 'Per', yürüyüş: 30, bisiklet: 20, koşu: 0 },
    { day: 'Cum', yürüyüş: 10, bisiklet: 40, koşu: 5 },
    { day: 'Cmt', yürüyüş: 40, bisiklet: 20, koşu: 0 },
    { day: 'Paz', yürüyüş: 20, bisiklet: 30, koşu: 20 },
  ];
  
  // Nutrition breakdown data
  const macroData = [
    { name: 'Protein', value: 30 },
    { name: 'Karbonhidrat', value: 45 },
    { name: 'Yağ', value: 25 },
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
  
  // Format time for display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Toggle set completion
  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].completedSets[setIndex] = !newExercises[exerciseIndex].completedSets[setIndex];
    setExercises(newExercises);
  };
  
  // Start/pause timer
  const toggleTimer = () => {
    if (!isActive) {
      // Starting the timer
      setIsActive(true);
      intervalRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      // Pausing the timer
      clearInterval(intervalRef.current!);
      setIsActive(false);
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    setIsActive(false);
    setTimer(0);
  };
  
  // Calculate cardio calories
  const calculateCardioCalories = () => {
    if (cardioDuration > 0) {
      let metValue = 0;
      
      // MET değerleri (Metabolik Eşdeğer) - aktivite türü ve yoğunluğuna göre
      if (cardioType === 'Bisiklet') {
        if (cardioIntensity === 'Düşük') metValue = 6;
        else if (cardioIntensity === 'Orta') metValue = 8;
        else metValue = 10;
      } else if (cardioType === 'Yürüyüş') {
        if (cardioIntensity === 'Düşük') metValue = 3;
        else if (cardioIntensity === 'Orta') metValue = 4;
        else metValue = 5;
      } else if (cardioType === 'Koşu') {
        if (cardioIntensity === 'Düşük') metValue = 7;
        else if (cardioIntensity === 'Orta') metValue = 9;
        else metValue = 12;
      }
      
      const durationHours = cardioDuration / 60;
      // MET bazlı hesaplama (MET * ağırlık(kg) * süre(saat))
      const calories = Math.round(metValue * currentWeight * durationHours);
      setCardioCalories(calories);
      
      // Toplam yakılan kaloriye ekle
      setCaloriesBurned(prev => prev + calories);
      
      toast({
        title: `${cardioType} aktivitesi eklendi!`,
        description: `${cardioDistance} km mesafe, ${calories} kalori yakıldı.`,
      });
      
      // Reset fields
      setCardioDistance(0);
      setCardioDuration(0);
    }
  };
  
  // Calculate weight loss
  const calculateWeightLoss = () => {
    const calorieDeficit = caloriesBurned - caloriesConsumed;
    // 7700 calorie deficit is approximately 1 kg of weight loss
    const weightLoss = calorieDeficit / 7700;
    
    return {
      calorieDeficit,
      weightLoss: weightLoss.toFixed(2)
    };
  };
  
  // Add water
  const addWater = (amount: number) => {
    setWaterIntake(prev => prev + amount);
    toast({
      title: `${amount}ml su eklendi`,
      description: `Günlük su tüketimi: ${waterIntake + amount}ml`,
    });
  };
  
  // Add meal from selection
  const addSelectedMeal = () => {
    if (selectedMeal) {
      const meal = mockMeals.find(m => m.id === selectedMeal);
      if (meal) {
        setCaloriesConsumed(prev => prev + meal.calories);
        toast({
          title: `${meal.name} eklendi`,
          description: `${meal.calories} kalori, ${meal.protein}g protein, ${meal.carbs}g karbonhidrat, ${meal.fat}g yağ`,
        });
        setSelectedMeal(null);
        setShowAddMeal(false);
      }
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Function to start a workout
  const startWorkout = () => {
    // Update the lastPerformed date in the mock data
    const workoutIndex = mockWorkouts.findIndex(w => w.id === id);
    if (workoutIndex !== -1) {
      mockWorkouts[workoutIndex] = {
        ...mockWorkouts[workoutIndex],
        lastPerformed: 'Bugün'
      };
    }
    
    // Show success toast
    toast({
      title: "Antrenman başlatıldı!",
      description: `${workout?.name} antrenmanınız başlatıldı.`,
    });
    
    // Start the timer
    toggleTimer();
    
    // Set the first exercise as current
    setCurrentExercise(0);
  };
  
  // Calculate workout progress
  const calculateProgress = () => {
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
    const completedSets = exercises.reduce((acc, ex) => acc + ex.completedSets.filter(Boolean).length, 0);
    return Math.round((completedSets / totalSets) * 100);
  };
  
  // Save workout notes
  const saveNotes = () => {
    setEditingNotes(false);
    toast({
      title: "Notlar kaydedildi",
      description: "Antrenman notlarınız başarıyla kaydedildi.",
    });
  };
  
  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Antrenman bulunamadı</h2>
        <p className="text-muted-foreground mb-6">İstediğiniz antrenman programı mevcut değil veya kaldırılmış.</p>
        <Button onClick={() => navigate('/workouts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Antrenman Listesine Dön
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Button 
          variant="ghost" 
          className="w-fit p-0 flex items-center text-muted-foreground hover:text-foreground" 
          onClick={() => navigate('/workouts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Antrenmanlara Dön
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">{workout.name}</h1>
          <div className="flex gap-3">
            <Button className="bg-secondary hover:bg-secondary/90">
              <Edit className="mr-2 h-4 w-4" />
              Düzenle
            </Button>
            {!isActive ? (
              <Button onClick={startWorkout} disabled={isActive}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Antrenmana Başla
              </Button>
            ) : (
              <Button variant="destructive" onClick={resetTimer}>
                <XCircle className="mr-2 h-4 w-4" />
                Antrenmanı Bitir
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Workout Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Süre</p>
                <p className="font-medium">{workout.duration} dakika</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Egzersiz Sayısı</p>
                <p className="font-medium">{workout.exercises} egzersiz</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Son Antrenman</p>
                <p className="font-medium">{workout.lastPerformed || 'Henüz yapılmadı'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Flame className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Yakılan Kalori</p>
                <p className="font-medium">{workout.caloriesBurn || '300-450'} kcal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isActive && (
          <Card className="col-span-full border-primary border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                  <Timer className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Antrenman Süresi</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xl">{formatTime(timer)}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={toggleTimer}
                        className="h-8 px-2"
                      >
                        {isActive ? 'Duraklat' : 'Devam Et'}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Antrenman İlerlemesi</h3>
                    <span className="font-bold">{calculateProgress()}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Tabs defaultValue="workout">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="workout">Antrenman</TabsTrigger>
          <TabsTrigger value="nutrition">Beslenme</TabsTrigger>
          <TabsTrigger value="cardio">Kardiyo</TabsTrigger>
          <TabsTrigger value="progress">İlerleme</TabsTrigger>
          <TabsTrigger value="notes">Notlar</TabsTrigger>
        </TabsList>
        
        {/* Workout Tab */}
        <TabsContent value="workout">
          {/* Workout Description */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Antrenman Açıklaması</h3>
              <p>{workout.description}</p>
              
              {workout.equipment && workout.equipment.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Gerekli Ekipmanlar:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workout.equipment.map((eq, i) => (
                      <span key={i} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center mt-4">
                <div className="flex items-center mr-4">
                  <Flame className="h-4 w-4 mr-1 text-orange-500" />
                  <span className="text-sm">{workout.caloriesBurn || '~400'} kcal</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-4 w-4 mr-1 text-primary" />
                  <span className="text-sm">Zorluk: {workout.difficulty || 'Orta'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Exercises List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Egzersizler</h3>
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id} 
                  className={currentExercise === index ? "border-primary border-2" : ""}
                >
                  <CardContent className="py-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white font-medium mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{exercise.name}</h4>
                          </div>
                        </div>
                        <div className="flex items-center mt-3 md:mt-0 gap-6">
                          <div className="text-sm">
                            <span className="text-muted-foreground mr-1">Set:</span>
                            <span className="font-medium">{exercise.sets}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground mr-1">Tekrar:</span>
                            <span className="font-medium">{exercise.reps}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground mr-1">Dinlenme:</span>
                            <span className="font-medium">{exercise.rest}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Exercise Image and Instructions */}
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm" className="mb-2">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Nasıl Yapılır
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-md">
                            <div className="flex justify-center items-center">
                              {exercise.image ? (
                                <img 
                                  src={exercise.image} 
                                  alt={exercise.name} 
                                  className="rounded-md max-h-[300px] object-cover" 
                                />
                              ) : (
                                <div className="h-[200px] w-full bg-muted flex items-center justify-center rounded-md">
                                  <ImagePlus className="h-12 w-12 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Uygulama Talimatları</h5>
                              <p className="text-sm">{exercise.instructions}</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      
                      {isActive && (
                        <div className="mt-2">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[80px]">Set</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead className="text-right">İşlem</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                                <TableRow key={setIndex}>
                                  <TableCell className="font-medium">{setIndex + 1}</TableCell>
                                  <TableCell>
                                    {exercise.completedSets[setIndex] ? (
                                      <span className="flex items-center text-green-600">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Tamamlandı
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground">Bekliyor</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end">
                                      <Checkbox
                                        id={`exercise-${index}-set-${setIndex}`}
                                        className="mr-2"
                                        checked={exercise.completedSets[setIndex]}
                                        onCheckedChange={() => toggleSetCompletion(index, setIndex)}
                                      />
                                      <label 
                                        htmlFor={`exercise-${index}-set-${setIndex}`}
                                        className="text-sm cursor-pointer"
                                      >
                                        {exercise.completedSets[setIndex] ? 'Tamamlandı' : 'Tamamla'}
                                      </label>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => setCurrentExercise(index)}
                          >
                            Bu Egzersizi Başlat
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Nutrition Tab */}
        <TabsContent value="nutrition">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Günlük Beslenme Takibi</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Utensils className="mr-2 h-4 w-4" />
                        Öğün Planla
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Öğün Planla</DialogTitle>
                        <DialogDescription>
                          Günlük beslenme planınızı oluşturabilir ve takip edebilirsiniz.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="mealType">Öğün Türü</Label>
                            <Select defaultValue="Kahvaltı">
                              <SelectTrigger id="mealType">
                                <SelectValue placeholder="Öğün türü seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Kahvaltı">Kahvaltı</SelectItem>
                                <SelectItem value="Öğle Yemeği">Öğle Yemeği</SelectItem>
                                <SelectItem value="Akşam Yemeği">Akşam Yemeği</SelectItem>
                                <SelectItem value="Ara Öğün">Ara Öğün</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="mealTime">Öğün Saati</Label>
                            <Input
                              id="mealTime"
                              type="time"
                              defaultValue="08:00"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mealName">Yemek Adı</Label>
                          <Input
                            id="mealName"
                            placeholder="Örn: Yulaf Ezmesi, Izgara Tavuk Salatası"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="calories">Kalori (kcal)</Label>
                            <Input
                              id="calories"
                              type="number"
                              min={0}
                              placeholder="350"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="protein">Protein (g)</Label>
                            <Input
                              id="protein"
                              type="number"
                              min={0}
                              placeholder="15"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="carbs">Karbonhidrat (g)</Label>
                            <Input
                              id="carbs"
                              type="number"
                              min={0}
                              placeholder="40"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fat">Yağ (g)</Label>
                            <Input
                              id="fat"
                              type="number"
                              min={0}
                              placeholder="8"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Malzemeler</Label>
                          <div className="flex flex-wrap gap-2">
                            {mockMeals[0].ingredients?.map((ingredient, idx) => (
                              <div key={idx} className="flex items-center bg-muted px-2 py-1 rounded-md">
                                <span className="text-sm">{ingredient}</span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                  <XCircle className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Input
                              placeholder="Yeni malzeme ekle"
                              className="w-40"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Button variant="outline" size="sm" className="mr-2">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Yemek API'sinden Ara
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            Gerçek besin verileri için yemek arayın
                          </span>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" className="mr-2">İptal</Button>
                        <Button onClick={() => {
                          toast({
                            title: "Öğün planı oluşturuldu",
                            description: "Yeni öğün beslenme planınıza eklendi."
                          });
                        }}>
                          Ekle
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="caloriesConsumed">Tüketilen Kalori</Label>
                      <Input
                        id="caloriesConsumed"
                        type="number"
                        value={caloriesConsumed}
                        onChange={(e) => setCaloriesConsumed(Number(e.target.value))}
                        className="max-w-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="caloriesBurned">Yakılan Kalori</Label>
                      <Input
                        id="caloriesBurned"
                        type="number"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                        className="max-w-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Kalori Dengesi</h4>
                    <div className="p-4 bg-muted/50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Kalori Açığı</span>
                        <span className="font-medium">{calculateWeightLoss().calorieDeficit} kcal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tahmini Kilo Kaybı</span>
                        <span className="font-medium">{calculateWeightLoss().weightLoss} kg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Su Tüketimi</h4>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => addWater(200)}>
                          +200ml
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addWater(500)}>
                          +500ml
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplet className="h-5 w-5 text-blue-500" />
                      <Progress value={(waterIntake / 2500) * 100} className="h-2.5 flex-1" />
                      <span className="text-sm font-medium">{waterIntake}ml</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Besin Makroları</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowAddMeal(true)}>
                    <Utensils className="mr-2 h-4 w-4" />
                    Öğün Ekle
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Kalori Trendi</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={calorieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="consumed" 
                            name="Tüketilen" 
                            stroke="#8884d8" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="burned" 
                            name="Yakılan" 
                            stroke="#82ca9d" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            name="Hedef" 
                            stroke="#ff8042" 
                            strokeDasharray="5 5" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Add Meal Dialog */}
          <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Öğün Ekle</DialogTitle>
                <DialogDescription>
                  Bugün tükettiğiniz bir öğünü seçin veya yeni bir öğün oluşturun.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="meal">Hazır Öğünler</Label>
                  <Select
                    value={selectedMeal || ""}
                    onValueChange={setSelectedMeal}
                  >
                    <SelectTrigger id="meal">
                      <SelectValue placeholder="Bir öğün seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMeals.map(meal => (
                        <SelectItem key={meal.id} value={meal.id}>
                          {meal.name} ({meal.calories} kcal)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMeal(false)}>
                  İptal
                </Button>
                <Button onClick={addSelectedMeal} disabled={!selectedMeal}>
                  Ekle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Cardio Tab */}
        <TabsContent value="cardio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Kardiyo Aktivitesi Ekle</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardioType">Aktivite Türü</Label>
                      <Select
                        value={cardioType}
                        onValueChange={(value: 'Yürüyüş' | 'Bisiklet' | 'Koşu') => setCardioType(value)}
                      >
                        <SelectTrigger id="cardioType">
                          <SelectValue placeholder="Aktivite seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yürüyüş">Yürüyüş</SelectItem>
                          <SelectItem value="Bisiklet">Bisiklet</SelectItem>
                          <SelectItem value="Koşu">Koşu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="intensity">Yoğunluk</Label>
                      <Select
                        value={cardioIntensity}
                        onValueChange={(value: 'Düşük' | 'Orta' | 'Yüksek') => setCardioIntensity(value)}
                      >
                        <SelectTrigger id="intensity">
                          <SelectValue placeholder="Yoğunluk seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Düşük">Düşük</SelectItem>
                          <SelectItem value="Orta">Orta</SelectItem>
                          <SelectItem value="Yüksek">Yüksek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="distance">Mesafe (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        min={0}
                        value={cardioDistance.toString()}
                        onChange={(e) => setCardioDistance(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Süre (dakika)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min={0}
                        value={cardioDuration.toString()}
                        onChange={(e) => setCardioDuration(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateCardioCalories} className="w-full">
                    <Bike className="mr-2 h-4 w-4" />
                    Aktiviteyi Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Son Kardiyo Aktiviteleri</h3>
                <div className="space-y-4">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cardioHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis label={{ value: 'Dakika', angle: -90, position: 'insideLeft' }} />
                        <Legend />
                        <Bar dataKey="yürüyüş" name="Yürüyüş" fill="#8884d8" />
                        <Bar dataKey="bisiklet" name="Bisiklet" fill="#82ca9d" />
                        <Bar dataKey="koşu" name="Koşu" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Son Aktiviteler</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tarih</TableHead>
                          <TableHead>Tür</TableHead>
                          <TableHead>Süre</TableHead>
                          <TableHead>Mesafe</TableHead>
                          <TableHead className="text-right">Kalori</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockCardioActivities.slice(0, 5).map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="font-medium">{activity.date}</TableCell>
                            <TableCell>{activity.type}</TableCell>
                            <TableCell>{activity.duration} dk</TableCell>
                            <TableCell>{activity.distance} km</TableCell>
                            <TableCell className="text-right">{activity.caloriesBurned} kcal</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Kilo İlerlemesi</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        name="Kilo (kg)" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Antrenman İlerlemesi</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="weight" 
                        name="Ağırlık (kg)" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="reps" 
                        name="Tekrar Sayısı" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Kilo Hedefi</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Mevcut Kilo</p>
                      <div className="flex items-center">
                        <Weight className="h-5 w-5 mr-2 text-primary" />
                        <Input
                          type="number"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(Number(e.target.value))}
                          className="max-w-[100px]"
                        />
                        <span className="text-sm ml-2">kg</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hedef Kilo</p>
                      <div className="flex items-center">
                        <PersonStanding className="h-5 w-5 mr-2 text-primary" />
                        <Input
                          type="number"
                          value={targetWeight}
                          onChange={(e) => setTargetWeight(Number(e.target.value))}
                          className="max-w-[100px]"
                        />
                        <span className="text-sm ml-2">kg</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">İlerleme</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {Math.abs(currentWeight - targetWeight).toFixed(1)} kg {currentWeight > targetWeight ? 'verilecek' : 'alınacak'}
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round((Math.abs(70 - currentWeight) / Math.abs(70 - targetWeight)) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.round((Math.abs(70 - currentWeight) / Math.abs(70 - targetWeight)) * 100)} 
                          className="h-2.5" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Tahminler</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Günlük Kalori İhtiyacı:</span>
                        <span className="font-medium">2000 kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tavsiye Edilen Protein:</span>
                        <span className="font-medium">{Math.round(currentWeight * 1.6)} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tavsiye Edilen Su:</span>
                        <span className="font-medium">{Math.round(currentWeight * 35)} ml</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Haftalık Kilo Hedefi:</span>
                        <span className="font-medium">0.5 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tahmini Süre:</span>
                        <span className="font-medium">
                          {Math.ceil(Math.abs(currentWeight - targetWeight) / 0.5)} hafta
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Antrenman Notları</h3>
                {editingNotes ? (
                  <Button variant="outline" size="sm" onClick={saveNotes}>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setEditingNotes(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                )}
              </div>
              
              {editingNotes ? (
                <Textarea
                  value={workoutNotes}
                  onChange={(e) => setWorkoutNotes(e.target.value)}
                  placeholder="Antrenman hakkında notlarınızı buraya yazabilirsiniz..."
                  className="min-h-[200px]"
                />
              ) : (
                <div className="min-h-[200px] p-4 bg-muted/50 rounded-md">
                  {workoutNotes ? (
                    <p>{workoutNotes}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      Henüz not eklenmemiş. Antrenman hakkında aklınızda kalanları not almanız ilerlemenizi takip etmenize yardımcı olabilir.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutDetail;

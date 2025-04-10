
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, PlayCircle, Edit, Clock, Dumbbell, Calendar, Timer, 
  CheckCircle2, XCircle, ImagePlus, Pencil, Save, Bike, Utensils, 
  Weight, HelpCircle, Flame
} from 'lucide-react';
import { mockWorkouts } from '@/data/mockWorkouts';
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Workout state
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  
  // Workout notes
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  
  // Cycling tracking
  const [cyclingDistance, setCyclingDistance] = useState<number>(0);
  const [cyclingDuration, setCyclingDuration] = useState<number>(0);
  const [cyclingCalories, setCyclingCalories] = useState<number>(0);
  
  // Nutrition tracking
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [currentWeight, setCurrentWeight] = useState<number>(70);
  const [targetWeight, setTargetWeight] = useState<number>(65);
  
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
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
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
  
  // Calculate cycling calories
  const calculateCyclingCalories = () => {
    // More accurate formula: MET * weight * duration (hours)
    // MET value for moderate cycling is around 8
    if (cyclingDuration > 0) {
      const durationHours = cyclingDuration / 60;
      // Using MET-based calculation (MET * weight in kg * duration in hours)
      const calories = Math.round(8 * currentWeight * durationHours);
      setCyclingCalories(calories);
      
      // Add to total burned calories
      setCaloriesBurned(prev => prev + calories);
      
      toast({
        title: "Bisiklet kaydı eklendi!",
        description: `${cyclingDistance} km mesafe, ${calories} kalori yakıldı.`,
      });
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
        
        {isActive && (
          <Card className={isActive ? "border-primary border-2" : ""}>
            <CardContent className="pt-6">
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
            </CardContent>
          </Card>
        )}
      </div>
      
      {isActive && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Antrenman İlerlemesi</h3>
              <span className="font-bold">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Progress Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exercise Progress Chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Egzersiz İlerleme Grafiği</h3>
            <div className="h-[300px]">
              <ChartContainer
                id="workout-progress"
                config={{
                  weight: { label: "Ağırlık (kg)", theme: { light: "#2563eb", dark: "#3b82f6" } },
                  reps: { label: "Tekrar", theme: { light: "#16a34a", dark: "#22c55e" } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
                    <YAxis yAxisId="right" orientation="right" stroke="#16a34a" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="weight"
                      name="Ağırlık"
                      stroke="var(--color-weight)"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="reps"
                      name="Tekrar"
                      stroke="var(--color-reps)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Weight Loss Chart */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Kilo Takip Grafiği</h3>
            <div className="h-[300px]">
              <ChartContainer
                id="weight-progress"
                config={{
                  weight: { label: "Kilo (kg)", theme: { light: "#9333ea", dark: "#a855f7" } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      name="Kilo"
                      stroke="var(--color-weight)"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Workout Notes */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Antrenman Notları</h3>
            {!editingNotes ? (
              <Button variant="outline" size="sm" onClick={() => setEditingNotes(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Düzenle
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={saveNotes}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            )}
          </div>
          
          {!editingNotes ? (
            <div className="bg-muted rounded-md p-4 min-h-[100px]">
              {workoutNotes ? 
                <p className="whitespace-pre-line">{workoutNotes}</p> : 
                <p className="text-muted-foreground">Antrenman için notlarınızı buraya ekleyin.</p>
              }
            </div>
          ) : (
            <Textarea 
              value={workoutNotes} 
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="Antrenman notlarınızı buraya yazın..."
              className="min-h-[100px]"
            />
          )}
        </CardContent>
      </Card>
      
      {/* Cycling and Calorie Tracking */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Bisiklet & Kalori Takibi</h3>
          
          {/* Cycling Tracking */}
          <div className="mb-6 border rounded-md p-4">
            <h4 className="text-md font-medium mb-4 flex items-center">
              <Bike className="mr-2 h-5 w-5 text-primary" />
              Bisiklet Aktivitesi Ekle
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted-foreground">Mesafe (km)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={cyclingDistance}
                  onChange={(e) => setCyclingDistance(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Süre (dakika)</label>
                <Input
                  type="number"
                  min="0"
                  value={cyclingDuration}
                  onChange={(e) => setCyclingDuration(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Tahmini Yakılan Kalori</label>
                <div className="flex items-center bg-muted rounded-md px-3 py-2 text-primary font-medium">
                  <Flame className="mr-2 h-4 w-4" /> {cyclingCalories} kcal
                </div>
              </div>
            </div>
            
            <Button onClick={calculateCyclingCalories}>Bisiklet Aktivitesini Kaydet</Button>
          </div>
          
          {/* Nutrition Tracking */}
          <div className="mb-6 border rounded-md p-4">
            <h4 className="text-md font-medium mb-4 flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-primary" />
              Günlük Kalori Takibi
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted-foreground">Alınan Kalori</label>
                <Input
                  type="number"
                  min="0"
                  value={caloriesConsumed}
                  onChange={(e) => setCaloriesConsumed(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Yakılan Kalori</label>
                <Input
                  type="number"
                  min="0"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted-foreground">Mevcut Kilo (kg)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Hedef Kilo (kg)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <h5 className="font-medium mb-2">Kalori ve Kilo Analizi</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Kalori Farkı</p>
                  <p className="font-medium">{calculateWeightLoss().calorieDeficit} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tahmini Kilo Kaybı</p>
                  <p className="font-medium">{calculateWeightLoss().weightLoss} kg</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" className="mr-2">Geçmişi Görüntüle</Button>
            <Button>Günlük Verileri Kaydet</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Workout Description */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Antrenman Açıklaması</h3>
          <p>{workout.description}</p>
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
    </div>
  );
};

export default WorkoutDetail;


import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, Save, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExerciseCard from '@/components/ExerciseCard';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import RecommendationForm from '@/components/RecommendationForm';

// Updated exercise data with reliable images
const exerciseLibrary = [
  {
    id: 'e1',
    name: 'Squat',
    muscleGroup: 'Bacak',
    difficulty: 'Orta' as const,
    equipment: 'Barbell, ağırlık',
    imageUrl: '/lovable-uploads/6901e6cc-56b0-4df1-8efa-94f6c027b836.png'
  },
  {
    id: 'e2',
    name: 'Bench Press',
    muscleGroup: 'Göğüs, Omuz, Triceps',
    difficulty: 'Orta' as const,
    equipment: 'Barbell, ağırlık, bench',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'e3',
    name: 'Plank',
    muscleGroup: 'Core',
    difficulty: 'Kolay' as const,
    equipment: 'Yoga matı',
    imageUrl: '/lovable-uploads/5ba4c1ba-b4c4-46a7-9a90-24f79852cf8b.png'
  },
  {
    id: 'e4',
    name: 'Deadlift',
    muscleGroup: 'Sırt, Bacak, Core',
    difficulty: 'Zor' as const,
    equipment: 'Barbell, ağırlık',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'e5',
    name: 'Incline Bench Press',
    muscleGroup: 'Üst Göğüs, Omuz',
    difficulty: 'Orta' as const,
    equipment: 'Bench, barbell, ağırlık',
    imageUrl: '/lovable-uploads/e8809cb8-10e4-4881-9b2e-bdcad6c68a5e.png'
  },
  {
    id: 'e6',
    name: 'Resistance Band Pull',
    muscleGroup: 'Sırt, Biceps',
    difficulty: 'Kolay' as const,
    equipment: 'Direnç bandı',
    imageUrl: '/lovable-uploads/6a3de0d1-7b3c-4dcc-a456-079e2ca0eb1d.png'
  },
  {
    id: 'e7',
    name: 'Cable Tricep Extension',
    muscleGroup: 'Triceps',
    difficulty: 'Orta' as const,
    equipment: 'Kablo makinesi',
    imageUrl: '/lovable-uploads/c9252f5f-a1f8-4727-8647-e0625b6a6168.png'
  },
  {
    id: 'e8',
    name: 'Barbell Bicep Curl',
    muscleGroup: 'Biceps',
    difficulty: 'Orta' as const,
    equipment: 'Barbell, ağırlık',
    imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'e9',
    name: 'Leg Press',
    muscleGroup: 'Bacak',
    difficulty: 'Orta' as const,
    equipment: 'Ağırlık',
    imageUrl: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'e10',
    name: 'Resistance Band Shoulder Press',
    muscleGroup: 'Omuz',
    difficulty: 'Orta' as const,
    equipment: 'Direnç bandı',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const filteredExercises = exerciseLibrary.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };
  
  const handleSaveWorkout = () => {
    if (!workoutName) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen antrenman programına bir isim verin.",
      });
      return;
    }
    
    if (selectedExercises.length === 0) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen en az bir egzersiz ekleyin.",
      });
      return;
    }
    
    // In a real app, we would save the workout to a database
    toast({
      title: "Başarılı",
      description: "Antrenman programı başarıyla kaydedildi.",
    });
    
    navigate('/workouts');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Yeni Antrenman Programı</h1>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            onClick={() => setShowRecommendationForm(true)}
            className="flex-1 md:flex-none"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            Öneri Al
          </Button>
          <Button 
            onClick={handleSaveWorkout} 
            className="flex-1 md:flex-none"
          >
            <Save className="mr-2 h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-2 max-w-md'}`}>
          <TabsTrigger value="details">Program Detayları</TabsTrigger>
          <TabsTrigger value="exercises">Egzersiz Seçimi ({selectedExercises.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="workout-name">Program Adı</Label>
              <Input
                id="workout-name"
                placeholder="Örnek: Tam Vücut Antrenmanı, Üst Vücut Güçlendirme..."
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workout-description">Açıklama</Label>
              <Textarea
                id="workout-description"
                placeholder="Programınız hakkında kısa bir açıklama..."
                rows={3}
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workout-type">Antrenman Tipi</Label>
              <Select value={workoutType} onValueChange={setWorkoutType}>
                <SelectTrigger>
                  <SelectValue placeholder="Antrenman tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Güç</SelectItem>
                  <SelectItem value="cardio">Kardiyo</SelectItem>
                  <SelectItem value="hybrid">Kardiyo + Güç</SelectItem>
                  <SelectItem value="flexibility">Esneklik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => setActiveTab('exercises')}>
              Egzersiz Seçimine Geç
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="exercises" className="space-y-6 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Egzersiz ara..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isInWorkout={selectedExercises.includes(exercise.id)}
                onToggle={() => toggleExercise(exercise.id)}
              />
            ))}
          </div>
          
          <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 bg-background p-4 border-t shadow-md' : 'sticky bottom-0 bg-background pt-4 pb-2 border-t'}`}>
            <div className="flex items-center justify-between max-w-screen-lg mx-auto">
              <div>
                <p className="font-medium">{selectedExercises.length} egzersiz seçildi</p>
                {selectedExercises.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Tahmini süre: {selectedExercises.length * 5} dakika
                  </p>
                )}
              </div>
              <Button onClick={handleSaveWorkout}>
                <Save className="mr-2 h-4 w-4" />
                Programı Kaydet
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <RecommendationForm 
        isOpen={showRecommendationForm} 
        onClose={() => setShowRecommendationForm(false)} 
      />
    </div>
  );
};

export default CreateWorkout;

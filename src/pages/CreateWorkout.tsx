
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExerciseCard from '@/components/ExerciseCard';
import { useToast } from "@/hooks/use-toast";

// Mock exercise data
const exerciseLibrary = [
  {
    id: 'e1',
    name: 'Squat',
    muscleGroup: 'Bacak',
    difficulty: 'Orta' as const,
    equipment: 'Vücut ağırlığı veya ağırlık',
    imageUrl: 'https://images.unsplash.com/photo-1584380931214-dbb5b72e7fd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 'e2',
    name: 'Push Up',
    muscleGroup: 'Göğüs, Omuz, Triceps',
    difficulty: 'Orta' as const,
    equipment: 'Vücut ağırlığı',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-b106fbafbcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 'e3',
    name: 'Plank',
    muscleGroup: 'Core',
    difficulty: 'Kolay' as const,
    equipment: 'Vücut ağırlığı',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 'e4',
    name: 'Deadlift',
    muscleGroup: 'Sırt, Bacak, Core',
    difficulty: 'Zor' as const,
    equipment: 'Ağırlık',
    imageUrl: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 'e5',
    name: 'Pull Up',
    muscleGroup: 'Sırt, Biceps',
    difficulty: 'Zor' as const,
    equipment: 'Bar',
    imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 'e6',
    name: 'Lunges',
    muscleGroup: 'Bacak',
    difficulty: 'Kolay' as const,
    equipment: 'Vücut ağırlığı veya dambıl',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80'
  },
];

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        <Button onClick={handleSaveWorkout}>
          <Save className="mr-2 h-4 w-4" />
          Kaydet
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
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
          
          <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t">
            <div className="flex items-center justify-between">
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
    </div>
  );
};

export default CreateWorkout;

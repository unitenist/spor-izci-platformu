
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, Edit, Clock, Dumbbell, Calendar } from 'lucide-react';
import { mockWorkouts } from '@/data/mockWorkouts';
import { toast } from "@/hooks/use-toast";

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the workout from our mock data
  const workout = mockWorkouts.find(w => w.id === id);
  
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
      description: `${workout.name} antrenmanınız başlatıldı.`,
    });
    
    // In a real app, you would navigate to a workout session page
    // For now, we'll just show the toast
  };
  
  // Sample exercises for the workout
  const exercises = [
    { id: '1', name: 'Barbell Squat', sets: 4, reps: '8-10', rest: '90 saniye' },
    { id: '2', name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '60 saniye' },
    { id: '3', name: 'Pull-ups', sets: 3, reps: '8-10', rest: '90 saniye' },
    { id: '4', name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60 saniye' },
    { id: '5', name: 'Barbell Row', sets: 3, reps: '10-12', rest: '60 saniye' },
    { id: '6', name: 'Lunges', sets: 3, reps: '12-15', rest: '45 saniye' },
    { id: '7', name: 'Plank', sets: 3, reps: '30-60 saniye', rest: '30 saniye' },
    { id: '8', name: 'Leg Raises', sets: 3, reps: '15-20', rest: '30 saniye' },
  ].slice(0, workout.exercises);
  
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
            <Button onClick={startWorkout}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Antrenmana Başla
            </Button>
          </div>
        </div>
      </div>
      
      {/* Workout Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
      
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
            <Card key={exercise.id}>
              <CardContent className="py-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;

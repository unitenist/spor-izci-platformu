
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, Edit, Clock, Dumbbell, Calendar, Timer, CheckCircle2, XCircle } from 'lucide-react';
import { mockWorkouts } from '@/data/mockWorkouts';
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Workout state
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  
  // Timer ref for cleanup
  const intervalRef = useRef<number | null>(null);
  
  // Find the workout from our mock data
  const workout = mockWorkouts.find(w => w.id === id);
  
  // Sample exercises for the workout with tracking
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Barbell Squat', sets: 4, reps: '8-10', rest: '90 saniye', completedSets: [false, false, false, false] },
    { id: '2', name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '60 saniye', completedSets: [false, false, false] },
    { id: '3', name: 'Pull-ups', sets: 3, reps: '8-10', rest: '90 saniye', completedSets: [false, false, false] },
    { id: '4', name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60 saniye', completedSets: [false, false, false] },
    { id: '5', name: 'Barbell Row', sets: 3, reps: '10-12', rest: '60 saniye', completedSets: [false, false, false] },
    { id: '6', name: 'Lunges', sets: 3, reps: '12-15', rest: '45 saniye', completedSets: [false, false, false] },
    { id: '7', name: 'Plank', sets: 3, reps: '30-60 saniye', rest: '30 saniye', completedSets: [false, false, false] },
    { id: '8', name: 'Leg Raises', sets: 3, reps: '15-20', rest: '30 saniye', completedSets: [false, false, false] },
  ].slice(0, workout?.exercises || 0));
  
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


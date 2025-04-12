
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '@/components/WorkoutCard';
import { Card } from "@/components/ui/card";
import { mockWorkouts } from '@/data/mockWorkouts';

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const filteredWorkouts = mockWorkouts.filter(workout => 
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter workouts by type for each tab
  const strengthWorkouts = filteredWorkouts.filter(workout => 
    workout.type.toLowerCase().includes('güç')
  );
  
  const cardioWorkouts = filteredWorkouts.filter(workout => 
    workout.type.toLowerCase().includes('kardiyo')
  );
  
  const flexibilityWorkouts = filteredWorkouts.filter(workout => 
    workout.type.toLowerCase().includes('esneklik')
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Antrenman Programları</h1>
        <Button onClick={() => navigate('/create-workout')}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Program Oluştur
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Antrenman programı ara..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtrele
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="strength">Güç</TabsTrigger>
          <TabsTrigger value="cardio">Kardiyo</TabsTrigger>
          <TabsTrigger value="flexibility">Esneklik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium text-muted-foreground">
                  Sonuç bulunamadı
                </p>
                <p className="mt-2 text-muted-foreground">
                  Başka bir arama terimi deneyebilir veya yeni bir antrenman programı oluşturabilirsiniz.
                </p>
                <Button className="mt-4" onClick={() => navigate('/create-workout')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Program Oluştur
                </Button>
              </div>
            )}
            
            <Card className="h-full border border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate('/create-workout')}>
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground font-medium">Yeni Antrenman Programı Oluştur</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="strength" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strengthWorkouts.length > 0 ? (
              strengthWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium text-muted-foreground">
                  Güç antrenmanı bulunamadı
                </p>
                <Button className="mt-4" onClick={() => navigate('/create-workout')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Güç Antrenmanı Oluştur
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cardio" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardioWorkouts.length > 0 ? (
              cardioWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium text-muted-foreground">
                  Kardiyo antrenmanı bulunamadı
                </p>
                <Button className="mt-4" onClick={() => navigate('/create-workout')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Kardiyo Antrenmanı Oluştur
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="flexibility" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flexibilityWorkouts.length > 0 ? (
              flexibilityWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-medium text-muted-foreground">
                  Esneklik antrenmanı bulunamadı
                </p>
                <Button className="mt-4" onClick={() => navigate('/create-workout')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Esneklik Antrenmanı Oluştur
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workouts;

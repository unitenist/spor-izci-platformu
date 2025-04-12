
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Calendar, TrendingUp, Award, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '@/components/WorkoutCard';
import { WorkoutType } from '@/types/WorkoutTypes';

// Mock data
const mockWorkouts: WorkoutType[] = [
  {
    id: '1',
    name: 'Tam Vücut Antrenmanı',
    description: 'Tüm vücut kaslarını çalıştıran egzersizler',
    type: 'Kardiyo + Güç',
    duration: 60,
    exercises: 8,
    lastPerformed: '3 gün önce'
  },
  {
    id: '2',
    name: 'Üst Vücut Güçlendirme',
    description: 'Üst vücut kaslarını hedefleyen program',
    type: 'Güç',
    duration: 45,
    exercises: 6
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Merhaba, {user?.name}!</h1>
          <p className="text-muted-foreground mt-1">Spor yolculuğunuzda son durumunuz</p>
        </div>
        <Button onClick={() => navigate('/create-workout')}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Program Oluştur
        </Button>
      </div>
      
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bu Hafta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-primary" />
              <div>
                <div className="text-2xl font-bold">3 Antreman</div>
                <p className="text-xs text-muted-foreground">Toplam 2.5 saat</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bu Ayki İlerleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-green-500" />
              <div>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">Hedefe doğru</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan Antrenmanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Dumbbell className="h-6 w-6 mr-3 text-secondary" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Toplam</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Seviye</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-3 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">Orta</div>
                <p className="text-xs text-muted-foreground">Bir sonraki: İleri</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Haftalık Hedef</CardTitle>
          <CardDescription>Bu haftaki fitness hedefiniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">4 antrenman (3/4)</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Hedefinize ulaşmak için 1 antrenman daha yapmanız gerekiyor.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Workouts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Son Antrenmanlarınız</h2>
          <Button variant="outline" onClick={() => navigate('/workouts')}>
            Tümünü Gör
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
          
          <Card className="h-full border border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => navigate('/create-workout')}>
            <Plus className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground font-medium">Yeni Antrenman Programı Oluştur</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

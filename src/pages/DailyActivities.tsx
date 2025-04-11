
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bike, 
  Walking, 
  Calendar as CalendarIcon, 
  BarChart, 
  Trash2, 
  Plus 
} from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { 
  BarChart as ReChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type Activity = {
  id: string;
  type: 'walking' | 'cycling';
  distance?: number;
  duration: number;
  calories?: number;
  date: Date;
}

const DailyActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'walking',
      distance: 2.5,
      duration: 30,
      calories: 150,
      date: new Date(2025, 3, 8)
    },
    {
      id: '2',
      type: 'cycling',
      distance: 8,
      duration: 40,
      calories: 280,
      date: new Date(2025, 3, 9)
    },
    {
      id: '3',
      type: 'walking',
      distance: 3.2,
      duration: 45,
      calories: 190,
      date: new Date(2025, 3, 10)
    }
  ]);
  
  const [date, setDate] = useState<Date>(new Date());
  const [activityType, setActivityType] = useState<'walking' | 'cycling'>('walking');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('list');
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleAddActivity = () => {
    if (!duration) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen aktivite süresini girin.",
      });
      return;
    }
    
    // Calculate approximate calories
    const durationNum = parseInt(duration);
    let calories = 0;
    let distanceNum = distance ? parseFloat(distance) : 0;
    
    if (activityType === 'walking') {
      calories = durationNum * 5; // Rough estimate
      if (!distanceNum) distanceNum = durationNum * 0.08; // ~5km/h pace
    } else {
      calories = durationNum * 7; // Rough estimate
      if (!distanceNum) distanceNum = durationNum * 0.25; // ~15km/h pace
    }
    
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: activityType,
      duration: durationNum,
      distance: distanceNum,
      calories: calories,
      date: date
    };
    
    setActivities([...activities, newActivity]);
    
    toast({
      title: "Aktivite eklendi",
      description: `${activityType === 'walking' ? 'Yürüyüş' : 'Bisiklet'} aktivitesi başarıyla kaydedildi.`,
    });
    
    setDrawerOpen(false);
    setDuration('');
    setDistance('');
  };
  
  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
    
    toast({
      title: "Aktivite silindi",
      description: "Aktivite başarıyla silindi.",
    });
  };
  
  // Group activities by date for chart
  const chartData = activities.reduce((acc: any[], activity) => {
    const date = format(activity.date, 'dd MMM');
    const existingEntry = acc.find(item => item.date === date);
    
    if (existingEntry) {
      if (activity.type === 'walking') {
        existingEntry.walking = (existingEntry.walking || 0) + activity.duration;
      } else {
        existingEntry.cycling = (existingEntry.cycling || 0) + activity.duration;
      }
      existingEntry.total = (existingEntry.total || 0) + activity.duration;
    } else {
      const newEntry: any = { date };
      newEntry[activity.type] = activity.duration;
      newEntry.total = activity.duration;
      acc.push(newEntry);
    }
    
    return acc;
  }, []);
  
  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Günlük Aktiviteler</h1>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Aktivite Ekle
            </Button>
          </DrawerTrigger>
          <DrawerContent className={isMobile ? 'max-h-[80vh]' : ''}>
            <div className="max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle>Yeni Aktivite</DrawerTitle>
                <DrawerDescription>
                  Yürüyüş veya bisiklet aktivitelerinizi kaydedin.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-type">Aktivite Tipi</Label>
                  <Select value={activityType} onValueChange={(value: 'walking' | 'cycling') => setActivityType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Aktivite tipini seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walking">
                        <div className="flex items-center">
                          <Walking className="mr-2 h-4 w-4" />
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Süre (dakika)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Örn: 30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="distance">Mesafe (km, opsiyonel)</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    placeholder="Örn: 2.5"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tarih</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="border rounded-md p-2"
                    disabled={(date) => date > new Date()}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button onClick={handleAddActivity}>Aktiviteyi Kaydet</Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="list" className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Aktivite Listesi
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            İstatistikler
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedActivities.length > 0 ? (
              sortedActivities.map(activity => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {activity.type === 'walking' ? (
                          <Walking className="mr-2 h-5 w-5 text-primary" />
                        ) : (
                          <Bike className="mr-2 h-5 w-5 text-primary" />
                        )}
                        <CardTitle>
                          {activity.type === 'walking' ? 'Yürüyüş' : 'Bisiklet'}
                        </CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteActivity(activity.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <CardDescription>
                      {format(activity.date, 'dd MMMM yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Süre</p>
                        <p className="font-medium">{activity.duration} dk</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Mesafe</p>
                        <p className="font-medium">{activity.distance} km</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Kalori</p>
                        <p className="font-medium">{activity.calories}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">Henüz kaydedilmiş aktivite bulunmuyor.</p>
                <Button onClick={() => setDrawerOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  İlk Aktiviteni Ekle
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivite İstatistikleri</CardTitle>
              <CardDescription>Son 7 günün aktivite dağılımı</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Dakika', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="walking" name="Yürüyüş" fill="#8884d8" />
                    <Bar dataKey="cycling" name="Bisiklet" fill="#82ca9d" />
                  </ReChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Toplam Aktivite</p>
                  <p className="text-2xl font-bold">
                    {activities.length}
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Toplam Süre</p>
                  <p className="text-2xl font-bold">
                    {activities.reduce((total, activity) => total + activity.duration, 0)} dk
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Toplam Mesafe</p>
                  <p className="text-2xl font-bold">
                    {activities.reduce((total, activity) => total + (activity.distance || 0), 0).toFixed(1)} km
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Yakılan Kalori</p>
                  <p className="text-2xl font-bold">
                    {activities.reduce((total, activity) => total + (activity.calories || 0), 0)}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DailyActivities;

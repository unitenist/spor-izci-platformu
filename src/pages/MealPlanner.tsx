
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, Edit2, Save, Calendar, Utensils, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FoodItem, foodDatabase } from '@/services/nutritionAPI';
import FoodSearchDialog from '@/components/FoodSearchDialog';

interface MealPlanItem {
  id: string;
  day: string;
  type: 'Kahvaltı' | 'Öğle Yemeği' | 'Akşam Yemeği' | 'Ara Öğün';
  time: string;
  foods: FoodItem[];
}

// Örnek haftalık beslenme planı
const initialMealPlan: MealPlanItem[] = [
  {
    id: '1',
    day: 'Pazartesi',
    type: 'Kahvaltı',
    time: '08:00',
    foods: [foodDatabase[0], foodDatabase[1], foodDatabase[3]]
  },
  {
    id: '2',
    day: 'Pazartesi',
    type: 'Öğle Yemeği',
    time: '13:00',
    foods: [foodDatabase[6], foodDatabase[24]]
  },
  {
    id: '3',
    day: 'Pazartesi',
    type: 'Akşam Yemeği',
    time: '19:00',
    foods: [foodDatabase[7], foodDatabase[25]]
  },
  {
    id: '4',
    day: 'Salı',
    type: 'Kahvaltı',
    time: '08:00',
    foods: [foodDatabase[2], foodDatabase[4], foodDatabase[12]]
  }
];

// Haftanın günleri
const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

// Öğün türleri
const mealTypes = ['Kahvaltı', 'Öğle Yemeği', 'Akşam Yemeği', 'Ara Öğün'];

const MealPlanner = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>(initialMealPlan);
  const [selectedDay, setSelectedDay] = useState('Pazartesi');
  const [selectedMeal, setSelectedMeal] = useState<MealPlanItem | null>(null);
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [newMealTime, setNewMealTime] = useState('08:00');
  const [newMealType, setNewMealType] = useState<'Kahvaltı' | 'Öğle Yemeği' | 'Akşam Yemeği' | 'Ara Öğün'>('Kahvaltı');
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  
  // Gün bazlı öğünleri filtreleme
  const getMealsByDay = (day: string) => {
    return mealPlan.filter(meal => meal.day === day);
  };
  
  // Yeni öğün ekle
  const handleAddMeal = () => {
    if (selectedFoods.length === 0) {
      toast({
        title: "Uyarı",
        description: "En az bir yemek eklemelisiniz.",
        variant: "destructive"
      });
      return;
    }
    
    const newMeal: MealPlanItem = {
      id: Date.now().toString(),
      day: selectedDay,
      type: newMealType,
      time: newMealTime,
      foods: selectedFoods
    };
    
    setMealPlan([...mealPlan, newMeal]);
    setSelectedFoods([]);
    setShowAddMealDialog(false);
    
    toast({
      title: "Öğün eklendi",
      description: `${selectedDay} günü için ${newMealType} eklendi.`
    });
  };
  
  // Öğün sil
  const handleDeleteMeal = (mealId: string) => {
    setMealPlan(mealPlan.filter(meal => meal.id !== mealId));
    
    toast({
      title: "Öğün silindi",
      description: "Öğün beslenme planınızdan kaldırıldı."
    });
  };
  
  // Yemek seç
  const handleSelectFood = (food: FoodItem) => {
    setSelectedFoods([...selectedFoods, food]);
  };
  
  // Yemek kaldır
  const handleRemoveFood = (index: number) => {
    const newFoods = [...selectedFoods];
    newFoods.splice(index, 1);
    setSelectedFoods(newFoods);
  };
  
  // Öğünün toplam kalorileri
  const calculateMealTotalCalories = (foods: FoodItem[]) => {
    return foods.reduce((total, food) => total + food.calories, 0);
  };
  
  // Günün toplam kalorileri
  const calculateDayTotalCalories = (day: string) => {
    const dayMeals = getMealsByDay(day);
    let total = 0;
    
    dayMeals.forEach(meal => {
      total += calculateMealTotalCalories(meal.foods);
    });
    
    return total;
  };
  
  // Modal kapanınca değerleri sıfırla
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setSelectedFoods([]);
      setNewMealTime('08:00');
      setNewMealType('Kahvaltı');
    }
    setShowAddMealDialog(open);
  };
  
  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold">Haftalık Beslenme Planı</h1>
          <Dialog open={showAddMealDialog} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Öğün Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Öğün Ekle</DialogTitle>
                <DialogDescription>
                  Haftalık beslenme planınıza yeni bir öğün ekleyin.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Gün</Label>
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Gün seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mealType">Öğün Türü</Label>
                    <Select value={newMealType} onValueChange={(value: 'Kahvaltı' | 'Öğle Yemeği' | 'Akşam Yemeği' | 'Ara Öğün') => setNewMealType(value)}>
                      <SelectTrigger id="mealType">
                        <SelectValue placeholder="Öğün türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mealTime">Öğün Saati</Label>
                  <Input
                    id="mealTime"
                    type="time"
                    value={newMealTime}
                    onChange={(e) => setNewMealTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Eklenen Yemekler</Label>
                    <FoodSearchDialog onSelectFood={handleSelectFood} />
                  </div>
                  
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    {selectedFoods.length > 0 ? (
                      <div className="space-y-2">
                        {selectedFoods.map((food, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <p className="font-medium">{food.name}</p>
                              <p className="text-sm text-muted-foreground">{food.portion}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p>{food.calories} kcal</p>
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveFood(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold pt-2">
                          <span>Toplam</span>
                          <span>{calculateMealTotalCalories(selectedFoods)} kcal</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-muted-foreground">
                          Henüz yemek eklenmedi. Yemek eklemek için "Yemek Ara" butonunu kullanın.
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMealDialog(false)}>İptal</Button>
                <Button onClick={handleAddMeal}>Öğün Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue={daysOfWeek[0]}>
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {daysOfWeek.map(day => (
            <TabsTrigger key={day} value={day} className="flex-1">
              <div className="flex flex-col items-center">
                <span>{day}</span>
                <span className="text-xs">{calculateDayTotalCalories(day)} kcal</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {daysOfWeek.map(day => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{day} Beslenme Planı</span>
                  <span className="text-sm font-normal">
                    Toplam: {calculateDayTotalCalories(day)} kcal
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getMealsByDay(day).length > 0 ? (
                  <div className="space-y-6">
                    {getMealsByDay(day)
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map(meal => (
                        <Card key={meal.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{meal.time}</span>
                                <span className="text-muted-foreground">-</span>
                                <span className="font-medium">{meal.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{calculateMealTotalCalories(meal.foods)} kcal</span>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteMeal(meal.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Yemek</TableHead>
                                  <TableHead>Porsiyon</TableHead>
                                  <TableHead className="text-right">Kalori</TableHead>
                                  <TableHead className="text-right">Protein</TableHead>
                                  <TableHead className="text-right">Karb</TableHead>
                                  <TableHead className="text-right">Yağ</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {meal.foods.map((food, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{food.name}</TableCell>
                                    <TableCell>{food.portion}</TableCell>
                                    <TableCell className="text-right">{food.calories} kcal</TableCell>
                                    <TableCell className="text-right">{food.protein}g</TableCell>
                                    <TableCell className="text-right">{food.carbs}g</TableCell>
                                    <TableCell className="text-right">{food.fat}g</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Henüz öğün eklenmemiş</h3>
                    <p className="text-muted-foreground mb-6">
                      {day} günü için henüz bir beslenme planı oluşturulmamış.
                    </p>
                    <Button onClick={() => setShowAddMealDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Öğün Ekle
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MealPlanner;

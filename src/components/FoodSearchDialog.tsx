
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, Utensils } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { FoodItem, searchFoods, getFoodsByCategory, getAllCategories } from '@/services/nutritionAPI';

interface FoodSearchDialogProps {
  onSelectFood: (food: FoodItem) => void;
}

const FoodSearchDialog: React.FC<FoodSearchDialogProps> = ({ onSelectFood }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [categories] = useState<string[]>(getAllCategories());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryFoods, setCategoryFoods] = useState<FoodItem[]>([]);
  
  // Arama sonuçlarını güncelle
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const results = searchFoods(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  // Kategori değiştiğinde yemekleri güncelle
  useEffect(() => {
    if (selectedCategory) {
      const foods = getFoodsByCategory(selectedCategory);
      setCategoryFoods(foods);
    }
  }, [selectedCategory]);
  
  // Yemek seçildiğinde
  const handleSelectFood = (food: FoodItem) => {
    onSelectFood(food);
    setOpen(false);
    toast({
      title: "Yemek eklendi",
      description: `${food.name} (${food.calories} kcal) beslenme planınıza eklendi.`
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Utensils className="mr-2 h-4 w-4" />
          Yemek Ara
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Yemek Ara</DialogTitle>
          <DialogDescription>
            Beslenme planınıza eklemek istediğiniz yemeği seçin veya arayın.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Yemek adı veya kategorisi ara..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="search">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="search">Arama Sonuçları</TabsTrigger>
              <TabsTrigger value="categories">Kategoriler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((food) => (
                      <Card key={food.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectFood(food)}>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{food.name}</h4>
                              <p className="text-sm text-muted-foreground">{food.portion}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{food.calories} kcal</p>
                              <p className="text-xs text-muted-foreground">
                                P: {food.protein}g | K: {food.carbs}g | Y: {food.fat}g
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-muted-foreground">
                      {searchQuery ? 'Arama sonucu bulunamadı.' : 'Yemek aramak için yukarıdaki arama kutusunu kullanın.'}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <ScrollArea className="h-[320px] rounded-md border p-4">
                {selectedCategory ? (
                  categoryFoods.length > 0 ? (
                    <div className="space-y-2">
                      {categoryFoods.map((food) => (
                        <Card key={food.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectFood(food)}>
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{food.name}</h4>
                                <p className="text-sm text-muted-foreground">{food.portion}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{food.calories} kcal</p>
                                <p className="text-xs text-muted-foreground">
                                  P: {food.protein}g | K: {food.carbs}g | Y: {food.fat}g
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">Bu kategoride yemek bulunamadı.</p>
                  )
                ) : (
                  <p className="text-center text-muted-foreground">Bir kategori seçin.</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Kapat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodSearchDialog;

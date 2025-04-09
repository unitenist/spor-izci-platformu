
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Check } from 'lucide-react';

interface ExerciseCardProps {
  exercise: {
    id: string;
    name: string;
    muscleGroup: string;
    difficulty: 'Kolay' | 'Orta' | 'Zor';
    equipment?: string;
    imageUrl?: string;
  };
  isInWorkout?: boolean;
  onToggle?: () => void;
}

const difficultyColor = {
  'Kolay': 'bg-green-500',
  'Orta': 'bg-yellow-500',
  'Zor': 'bg-red-500'
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isInWorkout, onToggle }) => {
  return (
    <Card className="h-full overflow-hidden border border-border hover:shadow-md transition-all">
      <div className="h-40 overflow-hidden">
        {exercise.imageUrl ? (
          <img 
            src={exercise.imageUrl} 
            alt={exercise.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Resim Yok</span>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{exercise.name}</CardTitle>
          <Badge className={difficultyColor[exercise.difficulty]}>
            {exercise.difficulty}
          </Badge>
        </div>
        <CardDescription>{exercise.muscleGroup}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {exercise.equipment && (
          <p className="text-sm text-muted-foreground mb-3">
            <span className="font-medium">Ekipman:</span> {exercise.equipment}
          </p>
        )}
        
        {onToggle && (
          <Button 
            variant={isInWorkout ? "outline" : "default"} 
            className="w-full mt-2" 
            onClick={onToggle}
          >
            {isInWorkout ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Eklendi
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Ekle
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;

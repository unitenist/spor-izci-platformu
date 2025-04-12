
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, Clock, ArrowRight, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WorkoutType } from '@/data/mockWorkouts';

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col border hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg font-bold">{workout.name}</CardTitle>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {workout.type}
          </Badge>
        </div>
        <CardDescription>{workout.description}</CardDescription>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{workout.exercises} egzersiz</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{workout.duration} dk</span>
          </div>
          {workout.lastPerformed && (
            <div className="flex items-center col-span-2 mt-1">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Son: {workout.lastPerformed}</span>
            </div>
          )}
          {workout.difficulty && (
            <div className="flex items-center col-span-2 mt-1">
              <span className="text-muted-foreground">Zorluk: {workout.difficulty}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        <Button 
          variant="default" 
          className="flex-1" 
          onClick={() => navigate(`/workouts/${workout.id}`)}
        >
          Detaylar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/create-workout?edit=${workout.id}`);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;

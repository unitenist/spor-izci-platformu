
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ExerciseImageProps {
  exerciseName: string;
}

// Map of exercise names to image URLs
const exerciseImages: Record<string, string> = {
  'Barbell Squat': '/images/barbell-squat.jpg',
  'Dumbbell Bench Press': '/images/dumbbell-bench-press.jpg',
  'Pull-ups': '/images/pull-ups.jpg',
  'Shoulder Press': '/images/shoulder-press.jpg',
  'Barbell Row': '/images/barbell-row.jpg',
  'Lunges': '/images/lunges.jpg',
  'Plank': '/images/plank.jpg',
  'Leg Raises': '/images/leg-raises.jpg',
  // Default image for exercises without specific images
  'default': '/placeholder.svg'
};

const ExerciseImage: React.FC<ExerciseImageProps> = ({ exerciseName }) => {
  const imageUrl = exerciseImages[exerciseName] || exerciseImages.default;
  
  return (
    <div className="rounded-md overflow-hidden border border-border">
      <AspectRatio ratio={16/9}>
        <img 
          src={imageUrl} 
          alt={`${exerciseName} egzersizi nasıl yapılır`}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
};

export default ExerciseImage;

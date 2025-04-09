
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const dummyProgressData = [
  { date: '1 Hafta Önce', weight: 50, reps: 8 },
  { date: '5 Gün Önce', weight: 55, reps: 10 },
  { date: '3 Gün Önce', weight: 60, reps: 9 },
  { date: 'Dün', weight: 62.5, reps: 12 },
  { date: 'Bugün', weight: 65, reps: 10 },
];

interface WorkoutProgressChartProps {
  exerciseName: string;
}

const WorkoutProgressChart: React.FC<WorkoutProgressChartProps> = ({ exerciseName }) => {
  const config = {
    weight: {
      label: 'Ağırlık (kg)',
      color: '#8B5CF6',
    },
    reps: {
      label: 'Tekrar Sayısı',
      color: '#2DD4BF',
    },
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{exerciseName} İlerleme Grafiği</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={config}>
            <LineChart data={dummyProgressData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="weight" 
                name="Ağırlık (kg)" 
                stroke="#8B5CF6" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="reps" 
                name="Tekrar Sayısı" 
                stroke="#2DD4BF" 
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutProgressChart;

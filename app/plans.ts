import { Exercise } from '@/app/exercises';

export type ExercisePlan = {
  name: string;
  exercises: Exercise[];
};

// Przykładowe plany
export const plans: ExercisePlan[] = [
  {
    name: 'Plan A brzuch i nogi',
    exercises: [
      { name: 'Brzuszki', sets: 3, reps: 15 },
      { name: 'Przysiady', sets: 4, reps: 12 },
      { name: 'Plank', sets: 3, reps: 60 },
    ],
  },
  {
    name: 'Plan B ramiona i cardio',
    exercises: [
      { name: 'Pompki', sets: 3, reps: 10 },
      { name: 'Skakanka', sets: 5, reps: 100 },
    ],
  },
];

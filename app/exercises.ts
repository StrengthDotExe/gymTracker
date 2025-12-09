export type Exercise = {
  id?: number;
  name: string;
  sets: number;
  reps: number;
};

export const exerciseList: Exercise[] = [
  { name: 'Brzuszki', sets: 3, reps: 15 },
  { name: 'Przysiady', sets: 4, reps: 12 },
  { name: 'Pompki', sets: 3, reps: 10 },
  { name: 'Plank', sets: 3, reps: 60 }, 
  { name: 'Skakanka', sets: 5, reps: 100 },
];

export type Login = {
  login: string;
  password: string;
};

export type Exercise = {
  name: string;
  filePath: string;
  sets: number;
  reps: number[];
  weight: number[];
};
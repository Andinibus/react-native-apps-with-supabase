export type WorkoutDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface WorkoutSummary {
  id: string;
  title: string;
  durationInMinutes: number;
  difficulty: WorkoutDifficulty;
}

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Core'
  | 'Legs'
  | 'Glutes'
  | 'Full Body';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
  restInSeconds?: number;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description?: string;
  workoutCount: number;
  durationInWeeks: number;
  difficulty: WorkoutDifficulty;
  targetMuscleGroups: MuscleGroup[];
}

export interface UserProgress {
  userId: string;
  workoutsCompleted: number;
  totalMinutes: number;
  currentStreak: number;
  lastWorkoutAt?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

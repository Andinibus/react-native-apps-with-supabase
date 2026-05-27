import React from 'react';

import { ExerciseCard } from '../../src/molecules/ExerciseCard';

const meta = {
  title: 'Molecules/ExerciseCard',
  component: ExerciseCard,
  args: {
    index: 0,
    exercise: { id: 'ex-001', name: 'Barbell Squat', muscleGroup: 'Legs', sets: 4, reps: 8, restInSeconds: 90 }
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#141408' }] }
  }
};

export default meta;

export const Default = {};
export const NoRest = { args: { exercise: { id: 'ex-002', name: 'Push-Up', muscleGroup: 'Chest', sets: 3, reps: 15 } } };
export const FullBody = { args: { index: 2, exercise: { id: 'ex-003', name: 'Burpee', muscleGroup: 'Full Body', sets: 5, reps: 10, restInSeconds: 60 } } };

import React from 'react';
import { View } from 'react-native';

import { TrainingPlanCard } from '../../src/organisms/TrainingPlanCard';

const plan = {
  id: 'plan-001',
  title: 'Hypertrophie Basis',
  description: 'Klassisches 3-Tage-Split für soliden Muskelaufbau.',
  workoutCount: 12,
  durationInWeeks: 6,
  difficulty: 'Intermediate' as const,
  targetMuscleGroups: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms']
};

const meta = {
  title: 'Organisms/TrainingPlanCard',
  component: TrainingPlanCard,
  args: { plan },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 340, padding: 16 }}>
        <Story />
      </View>
    )
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#141408' }] }
  }
};

export default meta;

export const Default = {};
export const Beginner = {
  args: {
    plan: {
      id: 'plan-002',
      title: 'Einsteiger Bodyweight',
      description: 'Kein Equipment nötig. Perfekt für den Start.',
      workoutCount: 8,
      durationInWeeks: 4,
      difficulty: 'Beginner',
      targetMuscleGroups: ['Full Body', 'Core']
    }
  }
};
export const Advanced = {
  args: {
    plan: {
      id: 'plan-003',
      title: 'Powerlifting Peaking',
      description: undefined,
      workoutCount: 16,
      durationInWeeks: 8,
      difficulty: 'Advanced',
      targetMuscleGroups: ['Legs', 'Back', 'Chest', 'Shoulders', 'Arms', 'Core']
    }
  }
};

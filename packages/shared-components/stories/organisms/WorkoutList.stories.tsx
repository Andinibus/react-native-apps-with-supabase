import React from 'react';
import { View } from 'react-native';

import { WorkoutList } from '../../src/organisms/WorkoutList';

const workouts = [
  { id: 'w1', title: 'Full Body Blast', durationInMinutes: 45, difficulty: 'Intermediate' as const },
  { id: 'w2', title: 'Upper Push', durationInMinutes: 35, difficulty: 'Beginner' as const },
  { id: 'w3', title: 'Leg Day', durationInMinutes: 55, difficulty: 'Advanced' as const },
  { id: 'w4', title: 'Core & Mobility', durationInMinutes: 25, difficulty: 'Beginner' as const }
];

const meta = {
  title: 'Organisms/WorkoutList',
  component: WorkoutList,
  args: { workouts, heading: 'Empfohlene Workouts' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 360, padding: 16 }}>
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
export const NoHeading = { args: { heading: undefined } };
export const Empty = { args: { workouts: [], heading: 'Deine Workouts' } };

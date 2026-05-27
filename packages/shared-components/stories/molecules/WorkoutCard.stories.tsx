import React from 'react';

import { WorkoutCard } from '../../src/molecules/WorkoutCard';

const meta = {
  title: 'Molecules/WorkoutCard',
  component: WorkoutCard,
  args: { title: 'Full Body Session', durationInMinutes: 40, difficulty: 'Intermediate' },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#141408' }] }
  }
};

export default meta;

export const Default = {};
export const Beginner = { args: { title: 'Mobility Warmup', durationInMinutes: 15, difficulty: 'Beginner' } };
export const Advanced = { args: { title: 'Athlete Conditioning', durationInMinutes: 60, difficulty: 'Advanced' } };
export const LongTitle = { args: { title: 'Progressive Overload Upper Body Push Day', durationInMinutes: 55, difficulty: 'Advanced' } };

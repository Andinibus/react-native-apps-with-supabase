import React from 'react';
import { View } from 'react-native';

import { StatCard } from '../../src/molecules/StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  args: { value: '47', label: 'Workouts' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 120, padding: 8 }}>
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
export const Streak = { args: { value: '7', label: 'Streak' } };
export const Time = { args: { value: '38h', label: 'Gesamt' } };
export const Accent = { args: { value: '3', label: 'Diese Woche', accent: true } };

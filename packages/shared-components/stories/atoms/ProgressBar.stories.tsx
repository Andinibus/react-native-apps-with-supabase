import React from 'react';
import { View } from 'react-native';

import { ProgressBar } from '../../src/atoms/ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  args: { value: 60, max: 100, label: 'Fortschritt', showPercent: true },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 320, padding: 16 }}>
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
export const Empty = { args: { value: 0, label: 'Noch kein Fortschritt', showPercent: true } };
export const Full = { args: { value: 100, label: 'Abgeschlossen', showPercent: true } };
export const NoLabel = { args: { value: 45, showPercent: false } };
export const WorkoutProgress = { args: { value: 6, max: 24, label: 'Workouts abgeschlossen', showPercent: true } };

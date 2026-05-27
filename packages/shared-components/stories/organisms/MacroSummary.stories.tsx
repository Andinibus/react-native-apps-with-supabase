import React from 'react';
import { View } from 'react-native';

import { MacroSummary } from '../../src/organisms/MacroSummary';

const meta = {
  title: 'Organisms/MacroSummary',
  component: MacroSummary,
  args: {
    kcal: 1840,
    kcalGoal: 2400,
    protein: 112,
    proteinGoal: 160,
    carbs: 195,
    carbsGoal: 260,
    fat: 58,
    fatGoal: 80
  },
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
export const GoalAlmostReached = {
  args: {
    kcal: 2300,
    kcalGoal: 2400,
    protein: 155,
    proteinGoal: 160,
    carbs: 250,
    carbsGoal: 260,
    fat: 77,
    fatGoal: 80
  }
};
export const GoalExceeded = {
  args: {
    kcal: 2600,
    kcalGoal: 2400,
    protein: 175,
    proteinGoal: 160,
    carbs: 280,
    carbsGoal: 260,
    fat: 90,
    fatGoal: 80
  }
};
export const MorningState = {
  args: {
    kcal: 380,
    kcalGoal: 2400,
    protein: 14,
    proteinGoal: 160,
    carbs: 62,
    carbsGoal: 260,
    fat: 8,
    fatGoal: 80
  }
};

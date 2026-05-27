import React from 'react';
import { View } from 'react-native';

import { MealRow } from '../../src/molecules/MealRow';

const meta = {
  title: 'Molecules/MealRow',
  component: MealRow,
  args: { name: 'Haferflocken mit Beeren', time: '08:00', kcal: 380, protein: 14, carbs: 62, fat: 8 },
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

export const Breakfast = {};
export const Lunch = { args: { name: 'Hähnchenbrust mit Reis', time: '12:30', kcal: 520, protein: 46, carbs: 55, fat: 9 } };
export const Dinner = { args: { name: 'Lachs mit Brokkoli & Quinoa', time: '19:00', kcal: 610, protein: 42, carbs: 44, fat: 22 } };
export const Snack = { args: { name: 'Proteinriegel', time: '16:00', kcal: 210, protein: 20, carbs: 18, fat: 6 } };

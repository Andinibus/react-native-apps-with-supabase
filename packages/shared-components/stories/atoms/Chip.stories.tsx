import React from 'react';
import { View } from 'react-native';

import { Chip } from '../../src/atoms/Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  args: { label: 'Legs', selected: false },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 24, flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
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

export const Default = { args: { label: 'Legs', selected: false } };
export const Selected = { args: { label: 'Chest', selected: true } };
export const Filter = { args: { label: 'Alle', selected: true } };

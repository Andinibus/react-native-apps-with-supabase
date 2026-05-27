import React from 'react';
import { View } from 'react-native';

import { Badge } from '../../src/atoms/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  args: { label: 'Intermediate', variant: 'intermediate' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 24 }}>
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

export const Default = { args: { label: 'Standard', variant: 'default' } };
export const Beginner = { args: { label: 'Beginner', variant: 'beginner' } };
export const Intermediate = { args: { label: 'Intermediate', variant: 'intermediate' } };
export const Advanced = { args: { label: 'Advanced', variant: 'advanced' } };
export const Success = { args: { label: 'Abgeschlossen', variant: 'success' } };
export const Warning = { args: { label: 'In Bearbeitung', variant: 'warning' } };
export const Danger = { args: { label: 'Gesperrt', variant: 'danger' } };

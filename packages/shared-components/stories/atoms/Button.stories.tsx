import React from 'react';
import { View } from 'react-native';

import { Button } from '../../src/atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { label: 'Klick mich', variant: 'primary', size: 'md' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 24, gap: 12, width: 280 }}>
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

export const Primary = { args: { label: 'Training starten', variant: 'primary' } };
export const Secondary = { args: { label: 'Mehr anzeigen', variant: 'secondary' } };
export const Ghost = { args: { label: 'Abbrechen', variant: 'ghost' } };
export const Danger = { args: { label: 'Account löschen', variant: 'danger' } };
export const Small = { args: { label: 'Filter', variant: 'ghost', size: 'sm' } };
export const Large = { args: { label: 'Los geht\'s', variant: 'primary', size: 'lg', fullWidth: true } };
export const Disabled = { args: { label: 'Nicht verfügbar', variant: 'primary', disabled: true } };

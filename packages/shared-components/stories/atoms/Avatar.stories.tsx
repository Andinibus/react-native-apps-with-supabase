import React from 'react';
import { View } from 'react-native';

import { Avatar } from '../../src/atoms/Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: { initials: 'MM', size: 'md' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 24, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
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

export const Small = { args: { initials: 'SK', size: 'sm' } };
export const Medium = { args: { initials: 'MM', size: 'md' } };
export const Large = { args: { initials: 'TR', size: 'lg' } };
export const XLarge = { args: { initials: 'AT', size: 'xl' } };
export const Highlighted = { args: { initials: 'AT', size: 'lg', highlighted: true } };

import React from 'react';
import { View } from 'react-native';

import { ChatBubble } from '../../src/molecules/ChatBubble';

const meta = {
  title: 'Molecules/ChatBubble',
  component: ChatBubble,
  args: { text: 'Wie viel Protein brauche ich?', role: 'user' },
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

export const UserMessage = { args: { text: 'Wie oft sollte ich trainieren?', role: 'user', timestamp: '14:32' } };
export const CoachMessage = { args: { text: 'Als Anfänger empfehle ich 3x pro Woche. Wichtig ist ausreichend Erholung zwischen den Einheiten.', role: 'coach', timestamp: '14:32' } };
export const LongCoach = { args: { text: 'Gute Frage! Für Muskelaufbau brauchst du ca. 1,6–2,2g Protein pro kg Körpergewicht täglich. Bei 80kg also 128–176g.', role: 'coach' } };

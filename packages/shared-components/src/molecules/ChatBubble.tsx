import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export type ChatRole = 'user' | 'coach';

export interface ChatBubbleProps {
  text: string;
  role: ChatRole;
  timestamp?: string;
}

export function ChatBubble({ text, role, timestamp }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <View style={[styles.wrapper, isUser && styles.wrapperUser]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleCoach]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textCoach]}>{text}</Text>
      </View>
      {timestamp && (
        <Text style={[styles.timestamp, isUser && styles.timestampUser]}>{timestamp}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    gap: 4
  },
  wrapperUser: {
    alignSelf: 'flex-end'
  },
  bubble: {
    borderRadius: radius.lg,
    padding: spacing.sm
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.sm
  },
  bubbleCoach: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderBottomLeftRadius: radius.sm
  },
  text: {
    ...typography.bodyBase
  },
  textUser: {
    color: colors.onPrimary,
    fontWeight: '600'
  },
  textCoach: {
    color: colors.onSurface
  },
  timestamp: {
    ...typography.labelCaps,
    color: colors.outline,
    alignSelf: 'flex-start'
  },
  timestampUser: {
    alignSelf: 'flex-end'
  }
});

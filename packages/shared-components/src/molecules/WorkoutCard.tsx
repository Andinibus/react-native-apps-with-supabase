import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { WorkoutDifficulty } from '@workout/shared-types';
import { formatWorkoutDuration } from '@workout/shared-utils';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface WorkoutCardProps {
  title: string;
  durationInMinutes: number;
  difficulty: WorkoutDifficulty;
  onPress?: () => void;
}

const difficultyBadge: Record<WorkoutDifficulty, { bg: string; text: string }> = {
  Beginner: { bg: colors.tertiary + '26', text: colors.tertiary },
  Intermediate: { bg: colors.secondary + '26', text: colors.secondary },
  Advanced: { bg: colors.error + '26', text: colors.error }
};

export function WorkoutCard({ title, durationInMinutes, difficulty, onPress }: WorkoutCardProps) {
  const badge = difficultyBadge[difficulty];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>{difficulty}</Text>
        </View>
      </View>
      <Text style={styles.meta}>{formatWorkoutDuration(durationInMinutes)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.lg,
    padding: spacing.cardPadding,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  cardPressed: {
    opacity: 0.85
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.inlineGap
  },
  title: {
    flex: 1,
    ...typography.titleMD,
    color: colors.onSurface
  },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  badgeText: {
    ...typography.labelCaps
  },
  meta: {
    ...typography.bodySM,
    color: colors.onSurfaceVariant
  }
});

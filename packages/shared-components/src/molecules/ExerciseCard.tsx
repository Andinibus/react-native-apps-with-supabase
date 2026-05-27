import { StyleSheet, Text, View } from 'react-native';

import type { Exercise } from '@workout/shared-types';
import { formatRestDuration } from '@workout/shared-utils';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const { name, muscleGroup, sets, reps, restInSeconds } = exercise;

  return (
    <View style={styles.card}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index !== undefined ? index + 1 : '–'}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.muscle}>{muscleGroup}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{sets}</Text>
          <Text style={styles.statLabel}>Sets</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{reps}</Text>
          <Text style={styles.statLabel}>Reps</Text>
        </View>
        {restInSeconds !== undefined && (
          <>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatRestDuration(restInSeconds)}</Text>
              <Text style={styles.statLabel}>Rest</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indexText: {
    ...typography.bodySM,
    color: colors.onSurfaceVariant
  },
  body: {
    flex: 1,
    gap: 2
  },
  name: {
    ...typography.titleMD,
    color: colors.onSurface
  },
  muscle: {
    ...typography.bodySM,
    color: colors.onSurfaceVariant
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs
  },
  stat: {
    alignItems: 'center',
    minWidth: 36
  },
  statValue: {
    ...typography.titleMD,
    color: colors.primary
  },
  statLabel: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.outlineVariant
  }
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { TrainingPlan } from '@workout/shared-types';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface TrainingPlanCardProps {
  plan: TrainingPlan;
  onPress?: () => void;
}

const difficultyColor: Record<string, string> = {
  Beginner: colors.tertiary,
  Intermediate: colors.secondary,
  Advanced: colors.error
};

export function TrainingPlanCard({ plan, onPress }: TrainingPlanCardProps) {
  const { title, description, workoutCount, durationInWeeks, difficulty, targetMuscleGroups } = plan;
  const badgeColor = difficultyColor[difficulty] ?? colors.onSurfaceVariant;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: badgeColor + '26' }]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>{difficulty}</Text>
        </View>
      </View>

      {description ? <Text style={styles.description}>{description}</Text> : null}

      <View style={styles.muscleRow}>
        {targetMuscleGroups.slice(0, 3).map((group) => (
          <View key={group} style={styles.muscleChip}>
            <Text style={styles.muscleChipText}>{group}</Text>
          </View>
        ))}
        {targetMuscleGroups.length > 3 && (
          <View style={styles.muscleChip}>
            <Text style={styles.muscleChipText}>+{targetMuscleGroups.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaItem}>{workoutCount} Workouts</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaItem}>{durationInWeeks} Wochen</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: radius.lg,
    padding: spacing.cardPadding,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  cardPressed: { opacity: 0.85 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm
  },
  title: { ...typography.titleMD, color: colors.onSurface, flex: 1 },
  badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { ...typography.labelCaps },
  description: { ...typography.bodySM, color: colors.onSurfaceVariant },
  muscleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  muscleChip: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  muscleChipText: { ...typography.labelCaps, color: colors.onSurfaceVariant },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  metaItem: { ...typography.bodySM, color: colors.outline },
  metaDot: { ...typography.bodySM, color: colors.outlineVariant }
});

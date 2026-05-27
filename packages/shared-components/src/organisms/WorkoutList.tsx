import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';
import { WorkoutCard } from '../molecules/WorkoutCard';

const { colors, spacing, typography } = kineticTheme;

export interface WorkoutListItem {
  id: string;
  title: string;
  durationInMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WorkoutListProps {
  workouts: WorkoutListItem[];
  heading?: string;
  onPressWorkout?: (id: string) => void;
}

export function WorkoutList({ workouts, heading, onPressWorkout }: WorkoutListProps) {
  return (
    <View style={styles.container}>
      {heading ? <Text style={styles.heading}>{heading}</Text> : null}
      {workouts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Keine Workouts gefunden.</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {workouts.map((w) => (
            <View key={w.id} style={styles.cardWrapper}>
              <WorkoutCard
                title={w.title}
                durationInMinutes={w.durationInMinutes}
                difficulty={w.difficulty}
                onPress={onPressWorkout ? () => onPressWorkout(w.id) : undefined}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  heading: { ...typography.headlineLG, color: colors.onSurface },
  scroll: { gap: spacing.sm, paddingHorizontal: 2, paddingVertical: 4 },
  cardWrapper: { width: 220 },
  empty: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center'
  },
  emptyText: { ...typography.bodySM, color: colors.onSurfaceVariant }
});

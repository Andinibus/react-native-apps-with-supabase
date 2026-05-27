import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface MealRowProps {
  name: string;
  time: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function MealRow({ name, time, kcal, protein, carbs, fat }: MealRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.timeBox}>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.macros}>
          <Text style={styles.macro}>{kcal} kcal</Text>
          <Text style={styles.sep}>·</Text>
          <Text style={styles.macro}>P {protein}g</Text>
          <Text style={styles.sep}>·</Text>
          <Text style={styles.macro}>K {carbs}g</Text>
          <Text style={styles.sep}>·</Text>
          <Text style={styles.macro}>F {fat}g</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  timeBox: { justifyContent: 'center' },
  time: { ...typography.bodySM, color: colors.outline, minWidth: 40, fontWeight: '700' },
  body: { flex: 1, gap: 4 },
  name: { ...typography.titleMD, color: colors.onSurface },
  macros: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  macro: { ...typography.bodySM, color: colors.onSurfaceVariant },
  sep: { ...typography.bodySM, color: colors.outlineVariant }
});

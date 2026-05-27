import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';
import { ProgressBar } from '../atoms/ProgressBar';

const { colors, spacing, typography } = kineticTheme;

export interface MacroSummaryProps {
  kcal: number;
  kcalGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
}

interface MacroRingProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

function MacroRing({ label, current, goal, unit, color }: MacroRingProps) {
  const pct = Math.min(current / goal, 1);
  const radius = 28;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const dash = pct * circumference;

  return (
    <View style={styles.ring}>
      {/* SVG ring via border trick */}
      <View
        style={[
          styles.ringOuter,
          { borderColor: colors.outlineVariant, width: radius * 2 + stroke * 2, height: radius * 2 + stroke * 2, borderRadius: radius + stroke }
        ]}
      >
        <View
          style={[
            styles.ringInner,
            {
              borderColor: color,
              borderTopColor: pct >= 0.5 ? color : 'transparent',
              borderRightColor: pct >= 0.25 ? color : 'transparent',
              borderBottomColor: pct >= 0.75 ? color : 'transparent',
              borderLeftColor: pct >= 1 ? color : 'transparent',
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius
            }
          ]}
        >
          <Text style={[styles.ringValue, { color }]}>{current}</Text>
          <Text style={styles.ringUnit}>{unit}</Text>
        </View>
      </View>
      <Text style={styles.ringLabel}>{label}</Text>
      <Text style={styles.ringGoal}>von {goal}{unit}</Text>
    </View>
  );
}

export function MacroSummary({ kcal, kcalGoal, protein, proteinGoal, carbs, carbsGoal, fat, fatGoal }: MacroSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Heutige Makros</Text>
        <Text style={styles.kcalBadge}>{kcal} / {kcalGoal} kcal</Text>
      </View>

      <ProgressBar value={kcal} max={kcalGoal} />

      <View style={styles.macroRow}>
        <MacroRing label="Protein" current={protein} goal={proteinGoal} unit="g" color={colors.primary} />
        <MacroRing label="Kohlenhydrate" current={carbs} goal={carbsGoal} unit="g" color={colors.secondary} />
        <MacroRing label="Fett" current={fat} goal={fatGoal} unit="g" color={colors.tertiary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { ...typography.titleMD, color: colors.onSurface },
  kcalBadge: { ...typography.bodySM, color: colors.primary, fontWeight: '700' },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.sm
  },
  ring: { alignItems: 'center', gap: 4 },
  ringOuter: {
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ringInner: {
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ringValue: { ...typography.titleMD, fontWeight: '800' },
  ringUnit: { ...typography.bodySM, color: colors.onSurfaceVariant, marginTop: -2 },
  ringLabel: { ...typography.labelCaps, color: colors.onSurface, marginTop: 4 },
  ringGoal: { ...typography.bodySM, color: colors.outline }
});

import { StyleSheet, Text, View } from 'react-native';

import { clamp } from '@workout/shared-utils';

import { kineticTheme } from './kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({ value, max = 100, label, showPercent = false }: ProgressBarProps) {
  const percent = clamp(Math.round((value / max) * 100), 0, 100);

  return (
    <View style={styles.wrapper}>
      {(label || showPercent) && (
        <View style={styles.labelRow}>
          {label ? <Text style={styles.label}>{label}</Text> : <View />}
          {showPercent && <Text style={styles.percent}>{percent}%</Text>}
        </View>
      )}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    ...typography.bodySM,
    color: colors.onSurfaceVariant
  },
  percent: {
    ...typography.labelCaps,
    color: colors.primary
  },
  track: {
    height: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: radius.pill,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill
  }
});

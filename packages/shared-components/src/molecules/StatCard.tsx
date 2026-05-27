import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface StatCardProps {
  value: string;
  label: string;
  accent?: boolean;
}

export function StatCard({ value, label, accent = false }: StatCardProps) {
  return (
    <View style={[styles.card, accent && styles.cardAccent]}>
      <Text style={[styles.value, accent && styles.valueAccent]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  cardAccent: {
    borderColor: colors.primary + '60'
  },
  value: {
    ...typography.displayXL,
    color: colors.primary
  },
  valueAccent: {
    color: colors.primary
  },
  label: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant,
    marginTop: 4
  }
});

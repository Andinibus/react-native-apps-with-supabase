import { Pressable, StyleSheet, Text } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, radius, typography, spacing } = kineticTheme;

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  chipSelected: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary
  },
  label: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant
  },
  labelSelected: {
    color: colors.primary
  }
});

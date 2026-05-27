import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, radius, typography } = kineticTheme;

export type BadgeVariant = 'default' | 'beginner' | 'intermediate' | 'advanced' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantColor: Record<BadgeVariant, { bg: string; text: string }> = {
  default:      { bg: colors.surfaceVariant,       text: colors.onSurfaceVariant },
  beginner:     { bg: colors.tertiary + '26',      text: colors.tertiary },
  intermediate: { bg: colors.secondary + '26',     text: colors.secondary },
  advanced:     { bg: colors.error + '26',         text: colors.error },
  success:      { bg: colors.tertiary + '26',      text: colors.tertiary },
  warning:      { bg: colors.primary + '26',       text: colors.primaryDim },
  danger:       { bg: colors.error + '26',         text: colors.error }
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const { bg, text } = variantColor[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start'
  },
  label: {
    ...typography.labelCaps
  }
});

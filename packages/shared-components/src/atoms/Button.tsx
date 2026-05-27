import { Pressable, StyleSheet, Text } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: {
    container: { backgroundColor: colors.primary, borderWidth: 0 },
    text: { color: colors.onPrimary }
  },
  secondary: {
    container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
    text: { color: colors.primary }
  },
  ghost: {
    container: { backgroundColor: colors.surfaceVariant, borderWidth: 1, borderColor: colors.outlineVariant },
    text: { color: colors.onSurface }
  },
  danger: {
    container: { backgroundColor: colors.error + '20', borderWidth: 1, borderColor: colors.error },
    text: { color: colors.error }
  }
};

const sizeStyles = {
  sm: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.sm },
  md: { paddingHorizontal: spacing.md, paddingVertical: 12, borderRadius: radius.md },
  lg: { paddingHorizontal: spacing.lg, paddingVertical: 16, borderRadius: radius.lg }
};

const sizeText = {
  sm: { fontSize: 13, fontWeight: '600' as const },
  md: { ...typography.bodySM, fontWeight: '700' as const },
  lg: { fontSize: 16, fontWeight: '700' as const }
};

export function Button({ label, onPress, variant = 'primary', size = 'md', disabled = false, fullWidth = false }: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const t = sizeText[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        v.container,
        s,
        fullWidth && styles.fullWidth,
        (disabled || pressed) && styles.dimmed
      ]}
    >
      <Text style={[styles.text, v.text, t]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  fullWidth: { alignSelf: 'stretch' },
  text: {},
  dimmed: { opacity: 0.6 }
});

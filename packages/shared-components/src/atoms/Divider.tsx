import { StyleSheet, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, spacing } = kineticTheme;

export interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({ spacing: sp = 'md' }: DividerProps) {
  const margin = sp === 'sm' ? spacing.xs : sp === 'lg' ? spacing.lg : spacing.md;
  return <View style={[styles.line, { marginVertical: margin }]} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'stretch'
  }
});

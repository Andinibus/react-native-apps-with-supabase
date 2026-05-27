import { StyleSheet, Text, View } from 'react-native';

import { kineticTheme } from '../kineticTheme';

const { colors, radius, typography } = kineticTheme;

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  highlighted?: boolean;
}

const sizeMap: Record<AvatarSize, { container: number; font: number }> = {
  sm: { container: 32, font: 12 },
  md: { container: 44, font: 16 },
  lg: { container: 60, font: 22 },
  xl: { container: 88, font: 32 }
};

export function Avatar({ initials, size = 'md', highlighted = false }: AvatarProps) {
  const { container, font } = sizeMap[size];
  const dim = container;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          borderColor: highlighted ? colors.primary : colors.outlineVariant
        }
      ]}
    >
      <Text style={[typography.bodySM, { fontSize: font, color: highlighted ? colors.primary : colors.onSurfaceVariant, fontWeight: '700' }]}>
        {initials.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

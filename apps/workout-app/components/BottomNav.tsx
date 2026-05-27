import { Pressable, StyleSheet, Text, View } from 'react-native';

export type AppRoute =
  | '/dashboard'
  | '/workout'
  | '/ki-coach'
  | '/ernaehrung'
  | '/profil';

interface NavItem {
  route: AppRoute;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { route: '/dashboard', label: 'Home', icon: '⊞' },
  { route: '/workout', label: 'Training', icon: '◈' },
  { route: '/ki-coach', label: 'KI-Coach', icon: '◉' },
  { route: '/ernaehrung', label: 'Ernährung', icon: '◆' },
  { route: '/profil', label: 'Profil', icon: '◎' }
];

interface BottomNavProps {
  current: string;
  onNavigate: (route: AppRoute) => void;
}

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <View style={styles.bar}>
      {NAV_ITEMS.map((item) => {
        const active = current === item.route;
        return (
          <Pressable key={item.route} onPress={() => onNavigate(item.route)} style={styles.item}>
            <Text style={[styles.icon, active && styles.iconActive]}>{item.icon}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#1d1c10',
    borderTopWidth: 1,
    borderTopColor: '#494832',
    paddingBottom: 20,
    paddingTop: 10
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4
  },
  icon: {
    fontSize: 22,
    color: '#949277'
  },
  iconActive: {
    color: '#ede900'
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: '#949277',
    letterSpacing: 0.3
  },
  labelActive: {
    color: '#ede900'
  }
});

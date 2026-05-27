import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@workout/shared-components';

interface Props {
  onNavigate: (route: string) => void;
}

const STATS = [
  { label: 'Workouts', value: '47' },
  { label: 'Streak', value: '7 Tage' },
  { label: 'Gesamt', value: '38h' }
];

const SETTINGS = [
  { icon: '◎', label: 'Benachrichtigungen', value: 'An' },
  { icon: '◆', label: 'Einheit', value: 'kg / km' },
  { icon: '◈', label: 'Trainingsziel', value: 'Muskelaufbau' },
  { icon: '◉', label: 'Sprache', value: 'Deutsch' }
];

export function ProfilScreen({ onNavigate }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarArea}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AT</Text>
        </View>
        <Text style={styles.name}>Athlet</Text>
        <Text style={styles.email}>athlet@kinetic.app</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>◈ Level 12 — Fortgeschritten</Text>
        </View>
      </View>

      {/* XP Progress */}
      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpLabel}>Erfahrungspunkte</Text>
          <Text style={styles.xpValue}>2.340 / 3.000 XP</Text>
        </View>
        <ProgressBar value={2340} max={3000} showPercent />
        <Text style={styles.xpHint}>660 XP bis Level 13</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Erfolge</Text>
        <View style={styles.achievementsRow}>
          {['7-Tage Streak', 'Erster PR', '10 Workouts', 'Community Star'].map((a) => (
            <View key={a} style={styles.achievementBadge}>
              <Text style={styles.achievementIcon}>◆</Text>
              <Text style={styles.achievementLabel}>{a}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Einstellungen</Text>
        <View style={styles.settingsList}>
          {SETTINGS.map((s) => (
            <Pressable key={s.label} style={styles.settingRow}>
              <Text style={styles.settingIcon}>{s.icon}</Text>
              <Text style={styles.settingLabel}>{s.label}</Text>
              <Text style={styles.settingValue}>{s.value}</Text>
              <Text style={styles.settingArrow}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Logout */}
      <Pressable style={styles.logoutBtn} onPress={() => onNavigate('/onboarding')}>
        <Text style={styles.logoutText}>Abmelden</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  content: { padding: 20, gap: 24, paddingBottom: 40 },
  avatarArea: { alignItems: 'center', gap: 8 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ede90026',
    borderWidth: 2,
    borderColor: '#ede900',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#ede900' },
  name: { fontSize: 24, fontWeight: '700', color: '#e6e3ce' },
  email: { fontSize: 14, color: '#949277' },
  levelBadge: {
    backgroundColor: '#ede90020',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ede90060'
  },
  levelText: { fontSize: 13, fontWeight: '700', color: '#ede900' },
  xpCard: {
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#494832'
  },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  xpLabel: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  xpValue: { fontSize: 13, color: '#ede900', fontWeight: '600' },
  xpHint: { fontSize: 12, color: '#949277' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: '#212013',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  statValue: { fontSize: 22, fontWeight: '700', color: '#ede900' },
  statLabel: { fontSize: 11, color: '#949277', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#e6e3ce' },
  achievementsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  achievementBadge: {
    backgroundColor: '#2b2b1d',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#494832'
  },
  achievementIcon: { fontSize: 12, color: '#ede900' },
  achievementLabel: { fontSize: 12, fontWeight: '600', color: '#cbc8ab' },
  settingsList: {
    backgroundColor: '#212013',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#494832',
    overflow: 'hidden'
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b1d'
  },
  settingIcon: { fontSize: 18, color: '#949277', width: 24 },
  settingLabel: { flex: 1, fontSize: 15, color: '#e6e3ce' },
  settingValue: { fontSize: 14, color: '#949277' },
  settingArrow: { fontSize: 20, color: '#494832' },
  logoutBtn: {
    backgroundColor: '#ffb4ab20',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffb4ab'
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#ffb4ab' }
});

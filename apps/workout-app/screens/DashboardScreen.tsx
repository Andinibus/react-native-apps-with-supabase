import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar, WorkoutCard } from '@workout/shared-components';

interface Props {
  onNavigate: (route: string) => void;
}

const WORKOUTS = [
  { id: 'w-001', title: 'Lower Body Strength', durationInMinutes: 45, difficulty: 'Intermediate' as const },
  { id: 'w-002', title: 'Core Stability Circuit', durationInMinutes: 20, difficulty: 'Beginner' as const },
  { id: 'w-003', title: 'Upper Body Push', durationInMinutes: 40, difficulty: 'Advanced' as const }
];

export function DashboardScreen({ onNavigate }: Props) {
  const [greeting, setGreeting] = useState('Guten Tag');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Guten Morgen');
    else if (h < 18) setGreeting('Guten Tag');
    else setGreeting('Guten Abend');
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting} 👋</Text>
          <Text style={styles.name}>Athlet</Text>
        </View>
        <Pressable onPress={() => onNavigate('/community')} style={styles.communityBtn}>
          <Text style={styles.communityBtnText}>◈ Community</Text>
        </Pressable>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Diese Woche</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>145</Text>
          <Text style={styles.statLabel}>Min. heute</Text>
        </View>
      </View>

      {/* Weekly Goal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Wochenziel</Text>
        <ProgressBar value={3} max={5} label="3 von 5 Workouts" showPercent />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickRow}>
        <Pressable style={styles.quickBtn} onPress={() => onNavigate('/workout')}>
          <Text style={styles.quickIcon}>◈</Text>
          <Text style={styles.quickLabel}>Training starten</Text>
        </Pressable>
        <Pressable style={styles.quickBtn} onPress={() => onNavigate('/ki-coach')}>
          <Text style={styles.quickIcon}>◉</Text>
          <Text style={styles.quickLabel}>KI-Coach fragen</Text>
        </Pressable>
        <Pressable style={styles.quickBtn} onPress={() => onNavigate('/historie')}>
          <Text style={styles.quickIcon}>◎</Text>
          <Text style={styles.quickLabel}>Historie</Text>
        </Pressable>
      </View>

      {/* Upcoming Workouts */}
      <Text style={styles.sectionTitle}>Empfohlene Workouts</Text>
      <View style={styles.list}>
        {WORKOUTS.map((w) => (
          <WorkoutCard
            key={w.id}
            title={w.title}
            durationInMinutes={w.durationInMinutes}
            difficulty={w.difficulty}
            onPress={() => onNavigate('/workout')}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  content: { padding: 20, gap: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 14, color: '#949277' },
  name: { fontSize: 24, fontWeight: '700', color: '#e6e3ce' },
  communityBtn: {
    backgroundColor: '#212013',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#494832'
  },
  communityBtnText: { fontSize: 13, color: '#cbc8ab', fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  statValue: { fontSize: 28, fontWeight: '700', color: '#ede900' },
  statLabel: { fontSize: 11, color: '#949277', marginTop: 4, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  card: {
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1,
    backgroundColor: '#2b2b1d',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#494832'
  },
  quickIcon: { fontSize: 22, color: '#ede900' },
  quickLabel: { fontSize: 11, color: '#cbc8ab', fontWeight: '600', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#e6e3ce' },
  list: { gap: 12 }
});

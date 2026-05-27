import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface HistoryEntry {
  id: string;
  title: string;
  date: string;
  durationMin: number;
  exercises: number;
  difficulty: string;
}

const HISTORY: HistoryEntry[] = [
  { id: 'h-1', title: 'Lower Body Strength', date: '13.05.2026', durationMin: 48, exercises: 4, difficulty: 'Intermediate' },
  { id: 'h-2', title: 'Core Stability Circuit', date: '11.05.2026', durationMin: 22, exercises: 5, difficulty: 'Beginner' },
  { id: 'h-3', title: 'Upper Body Push', date: '09.05.2026', durationMin: 55, exercises: 6, difficulty: 'Advanced' },
  { id: 'h-4', title: 'Full Body HIIT', date: '07.05.2026', durationMin: 30, exercises: 8, difficulty: 'Intermediate' },
  { id: 'h-5', title: 'Mobility & Stretch', date: '05.05.2026', durationMin: 18, exercises: 7, difficulty: 'Beginner' }
];

const diffColor: Record<string, string> = {
  Beginner: '#99f1f3',
  Intermediate: '#a4c9ff',
  Advanced: '#ffb4ab'
};

export function HistorieScreen() {
  const totalMin = HISTORY.reduce((s, h) => s + h.durationMin, 0);
  const totalEx = HISTORY.reduce((s, h) => s + h.exercises, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Verlauf</Text>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{HISTORY.length}</Text>
          <Text style={styles.summaryLabel}>Workouts</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalMin}</Text>
          <Text style={styles.summaryLabel}>Minuten</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalEx}</Text>
          <Text style={styles.summaryLabel}>Übungen</Text>
        </View>
      </View>

      {/* Entries */}
      <Text style={styles.sectionTitle}>Vergangene Workouts</Text>
      <View style={styles.list}>
        {HISTORY.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryLeft}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>{entry.date.split('.')[0]}</Text>
                <Text style={styles.dateMonth}>
                  {['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][parseInt(entry.date.split('.')[1]) - 1]}
                </Text>
              </View>
            </View>
            <View style={styles.entryBody}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <View style={styles.entryMeta}>
                <Text style={styles.metaText}>{entry.durationMin} min</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{entry.exercises} Übungen</Text>
              </View>
            </View>
            <View style={[styles.diffBadge, { backgroundColor: (diffColor[entry.difficulty] ?? '#949277') + '26' }]}>
              <Text style={[styles.diffText, { color: diffColor[entry.difficulty] ?? '#949277' }]}>
                {entry.difficulty}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  content: { padding: 20, gap: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#e6e3ce' },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: {
    flex: 1,
    backgroundColor: '#212013',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  summaryValue: { fontSize: 26, fontWeight: '700', color: '#ede900' },
  summaryLabel: { fontSize: 11, color: '#949277', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#e6e3ce' },
  list: { gap: 10 },
  entryCard: {
    backgroundColor: '#212013',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  entryLeft: {},
  dateBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#2b2b1d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  dateDay: { fontSize: 18, fontWeight: '700', color: '#ede900', lineHeight: 20 },
  dateMonth: { fontSize: 10, color: '#949277', fontWeight: '700', textTransform: 'uppercase' },
  entryBody: { flex: 1, gap: 4 },
  entryTitle: { fontSize: 15, fontWeight: '700', color: '#e6e3ce' },
  entryMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: '#949277' },
  metaDot: { fontSize: 12, color: '#494832' },
  diffBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  diffText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 }
});

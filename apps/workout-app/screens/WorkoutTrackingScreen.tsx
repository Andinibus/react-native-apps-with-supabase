import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ExerciseCard } from '@workout/shared-components';
import type { Exercise } from '@workout/shared-types';

interface Props {
  onNavigate: (route: string) => void;
}

const EXERCISES: Exercise[] = [
  { id: 'ex-1', name: 'Kniebeugen', muscleGroup: 'Legs', sets: 4, reps: 10, restInSeconds: 90 },
  { id: 'ex-2', name: 'Kreuzheben', muscleGroup: 'Back', sets: 3, reps: 8, restInSeconds: 120 },
  { id: 'ex-3', name: 'Beinpresse', muscleGroup: 'Legs', sets: 3, reps: 12, restInSeconds: 60 },
  { id: 'ex-4', name: 'Wadenheben', muscleGroup: 'Legs', sets: 4, reps: 15, restInSeconds: 45 }
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function WorkoutTrackingScreen({ onNavigate }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function toggleSet(key: string) {
    setCompletedSets((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const totalSets = EXERCISES.reduce((sum, ex) => sum + ex.sets, 0);
  const progress = Math.round((completedSets.size / totalSets) * 100);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => onNavigate('/dashboard')} style={styles.backBtn}>
          <Text style={styles.backText}>← Zurück</Text>
        </Pressable>
        <Text style={styles.workoutName}>Lower Body Strength</Text>
      </View>

      {/* Timer */}
      <View style={styles.timerCard}>
        <Text style={styles.timerLabel}>Trainingszeit</Text>
        <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        <View style={styles.timerActions}>
          <Pressable onPress={() => setRunning(!running)} style={styles.timerBtn}>
            <Text style={styles.timerBtnText}>{running ? '⏸ Pause' : '▶ Weiter'}</Text>
          </Pressable>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{completedSets.size}/{totalSets} Sets</Text>
        </View>
      </View>

      {/* Exercises */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Text style={styles.sectionTitle}>Übungen</Text>
        {EXERCISES.map((ex, i) => (
          <View key={ex.id} style={styles.exerciseBlock}>
            <ExerciseCard exercise={ex} index={i} />
            <View style={styles.setsRow}>
              {Array.from({ length: ex.sets }).map((_, si) => {
                const key = `${ex.id}-${si}`;
                const done = completedSets.has(key);
                return (
                  <Pressable key={si} onPress={() => toggleSet(key)} style={[styles.setChip, done && styles.setChipDone]}>
                    <Text style={[styles.setChipText, done && styles.setChipTextDone]}>
                      {done ? '✓' : `Set ${si + 1}`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Finish Button */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.finishBtn, progress < 100 && styles.finishBtnDisabled]}
          onPress={() => onNavigate('/historie')}
        >
          <Text style={styles.finishBtnText}>
            {progress === 100 ? 'Workout abschliessen ✓' : `Noch ${totalSets - completedSets.size} Sets offen`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  header: { padding: 20, paddingTop: 16, gap: 4 },
  backBtn: { alignSelf: 'flex-start' },
  backText: { fontSize: 14, color: '#949277' },
  workoutName: { fontSize: 22, fontWeight: '700', color: '#e6e3ce' },
  timerCard: {
    margin: 16,
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  timerLabel: { fontSize: 11, color: '#949277', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  timer: { fontSize: 52, fontWeight: '700', color: '#ede900', letterSpacing: -1 },
  timerActions: { flexDirection: 'row' },
  timerBtn: {
    backgroundColor: '#2b2b1d',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#494832'
  },
  timerBtnText: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressTrack: { flex: 1, height: 6, backgroundColor: '#494832', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#ede900', borderRadius: 999 },
  progressText: { fontSize: 12, color: '#949277', fontWeight: '600', minWidth: 60 },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 12, paddingBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#e6e3ce' },
  exerciseBlock: { gap: 10 },
  setsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingLeft: 4 },
  setChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#494832',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#2b2b1d'
  },
  setChipDone: { backgroundColor: '#ede90026', borderColor: '#ede900' },
  setChipText: { fontSize: 13, color: '#949277', fontWeight: '600' },
  setChipTextDone: { color: '#ede900' },
  footer: { padding: 16 },
  finishBtn: { backgroundColor: '#ede900', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  finishBtnDisabled: { backgroundColor: '#2b2b1d', borderWidth: 1, borderColor: '#494832' },
  finishBtnText: { fontSize: 16, fontWeight: '700', color: '#1d1d00' }
});

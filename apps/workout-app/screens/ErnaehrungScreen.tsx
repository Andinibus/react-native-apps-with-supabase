import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@workout/shared-components';

interface Meal {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

const MEALS: Meal[] = [
  { id: 'm-1', name: 'Haferflocken mit Beeren', kcal: 380, protein: 12, carbs: 58, fat: 8, time: '08:00' },
  { id: 'm-2', name: 'Hähnchenbrust & Reis', kcal: 520, protein: 48, carbs: 52, fat: 9, time: '12:30' },
  { id: 'm-3', name: 'Proteinshake', kcal: 150, protein: 30, carbs: 6, fat: 2, time: '15:00' }
];

const GOAL = { kcal: 2200, protein: 160, carbs: 220, fat: 70 };

const MacroRing = ({ value, max, color, label, unit }: { value: number; max: number; color: string; label: string; unit: string }) => {
  const pct = Math.min(value / max, 1);
  const size = 80;
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <View style={macroStyles.ring}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'flex' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2b2b1d" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <View style={macroStyles.ringCenter}>
        <Text style={[macroStyles.ringValue, { color }]}>{value}</Text>
        <Text style={macroStyles.ringUnit}>{unit}</Text>
      </View>
      <Text style={macroStyles.ringLabel}>{label}</Text>
    </View>
  );
};

const macroStyles = StyleSheet.create({
  ring: { alignItems: 'center', gap: 4 },
  ringCenter: { position: 'absolute', top: 22, alignItems: 'center' },
  ringValue: { fontSize: 16, fontWeight: '700' },
  ringUnit: { fontSize: 9, color: '#949277', fontWeight: '700' },
  ringLabel: { fontSize: 11, color: '#949277', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 }
});

export function ErnaehrungScreen() {
  const [meals] = useState<Meal[]>(MEALS);

  const totals = meals.reduce(
    (acc, m) => ({ kcal: acc.kcal + m.kcal, protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Ernährung</Text>
      <Text style={styles.pageDate}>Heute, 13. Mai 2026</Text>

      {/* Kalorienkarte */}
      <View style={styles.kcalCard}>
        <View style={styles.kcalHeader}>
          <Text style={styles.kcalLabel}>Kalorien</Text>
          <Text style={styles.kcalGoal}>Ziel: {GOAL.kcal} kcal</Text>
        </View>
        <Text style={styles.kcalValue}>{totals.kcal} <Text style={styles.kcalUnit}>kcal</Text></Text>
        <ProgressBar value={totals.kcal} max={GOAL.kcal} showPercent />
        <Text style={styles.kcalRemain}>{Math.max(0, GOAL.kcal - totals.kcal)} kcal verbleibend</Text>
      </View>

      {/* Makros */}
      <View style={styles.macrosCard}>
        <Text style={styles.cardTitle}>Makronährstoffe</Text>
        <View style={styles.macrosRow}>
          <MacroRing value={totals.protein} max={GOAL.protein} color="#a4c9ff" label="Protein" unit="g" />
          <MacroRing value={totals.carbs} max={GOAL.carbs} color="#ede900" label="Kohlenhydrate" unit="g" />
          <MacroRing value={totals.fat} max={GOAL.fat} color="#ffb4ab" label="Fett" unit="g" />
        </View>
      </View>

      {/* Mahlzeiten */}
      <View style={styles.mealsHeader}>
        <Text style={styles.sectionTitle}>Mahlzeiten</Text>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Hinzufügen</Text>
        </Pressable>
      </View>

      <View style={styles.mealList}>
        {meals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealLeft}>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            <View style={styles.mealBody}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <View style={styles.mealMacros}>
                <Text style={styles.mealMacroText}>{meal.kcal} kcal</Text>
                <Text style={styles.mealMacroSep}>·</Text>
                <Text style={styles.mealMacroText}>P {meal.protein}g</Text>
                <Text style={styles.mealMacroSep}>·</Text>
                <Text style={styles.mealMacroText}>K {meal.carbs}g</Text>
                <Text style={styles.mealMacroSep}>·</Text>
                <Text style={styles.mealMacroText}>F {meal.fat}g</Text>
              </View>
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
  pageDate: { fontSize: 14, color: '#949277', marginTop: -12 },
  kcalCard: {
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  kcalHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  kcalLabel: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  kcalGoal: { fontSize: 12, color: '#949277' },
  kcalValue: { fontSize: 40, fontWeight: '700', color: '#ede900' },
  kcalUnit: { fontSize: 18, color: '#949277', fontWeight: '400' },
  kcalRemain: { fontSize: 13, color: '#949277' },
  macrosCard: {
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#494832'
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  macrosRow: { flexDirection: 'row', justifyContent: 'space-around' },
  mealsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#e6e3ce' },
  addBtn: {
    backgroundColor: '#ede90020',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ede900'
  },
  addBtnText: { fontSize: 13, fontWeight: '700', color: '#ede900' },
  mealList: { gap: 10 },
  mealCard: {
    backgroundColor: '#212013',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  mealLeft: { justifyContent: 'center' },
  mealTime: { fontSize: 13, fontWeight: '700', color: '#949277', minWidth: 40 },
  mealBody: { flex: 1, gap: 4 },
  mealName: { fontSize: 15, fontWeight: '700', color: '#e6e3ce' },
  mealMacros: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  mealMacroText: { fontSize: 12, color: '#949277' },
  mealMacroSep: { fontSize: 12, color: '#494832' }
});

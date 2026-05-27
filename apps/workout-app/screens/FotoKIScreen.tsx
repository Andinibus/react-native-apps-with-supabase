import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@workout/shared-components';

interface AnalysisResult {
  bodyFat: number;
  muscleMass: number;
  bmi: number;
  score: number;
  feedback: string[];
}

const MOCK_RESULT: AnalysisResult = {
  bodyFat: 18,
  muscleMass: 42,
  bmi: 23.4,
  score: 78,
  feedback: [
    'Gute Muskeldefinition im Schulterbereich erkennbar',
    'Rumpfmuskulatur könnte gezielter trainiert werden',
    'Körperfettanteil liegt im gesunden Bereich',
    'Empfehlung: 2x pro Woche Core-Training hinzufügen'
  ]
};

export function FotoKIScreen() {
  const [phase, setPhase] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  function startAnalysis() {
    setPhase('analyzing');
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setPhase('result');
    }, 2500);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Foto-KI Analyse</Text>
      <Text style={styles.pageSubtitle}>Lade ein Foto hoch und erhalte eine KI-Analyse deines Körpers</Text>

      {/* Upload Area */}
      <Pressable
        style={[styles.uploadArea, phase === 'analyzing' && styles.uploadAreaAnalyzing]}
        onPress={phase === 'idle' ? startAnalysis : undefined}
      >
        {phase === 'idle' && (
          <>
            <Text style={styles.uploadIcon}>◈</Text>
            <Text style={styles.uploadTitle}>Foto hochladen</Text>
            <Text style={styles.uploadHint}>Kamera öffnen oder aus Galerie wählen</Text>
            <View style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Analyse starten (Demo)</Text>
            </View>
          </>
        )}
        {phase === 'analyzing' && (
          <>
            <Text style={styles.uploadIcon}>◉</Text>
            <Text style={styles.uploadTitle}>KI analysiert...</Text>
            <Text style={styles.uploadHint}>Körperkomposition wird berechnet</Text>
            <ProgressBar value={65} max={100} label="Analyse läuft" showPercent />
          </>
        )}
        {phase === 'result' && result && (
          <Text style={styles.uploadTitle}>Analyse abgeschlossen ✓</Text>
        )}
      </Pressable>

      {/* Result */}
      {phase === 'result' && result && (
        <>
          {/* Score */}
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Fitnessscore</Text>
            <Text style={styles.scoreValue}>{result.score}<Text style={styles.scoreMax}>/100</Text></Text>
            <ProgressBar value={result.score} max={100} showPercent />
            <Text style={styles.scoreComment}>Sehr gut — du bist auf einem tollen Weg!</Text>
          </View>

          {/* Metriken */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{result.bodyFat}%</Text>
              <Text style={styles.metricLabel}>Körperfett</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{result.muscleMass}kg</Text>
              <Text style={styles.metricLabel}>Muskelmasse</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{result.bmi}</Text>
              <Text style={styles.metricLabel}>BMI</Text>
            </View>
          </View>

          {/* Feedback */}
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>KI-Empfehlungen</Text>
            <View style={styles.feedbackList}>
              {result.feedback.map((f, i) => (
                <View key={i} style={styles.feedbackItem}>
                  <Text style={styles.feedbackBullet}>◆</Text>
                  <Text style={styles.feedbackText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable style={styles.resetBtn} onPress={() => { setPhase('idle'); setResult(null); }}>
            <Text style={styles.resetBtnText}>Neue Analyse starten</Text>
          </Pressable>
        </>
      )}

      {/* Datenschutz Hinweis */}
      <View style={styles.privacyNote}>
        <Text style={styles.privacyText}>◎ Fotos werden lokal analysiert und nicht gespeichert. Deine Daten bleiben privat.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  content: { padding: 20, gap: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#e6e3ce' },
  pageSubtitle: { fontSize: 14, color: '#949277', lineHeight: 20, marginTop: -12 },
  uploadArea: {
    backgroundColor: '#212013',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#494832',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    gap: 12
  },
  uploadAreaAnalyzing: { borderColor: '#ede900' },
  uploadIcon: { fontSize: 48, color: '#ede900' },
  uploadTitle: { fontSize: 20, fontWeight: '700', color: '#e6e3ce' },
  uploadHint: { fontSize: 14, color: '#949277', textAlign: 'center' },
  uploadBtn: {
    backgroundColor: '#ede900',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8
  },
  uploadBtnText: { fontSize: 15, fontWeight: '700', color: '#1d1d00' },
  scoreCard: {
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#ede900'
  },
  scoreLabel: { fontSize: 12, color: '#949277', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  scoreValue: { fontSize: 52, fontWeight: '700', color: '#ede900' },
  scoreMax: { fontSize: 20, color: '#949277', fontWeight: '400' },
  scoreComment: { fontSize: 14, color: '#99f1f3' },
  metricsGrid: { flexDirection: 'row', gap: 12 },
  metricCard: {
    flex: 1,
    backgroundColor: '#212013',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  metricValue: { fontSize: 24, fontWeight: '700', color: '#a4c9ff' },
  metricLabel: { fontSize: 11, color: '#949277', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  feedbackCard: {
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: '#494832'
  },
  feedbackTitle: { fontSize: 16, fontWeight: '700', color: '#e6e3ce' },
  feedbackList: { gap: 10 },
  feedbackItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  feedbackBullet: { fontSize: 10, color: '#ede900', marginTop: 4 },
  feedbackText: { flex: 1, fontSize: 14, color: '#cbc8ab', lineHeight: 20 },
  resetBtn: {
    backgroundColor: '#2b2b1d',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#494832'
  },
  resetBtnText: { fontSize: 15, fontWeight: '700', color: '#e6e3ce' },
  privacyNote: {
    backgroundColor: '#1d1c10',
    borderRadius: 12,
    padding: 14
  },
  privacyText: { fontSize: 12, color: '#949277', lineHeight: 18 }
});

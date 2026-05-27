import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  onFinish: () => void;
}

const STEPS = [
  {
    icon: '◈',
    title: 'Dein persönlicher Trainingsplan',
    description: 'Erstelle individuelle Workout-Pläne oder wähle aus unserer Bibliothek. Passe Schwierigkeit, Dauer und Muskelgruppen an deine Ziele an.'
  },
  {
    icon: '◉',
    title: 'KI-Coach an deiner Seite',
    description: 'Dein persönlicher KI-Coach analysiert deinen Fortschritt, gibt Echtzeit-Feedback und passt dein Programm automatisch an.'
  },
  {
    icon: '◆',
    title: 'Ernährung & Fortschritt',
    description: 'Tracke deine Mahlzeiten, behalte Makros im Blick und sieh wie du Woche für Woche stärker wirst.'
  }
];

export function OnboardingScreen({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.logoArea}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>{current.icon}</Text>
        </View>
        <Text style={styles.appName}>KINETIC</Text>
        <Text style={styles.tagline}>Workout Platform</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>
      </View>

      <View style={styles.dots}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => (isLast ? onFinish() : setStep(step + 1))}
        >
          <Text style={styles.primaryButtonText}>
            {isLast ? 'Los geht\'s' : 'Weiter'}
          </Text>
        </Pressable>

        {!isLast && (
          <Pressable onPress={onFinish} style={styles.skipButton}>
            <Text style={styles.skipText}>Überspringen</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141408',
    padding: 32,
    paddingTop: 80,
    gap: 40,
    justifyContent: 'center'
  },
  logoArea: {
    alignItems: 'center',
    gap: 12
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ede90026',
    borderWidth: 2,
    borderColor: '#ede90060',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoIcon: {
    fontSize: 40,
    color: '#ede900'
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ede900',
    letterSpacing: 6
  },
  tagline: {
    fontSize: 14,
    color: '#949277',
    letterSpacing: 2
  },
  content: {
    gap: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e6e3ce',
    textAlign: 'center',
    lineHeight: 30
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cbc8ab',
    textAlign: 'center'
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#494832'
  },
  dotActive: {
    backgroundColor: '#ede900',
    width: 24
  },
  actions: {
    gap: 12
  },
  primaryButton: {
    backgroundColor: '#ede900',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center'
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d00'
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12
  },
  skipText: {
    fontSize: 14,
    color: '#949277'
  }
});

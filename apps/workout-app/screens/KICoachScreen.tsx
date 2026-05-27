import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface Message {
  id: string;
  role: 'user' | 'coach';
  text: string;
}

const SUGGESTIONS = [
  'Wie viel Protein brauche ich täglich?',
  'Was soll ich nach dem Training essen?',
  'Wie verbessere ich meine Kniebeugen-Technik?',
  'Wie oft sollte ich trainieren?'
];

const INITIAL: Message[] = [
  {
    id: '0',
    role: 'coach',
    text: 'Hallo! Ich bin dein KI-Coach. Ich helfe dir bei Trainingsplanung, Ernährung und Technik. Was möchtest du wissen?'
  }
];

const RESPONSES: Record<string, string> = {
  protein: 'Als Kraftsportler brauchst du ca. 1,6–2,2g Protein pro kg Körpergewicht täglich. Bei 80kg also 128–176g. Gute Quellen: Hähnchen, Eier, Hüttenkäse, Linsen.',
  training: 'Für Anfänger empfehle ich 3x pro Woche. Fortgeschrittene können auf 4–5x steigern. Wichtig: mindestens 1 Ruhetag zwischen zwei Einheiten für dieselbe Muskelgruppe.',
  kniebeugen: 'Achte auf: Füße schulterbreit, Knie über den Zehen, Rücken gerade, Blick geradeaus. Senke dich langsam (2–3 Sek.) und drücke explosiv hoch.',
  essen: 'Nach dem Training: Protein + Kohlenhydrate innerhalb von 30–60 min. Beispiel: Hähnchen mit Reis oder Proteinshake mit Banane. Das fördert die Regeneration optimal.'
};

function getResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('protein') || t.includes('eiwei')) return RESPONSES.protein;
  if (t.includes('oft') || t.includes('häufig') || t.includes('training')) return RESPONSES.training;
  if (t.includes('kniebeuge') || t.includes('squat') || t.includes('technik')) return RESPONSES.kniebeugen;
  if (t.includes('essen') || t.includes('ern') || t.includes('nach')) return RESPONSES.essen;
  return 'Gute Frage! Für eine präzise Antwort empfehle ich dir, diese Frage mit deinem Trainer zu besprechen. Generell gilt: Kontinuität und Regeneration sind der Schlüssel zum Erfolg.';
}

export function KICoachScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
    const coachMsg: Message = { id: (Date.now() + 1).toString(), role: 'coach', text: getResponse(trimmed) };

    setMessages((prev) => [...prev, userMsg, coachMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <View style={styles.coachAvatar}>
          <Text style={styles.coachAvatarText}>◉</Text>
        </View>
        <View>
          <Text style={styles.coachName}>KI-Coach</Text>
          <Text style={styles.coachStatus}>● Online</Text>
        </View>
      </View>

      <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={styles.messagesContent}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.bubble, msg.role === 'user' ? styles.bubbleUser : styles.bubbleCoach]}>
            <Text style={[styles.bubbleText, msg.role === 'user' ? styles.bubbleTextUser : styles.bubbleTextCoach]}>
              {msg.text}
            </Text>
          </View>
        ))}

        {/* Suggestions */}
        {messages.length <= 1 && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestLabel}>Häufige Fragen</Text>
            {SUGGESTIONS.map((s, i) => (
              <Pressable key={i} onPress={() => send(s)} style={styles.suggestion}>
                <Text style={styles.suggestionText}>{s}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Frage stellen..."
          placeholderTextColor="#494832"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
          multiline
        />
        <Pressable onPress={() => send(input)} style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}>
          <Text style={styles.sendBtnText}>→</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#1d1c10',
    borderBottomWidth: 1,
    borderBottomColor: '#494832'
  },
  coachAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ede90026',
    borderWidth: 1,
    borderColor: '#ede900',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coachAvatarText: { fontSize: 20, color: '#ede900' },
  coachName: { fontSize: 16, fontWeight: '700', color: '#e6e3ce' },
  coachStatus: { fontSize: 12, color: '#99f1f3' },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12, paddingBottom: 8 },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12 },
  bubbleUser: { backgroundColor: '#ede900', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleCoach: { backgroundColor: '#212013', alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#494832' },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: '#1d1d00', fontWeight: '600' },
  bubbleTextCoach: { color: '#e6e3ce' },
  suggestions: { gap: 8, marginTop: 8 },
  suggestLabel: { fontSize: 12, color: '#949277', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  suggestion: {
    backgroundColor: '#212013',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  suggestionText: { fontSize: 14, color: '#cbc8ab' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 12,
    backgroundColor: '#1d1c10',
    borderTopWidth: 1,
    borderTopColor: '#494832'
  },
  input: {
    flex: 1,
    backgroundColor: '#212013',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#e6e3ce',
    borderWidth: 1,
    borderColor: '#494832',
    maxHeight: 100
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ede900',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendBtnDisabled: { backgroundColor: '#2b2b1d', borderWidth: 1, borderColor: '#494832' },
  sendBtnText: { fontSize: 18, color: '#1d1d00', fontWeight: '700' }
});

import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { AdminModerationScreen } from './screens/AdminModerationScreen';

type AdminRoute = '/moderation' | '/health';

export default function App() {
  const [route, setRoute] = useState<AdminRoute>('/moderation');
  const [healthStatus, setHealthStatus] = useState<'idle' | 'loading' | 'healthy' | 'unhealthy'>('idle');
  const [healthMessage, setHealthMessage] = useState('Noch kein Check ausgefuehrt.');

  const healthEndpoint = process.env.EXPO_PUBLIC_SUPABASE_URL
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/client-connection-check`
    : null;

  async function runHealthCheck() {
    if (!healthEndpoint) {
      setHealthStatus('unhealthy');
      setHealthMessage('EXPO_PUBLIC_SUPABASE_URL fehlt.');
      return;
    }
    try {
      setHealthStatus('loading');
      setHealthMessage('Verbindung wird geprueft...');
      const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
      const response = await fetch(healthEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`
        }
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      if (!response.ok || !payload.ok) {
        setHealthStatus('unhealthy');
        setHealthMessage(payload.error ?? 'Health-Check fehlgeschlagen.');
        return;
      }
      setHealthStatus('healthy');
      setHealthMessage(payload.message ?? 'Verbindung ist gesund.');
    } catch {
      setHealthStatus('unhealthy');
      setHealthMessage('Verbindung konnte nicht hergestellt werden.');
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.appName}>KINETIC <Text style={styles.appNameSub}>Admin</Text></Text>
        <View style={styles.navTabs}>
          <Pressable
            onPress={() => setRoute('/moderation')}
            style={[styles.navTab, route === '/moderation' && styles.navTabActive]}
          >
            <Text style={[styles.navTabText, route === '/moderation' && styles.navTabTextActive]}>
              Moderation
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setRoute('/health')}
            style={[styles.navTab, route === '/health' && styles.navTabActive]}
          >
            <Text style={[styles.navTabText, route === '/health' && styles.navTabTextActive]}>
              Health
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {route === '/moderation' && <AdminModerationScreen />}

        {route === '/health' && (
          <View style={styles.healthCard}>
            <Text style={styles.healthTitle}>System Health</Text>
            <Text style={styles.healthSubtitle}>Supabase Edge Function Verbindungstest</Text>

            <View style={styles.endpointRow}>
              <Text style={styles.fieldLabel}>ENDPOINT</Text>
              <Text style={styles.endpointText}>{healthEndpoint ?? 'Nicht konfiguriert'}</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.fieldLabel}>STATUS</Text>
              <View style={[
                styles.statusPill,
                healthStatus === 'healthy' && styles.statusHealthy,
                healthStatus === 'unhealthy' && styles.statusUnhealthy,
                healthStatus === 'loading' && styles.statusLoading
              ]}>
                <Text style={styles.statusText}>{healthStatus.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.healthMessage}>{healthMessage}</Text>

            <Pressable onPress={runHealthCheck} style={styles.checkBtn}>
              <Text style={styles.checkBtnText}>Health-Check ausfuehren</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#141408' },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1d1c10',
    borderBottomWidth: 1,
    borderBottomColor: '#494832'
  },
  appName: { fontSize: 18, fontWeight: '700', color: '#ede900', letterSpacing: 2 },
  appNameSub: { color: '#a4c9ff', fontWeight: '400', letterSpacing: 1 },
  navTabs: { flexDirection: 'row', gap: 4 },
  navTab: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#2b2b1d', borderWidth: 1, borderColor: '#494832' },
  navTabActive: { backgroundColor: '#ede900', borderColor: '#ede900' },
  navTabText: { fontSize: 13, fontWeight: '600', color: '#949277' },
  navTabTextActive: { color: '#1d1d00' },
  content: { flex: 1 },
  healthCard: {
    margin: 20,
    backgroundColor: '#212013',
    borderRadius: 20,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#494832'
  },
  healthTitle: { fontSize: 22, fontWeight: '700', color: '#e6e3ce' },
  healthSubtitle: { fontSize: 14, color: '#949277', marginTop: -8 },
  endpointRow: { gap: 6 },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#949277', textTransform: 'uppercase', letterSpacing: 0.5 },
  endpointText: { fontSize: 13, color: '#cbc8ab' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusPill: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6, backgroundColor: '#2b2b1d', borderWidth: 1, borderColor: '#494832' },
  statusHealthy: { backgroundColor: '#99f1f320', borderColor: '#99f1f3' },
  statusUnhealthy: { backgroundColor: '#ffb4ab20', borderColor: '#ffb4ab' },
  statusLoading: { backgroundColor: '#ede90020', borderColor: '#ede900' },
  statusText: { fontSize: 12, fontWeight: '700', color: '#e6e3ce' },
  healthMessage: { fontSize: 14, color: '#cbc8ab' },
  checkBtn: { backgroundColor: '#ede900', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  checkBtnText: { fontSize: 15, fontWeight: '700', color: '#1d1d00' }
});

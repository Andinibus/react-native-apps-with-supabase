import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ReportedUser {
  id: string;
  name: string;
  email: string;
  reports: number;
  reason: string;
  status: 'active' | 'warned' | 'banned';
  joined: string;
}

interface ReportedPost {
  id: string;
  author: string;
  content: string;
  reports: number;
  reason: string;
}

const USERS: ReportedUser[] = [
  { id: 'u-1', name: 'Max Müller', email: 'max@example.com', reports: 3, reason: 'Spam', status: 'warned', joined: '12.03.2026' },
  { id: 'u-2', name: 'Jana Koch', email: 'jana@example.com', reports: 1, reason: 'Belästigung', status: 'active', joined: '05.04.2026' },
  { id: 'u-3', name: 'Test User', email: 'test@test.com', reports: 7, reason: 'Fake-Account', status: 'banned', joined: '01.05.2026' }
];

const POSTS: ReportedPost[] = [
  { id: 'rp-1', author: 'Max Müller', content: 'Kauft mein Supplement-Produkt JETZT für nur 99€...', reports: 5, reason: 'Werbung/Spam' },
  { id: 'rp-2', author: 'Anonym', content: 'Diese App ist nutzlos, alles fake...', reports: 2, reason: 'Unangemessener Inhalt' }
];

const statusColor: Record<string, string> = {
  active: '#99f1f3',
  warned: '#ede900',
  banned: '#ffb4ab'
};

const statusLabel: Record<string, string> = {
  active: 'Aktiv',
  warned: 'Verwarnt',
  banned: 'Gesperrt'
};

export function AdminModerationScreen() {
  const [users, setUsers] = useState<ReportedUser[]>(USERS);
  const [posts, setPosts] = useState<ReportedPost[]>(POSTS);
  const [tab, setTab] = useState<'users' | 'posts' | 'stats'>('users');

  function warnUser(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: 'warned' } : u));
  }

  function banUser(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: 'banned' } : u));
  }

  function unbanUser(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: 'active' } : u));
  }

  function removePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <View style={styles.screen}>
      {/* Admin Header */}
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminTitle}>Admin Panel</Text>
          <Text style={styles.adminSubtitle}>Moderation & Verwaltung</Text>
        </View>
        <View style={styles.adminBadge}>
          <Text style={styles.adminBadgeText}>◆ Admin</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['users', 'posts', 'stats'] as const).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'users' ? 'Nutzer' : t === 'posts' ? 'Beiträge' : 'Statistik'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Users Tab */}
        {tab === 'users' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gemeldete Nutzer ({users.length})</Text>
            {users.map((user) => (
              <View key={user.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{user.name.slice(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userMeta}>Dabei seit {user.joined}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: (statusColor[user.status] ?? '#949277') + '20' }]}>
                    <Text style={[styles.statusText, { color: statusColor[user.status] ?? '#949277' }]}>
                      {statusLabel[user.status]}
                    </Text>
                  </View>
                </View>

                <View style={styles.reportInfo}>
                  <Text style={styles.reportCount}>◆ {user.reports} Meldungen</Text>
                  <Text style={styles.reportReason}>Grund: {user.reason}</Text>
                </View>

                <View style={styles.cardActions}>
                  {user.status !== 'warned' && user.status !== 'banned' && (
                    <Pressable onPress={() => warnUser(user.id)} style={styles.warnBtn}>
                      <Text style={styles.warnBtnText}>Verwarnen</Text>
                    </Pressable>
                  )}
                  {user.status !== 'banned' && (
                    <Pressable onPress={() => banUser(user.id)} style={styles.banBtn}>
                      <Text style={styles.banBtnText}>Sperren</Text>
                    </Pressable>
                  )}
                  {user.status === 'banned' && (
                    <Pressable onPress={() => unbanUser(user.id)} style={styles.unbanBtn}>
                      <Text style={styles.unbanBtnText}>Entsperren</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Posts Tab */}
        {tab === 'posts' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gemeldete Beiträge ({posts.length})</Text>
            {posts.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>Keine gemeldeten Beiträge ✓</Text>
              </View>
            )}
            {posts.map((post) => (
              <View key={post.id} style={styles.card}>
                <Text style={styles.postAuthorLabel}>{post.author}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportCount}>◆ {post.reports} Meldungen</Text>
                  <Text style={styles.reportReason}>Grund: {post.reason}</Text>
                </View>
                <View style={styles.cardActions}>
                  <Pressable onPress={() => removePost(post.id)} style={styles.banBtn}>
                    <Text style={styles.banBtnText}>Beitrag entfernen</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Stats Tab */}
        {tab === 'stats' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plattform-Statistik</Text>
            <View style={styles.statsGrid}>
              {[
                { label: 'Registrierte Nutzer', value: '1.248' },
                { label: 'Aktiv heute', value: '89' },
                { label: 'Neue diese Woche', value: '34' },
                { label: 'Offene Meldungen', value: String(users.filter((u) => u.status === 'active' && u.reports > 0).length + posts.length) },
                { label: 'Gesperrte Nutzer', value: String(users.filter((u) => u.status === 'banned').length) },
                { label: 'Workouts heute', value: '312' }
              ].map((stat) => (
                <View key={stat.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#494832'
  },
  adminTitle: { fontSize: 24, fontWeight: '700', color: '#e6e3ce' },
  adminSubtitle: { fontSize: 13, color: '#949277' },
  adminBadge: { backgroundColor: '#a4c9ff20', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: '#a4c9ff' },
  adminBadgeText: { fontSize: 13, fontWeight: '700', color: '#a4c9ff' },
  tabs: { flexDirection: 'row', backgroundColor: '#1d1c10', borderBottomWidth: 1, borderBottomColor: '#494832' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#ede900' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#949277' },
  tabTextActive: { color: '#ede900' },
  content: { flex: 1 },
  contentInner: { padding: 16, gap: 16, paddingBottom: 40 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#e6e3ce' },
  card: {
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  userAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#2b2b1d', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#494832' },
  userAvatarText: { fontSize: 14, fontWeight: '700', color: '#cbc8ab' },
  userInfo: { flex: 1, gap: 2 },
  userName: { fontSize: 15, fontWeight: '700', color: '#e6e3ce' },
  userEmail: { fontSize: 12, color: '#949277' },
  userMeta: { fontSize: 12, color: '#494832' },
  statusBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '700' },
  reportInfo: { flexDirection: 'row', gap: 12 },
  reportCount: { fontSize: 13, color: '#ede900', fontWeight: '600' },
  reportReason: { fontSize: 13, color: '#949277' },
  cardActions: { flexDirection: 'row', gap: 10 },
  warnBtn: { backgroundColor: '#ede90020', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#ede900' },
  warnBtnText: { fontSize: 13, fontWeight: '700', color: '#ede900' },
  banBtn: { backgroundColor: '#ffb4ab20', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#ffb4ab' },
  banBtnText: { fontSize: 13, fontWeight: '700', color: '#ffb4ab' },
  unbanBtn: { backgroundColor: '#99f1f320', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#99f1f3' },
  unbanBtnText: { fontSize: 13, fontWeight: '700', color: '#99f1f3' },
  postAuthorLabel: { fontSize: 13, fontWeight: '700', color: '#a4c9ff' },
  postContent: { fontSize: 14, color: '#cbc8ab', lineHeight: 20 },
  emptyCard: { backgroundColor: '#212013', borderRadius: 14, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#494832' },
  emptyText: { fontSize: 15, color: '#99f1f3', fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { width: '47%', backgroundColor: '#212013', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#494832' },
  statValue: { fontSize: 28, fontWeight: '700', color: '#ede900' },
  statLabel: { fontSize: 12, color: '#949277', fontWeight: '600', marginTop: 4 }
});

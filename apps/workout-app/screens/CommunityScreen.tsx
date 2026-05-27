import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Post {
  id: string;
  author: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tag: string;
  liked: boolean;
}

const INITIAL_POSTS: Post[] = [
  { id: 'p-1', author: 'Max M.', initials: 'MM', time: 'vor 12 Min.', content: 'Heute neuen PR im Bankdrücken! 110kg für 3 Wiederholungen. Das Training zahlt sich aus 💪', likes: 24, comments: 5, tag: 'Erfolg', liked: false },
  { id: 'p-2', author: 'Sarah K.', initials: 'SK', time: 'vor 1 Std.', content: 'Hat jemand Tipps für Kniebeugen? Mein unterer Rücken schmerzt immer nach dem Training. Gürtel empfehlenswert?', likes: 8, comments: 12, tag: 'Frage', liked: false },
  { id: 'p-3', author: 'Tom R.', initials: 'TR', time: 'vor 3 Std.', content: 'Woche 4 von meinem 8-Wochen-Plan abgeschlossen! -2kg Körperfett, +3kg Muskelmasse laut Waage. KI-Coach hat wirklich geholfen!', likes: 41, comments: 8, tag: 'Fortschritt', liked: false },
  { id: 'p-4', author: 'Anna B.', initials: 'AB', time: 'vor 5 Std.', content: 'Ernährungs-Tipp des Tages: Haferflocken + Proteinpulver + Banane vor dem Training = perfekter Energieschub ohne Magenprobleme', likes: 33, comments: 4, tag: 'Tipp', liked: true }
];

const tagColor: Record<string, string> = {
  Erfolg: '#99f1f3',
  Frage: '#a4c9ff',
  Fortschritt: '#ede900',
  Tipp: '#ffb4ab'
};

export function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Community</Text>
        <View style={styles.onlineBadge}>
          <Text style={styles.onlineText}>● 142 online</Text>
        </View>
      </View>

      {/* Filter Tags */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <View style={styles.filterRow}>
          {['Alle', 'Erfolg', 'Frage', 'Fortschritt', 'Tipp'].map((tag) => (
            <Pressable key={tag} style={styles.filterChip}>
              <Text style={styles.filterChipText}>{tag}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Create Post */}
      <Pressable style={styles.createPost}>
        <View style={styles.createAvatar}>
          <Text style={styles.createAvatarText}>Du</Text>
        </View>
        <View style={styles.createInput}>
          <Text style={styles.createPlaceholder}>Was möchtest du teilen?</Text>
        </View>
        <Pressable style={styles.createBtn}>
          <Text style={styles.createBtnText}>Posten</Text>
        </Pressable>
      </Pressable>

      {/* Posts */}
      <View style={styles.feed}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarText}>{post.initials}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <View style={[styles.tagBadge, { backgroundColor: (tagColor[post.tag] ?? '#949277') + '20' }]}>
                <Text style={[styles.tagText, { color: tagColor[post.tag] ?? '#949277' }]}>{post.tag}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postActions}>
              <Pressable onPress={() => toggleLike(post.id)} style={styles.actionBtn}>
                <Text style={[styles.actionIcon, post.liked && styles.actionIconLiked]}>
                  {post.liked ? '▲' : '△'}
                </Text>
                <Text style={[styles.actionText, post.liked && styles.actionTextLiked]}>{post.likes}</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionIcon}>◎</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </Pressable>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionIcon}>◈</Text>
                <Text style={styles.actionText}>Teilen</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#141408' },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#e6e3ce' },
  onlineBadge: { backgroundColor: '#99f1f320', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  onlineText: { fontSize: 12, color: '#99f1f3', fontWeight: '600' },
  filterScroll: { marginHorizontal: -16 },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  filterChip: {
    backgroundColor: '#212013',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#494832'
  },
  filterChipText: { fontSize: 13, color: '#cbc8ab', fontWeight: '600' },
  createPost: {
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#494832'
  },
  createAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ede90030', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ede900' },
  createAvatarText: { fontSize: 11, fontWeight: '700', color: '#ede900' },
  createInput: { flex: 1 },
  createPlaceholder: { fontSize: 14, color: '#494832' },
  createBtn: { backgroundColor: '#ede900', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  createBtnText: { fontSize: 13, fontWeight: '700', color: '#1d1d00' },
  feed: { gap: 12 },
  postCard: {
    backgroundColor: '#212013',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#494832'
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  postAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#2b2b1d', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#494832' },
  postAvatarText: { fontSize: 12, fontWeight: '700', color: '#cbc8ab' },
  postMeta: { flex: 1 },
  postAuthor: { fontSize: 14, fontWeight: '700', color: '#e6e3ce' },
  postTime: { fontSize: 12, color: '#949277' },
  tagBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: '700' },
  postContent: { fontSize: 15, color: '#cbc8ab', lineHeight: 22 },
  postActions: { flexDirection: 'row', gap: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: '#2b2b1d' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { fontSize: 16, color: '#949277' },
  actionIconLiked: { color: '#ede900' },
  actionText: { fontSize: 13, color: '#949277', fontWeight: '600' },
  actionTextLiked: { color: '#ede900' }
});

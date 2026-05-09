import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { API } from '../api';

export default function HomeScreen({ user }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchScore = async () => {
    try {
      const res = await API.get(`/hustle/${user.id}`);
      setScore(res.data);
    } catch (e) {
      console.log('Score error:', e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchScore(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScore();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#f5a623" />;

  const b = score?.breakdown;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f5a623" />
      }>
      <Text style={styles.greeting}>Hey {user.name} 👊</Text>
      <Text style={styles.sub}>Pull down to refresh your score</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>HUSTLE SCORE</Text>
        <Text style={styles.scoreNum}>
          {score?.score ?? 0}
          <Text style={styles.scoreMax}>/100</Text>
        </Text>
        <Text style={styles.scoreHint}>Complete tasks & gigs to increase score</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>✅</Text>
          <Text style={styles.cardVal}>{b?.tasks.done}/{b?.tasks.total}</Text>
          <Text style={styles.cardLabel}>Tasks done</Text>
          <Text style={styles.cardPts}>+{b?.tasks.points}pts</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>💼</Text>
          <Text style={styles.cardVal}>{b?.gigs.closed}</Text>
          <Text style={styles.cardLabel}>Gigs closed</Text>
          <Text style={styles.cardPts}>+{b?.gigs.points}pts</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>💰</Text>
          <Text style={styles.cardVal}>Rs.{b?.income.earned ?? 0}</Text>
          <Text style={styles.cardLabel}>Earned</Text>
          <Text style={styles.cardPts}>+{b?.income.points}pts</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🔥</Text>
          <Text style={styles.cardVal}>{b?.streak.days}</Text>
          <Text style={styles.cardLabel}>Day streak</Text>
          <Text style={styles.cardPts}>+{b?.streak.points}pts</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 20 },
  greeting: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  sub: { color: '#555', fontSize: 13, marginBottom: 24 },
  scoreCard: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#f5a623' },
  scoreLabel: { color: '#f5a623', fontSize: 13, letterSpacing: 2, marginBottom: 8 },
  scoreNum: { color: '#fff', fontSize: 64, fontWeight: 'bold' },
  scoreMax: { color: '#555', fontSize: 24 },
  scoreHint: { color: '#444', fontSize: 12, marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16,
    width: '47%', borderWidth: 1, borderColor: '#222' },
  cardIcon: { fontSize: 24, marginBottom: 8 },
  cardVal: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cardLabel: { color: '#555', fontSize: 12, marginTop: 2 },
  cardPts: { color: '#f5a623', fontSize: 11, marginTop: 6 },
});
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, Alert, Modal, RefreshControl, ScrollView } from 'react-native';
import { API } from '../api';

export default function LedgerScreen({ user }) {
  const [entries, setEntries] = useState([]);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const r = await API.get(`/ledger/${user.id}`);
      setEntries(r.data);
    } catch (e) {
      console.log('Ledger load error:', e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, []);

  const addEntry = async () => {
    if (!amount) return Alert.alert('Enter amount');
    try {
      await API.post('/ledger', {
        user_id: user.id,
        type,
        amount: parseFloat(amount),
        note: note || ''
      });
      setModal(false);
      setAmount('');
      setNote('');
      load();
    } catch (error) {
      Alert.alert('Error', 'Could not add entry: ' + error.message);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await API.delete(`/ledger/${id}`);
      load();
    } catch (e) {
      Alert.alert('Error', 'Could not delete entry');
    }
  };

  const income = entries
    .filter(e => e.type === 'income')
    .reduce((a, b) => a + parseFloat(b.amount), 0);

  const expense = entries
    .filter(e => e.type === 'expense')
    .reduce((a, b) => a + parseFloat(b.amount), 0);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <View style={s.container}>
      <Text style={s.heading}>Money Ledger 💰</Text>

      <View style={s.summary}>
        <View style={s.sumCard}>
          <Text style={s.sumLabel}>Income</Text>
          <Text style={[s.sumVal, { color: '#4caf50' }]}>Rs.{income.toFixed(0)}</Text>
        </View>
        <View style={s.sumCard}>
          <Text style={s.sumLabel}>Expense</Text>
          <Text style={[s.sumVal, { color: '#f44336' }]}>Rs.{expense.toFixed(0)}</Text>
        </View>
        <View style={s.sumCard}>
          <Text style={s.sumLabel}>Profit</Text>
          <Text style={[s.sumVal, { color: income - expense >= 0 ? '#f5a623' : '#f44336' }]}>
            Rs.{(income - expense).toFixed(0)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={s.addBtn} onPress={() => setModal(true)}>
        <Text style={s.addBtnText}>+ Add Entry</Text>
      </TouchableOpacity>

      <FlatList
        data={entries}
        keyExtractor={i => i.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f5a623" />}
        renderItem={({ item }) => (
          <View style={s.row}>
            <Text style={s.rowIcon}>{item.type === 'income' ? '📈' : '📉'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.rowNote}>{item.note || item.type}</Text>
              <Text style={s.rowDate}>{formatDate(item.date)}</Text>
            </View>
            <Text style={[s.rowAmt, { color: item.type === 'income' ? '#4caf50' : '#f44336' }]}>
              {item.type === 'income' ? '+' : '-'}Rs.{parseFloat(item.amount).toFixed(0)}
            </Text>
            <TouchableOpacity onPress={() => deleteEntry(item.id)} style={s.delBtn}>
              <Text style={s.delText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={s.empty}>No entries yet. Add your first one!</Text>
        }
      />

      <Modal visible={modal} transparent animationType="slide">
        <View style={s.modalBg}>
          <View style={s.modal}>
            <Text style={s.modalTitle}>Add Entry</Text>
            <View style={s.typeRow}>
              <TouchableOpacity
                style={[s.typeBtn, type === 'income' && s.typeActive]}
                onPress={() => setType('income')}>
                <Text style={s.typeText}>📈 Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.typeBtn, type === 'expense' && s.typeActive]}
                onPress={() => setType('expense')}>
                <Text style={s.typeText}>📉 Expense</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={s.input}
              placeholder="Amount (Rs.) *"
              placeholderTextColor="#555"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={s.input}
              placeholder="Note (optional)"
              placeholderTextColor="#555"
              value={note}
              onChangeText={setNote}
            />
            <TouchableOpacity style={s.btn} onPress={addEntry}>
              <Text style={s.btnText}>Add Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Text style={s.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 16 },
  heading: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10, marginBottom: 16 },
  summary: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  sumCard: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 10,
    padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  sumLabel: { color: '#555', fontSize: 11, marginBottom: 4 },
  sumVal: { fontSize: 15, fontWeight: 'bold' },
  addBtn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 14,
    alignItems: 'center', marginBottom: 16 },
  addBtnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a',
    borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  rowIcon: { fontSize: 20, marginRight: 12 },
  rowNote: { color: '#fff', fontSize: 14, fontWeight: '500' },
  rowDate: { color: '#555', fontSize: 12, marginTop: 2 },
  rowAmt: { fontSize: 15, fontWeight: 'bold', marginRight: 8 },
  delBtn: { padding: 4 },
  delText: { fontSize: 16 },
  empty: { color: '#444', textAlign: 'center', marginTop: 40, fontSize: 14 },
  modalBg: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 24 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  typeBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#111',
    alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  typeActive: { borderColor: '#f5a623', backgroundColor: '#1a1a1a' },
  typeText: { color: '#fff', fontSize: 14 },
  input: { backgroundColor: '#111', color: '#fff', borderRadius: 10, padding: 12,
    marginBottom: 12, fontSize: 14, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  cancel: { color: '#555', textAlign: 'center', marginTop: 14 },
});
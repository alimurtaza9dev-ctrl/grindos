import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, Alert, Modal } from 'react-native';
import { API } from '../api';

export default function GigsScreen({ user }) {
  const [gigs, setGigs] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const load = async () => {
    try {
      const r = await API.get(`/gigs/${user.id}`);
      setGigs(r.data);
    } catch (error) {
      console.log('Load error:', error.message);
    }
  };

  useEffect(() => { load(); }, []);

  const addGig = async () => {
    if (!title) return Alert.alert('Enter gig title');
    
    const payload = {
      user_id: user.id,
      title: title,
      client: client || '',
      amount: amount ? parseFloat(amount) : 0,
      status: 'active',
      deadline: deadline || null
    };

    console.log('Sending payload:', JSON.stringify(payload));
    console.log('User ID:', user.id);

    try {
      const response = await API.post('/gigs', payload);
      console.log('Success response:', JSON.stringify(response.data));
      setModal(false);
      setTitle('');
      setClient('');
      setAmount('');
      setDeadline('');
      load();
    } catch (error) {
      console.log('Full error:', JSON.stringify(error.response?.data));
      console.log('Status:', error.response?.status);
      console.log('Message:', error.message);
      Alert.alert(
        'Error details',
        'Message: ' + error.message + '\n\nResponse: ' + JSON.stringify(error.response?.data) + '\n\nStatus: ' + error.response?.status
      );
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/gigs/${id}`, { status });
      load();
    } catch (error) {
      Alert.alert('Error', 'Could not update gig status.');
    }
  };

  const deleteGig = async (id) => {
    try {
      await API.delete(`/gigs/${id}`);
      load();
    } catch (error) {
      Alert.alert('Error', 'Could not delete gig.');
    }
  };

  const statusColor = { active: '#f5a623', completed: '#4caf50', unpaid: '#f44336' };

  return (
    <View style={s.container}>
      <Text style={s.heading}>My Gigs 💼</Text>
      <Text style={s.sub}>{gigs.length} total gigs</Text>

      <TouchableOpacity style={s.addBtn} onPress={() => setModal(true)}>
        <Text style={s.addBtnText}>+ Add Gig</Text>
      </TouchableOpacity>

      <FlatList
        data={gigs}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.row}>
              <Text style={s.title}>{item.title}</Text>
              <View style={[s.badge, {
                backgroundColor: statusColor[item.status] + '22',
                borderColor: statusColor[item.status]
              }]}>
                <Text style={[s.badgeText, { color: statusColor[item.status] }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={s.meta}>👤 {item.client || 'No client'} · Rs.{item.amount}</Text>
            {item.deadline ? <Text style={s.meta}>📅 {item.deadline}</Text> : null}

            <View style={s.actionRow}>
              {item.status === 'active' &&
                <TouchableOpacity style={s.actionBtn} onPress={() => updateStatus(item.id, 'completed')}>
                  <Text style={s.actionText}>✅ Mark Complete</Text>
                </TouchableOpacity>
              }
              {item.status === 'completed' &&
                <TouchableOpacity style={s.actionBtn} onPress={() => updateStatus(item.id, 'unpaid')}>
                  <Text style={s.actionText}>⚠️ Mark Unpaid</Text>
                </TouchableOpacity>
              }
              {item.status === 'unpaid' &&
                <TouchableOpacity style={s.actionBtn} onPress={() => updateStatus(item.id, 'active')}>
                  <Text style={s.actionText}>🔄 Mark Active</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity style={[s.actionBtn, s.deleteBtn]} onPress={() => deleteGig(item.id)}>
                <Text style={s.actionText}>🗑 Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modal} transparent animationType="slide">
        <View style={s.modalBg}>
          <View style={s.modal}>
            <Text style={s.modalTitle}>New Gig</Text>
            <TextInput
              style={s.input}
              placeholder="Gig title *"
              placeholderTextColor="#555"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={s.input}
              placeholder="Client name (optional)"
              placeholderTextColor="#555"
              value={client}
              onChangeText={setClient}
            />
            <TextInput
              style={s.input}
              placeholder="Amount in Rs. (optional)"
              placeholderTextColor="#555"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={s.input}
              placeholder="Deadline e.g. 2026-05-20 (optional)"
              placeholderTextColor="#555"
              value={deadline}
              onChangeText={setDeadline}
            />
            <TouchableOpacity style={s.btn} onPress={addGig}>
              <Text style={s.btnText}>Add Gig</Text>
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
  heading: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  sub: { color: '#555', fontSize: 13, marginBottom: 16 },
  addBtn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 14,
    alignItems: 'center', marginBottom: 16 },
  addBtnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: '#222' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  meta: { color: '#555', fontSize: 13, marginTop: 6 },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  actionBtn: { padding: 8, backgroundColor: '#222', borderRadius: 8 },
  deleteBtn: { marginLeft: 'auto' },
  actionText: { color: '#fff', fontSize: 13 },
  modalBg: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 24 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#111', color: '#fff', borderRadius: 10, padding: 12,
    marginBottom: 12, fontSize: 14, borderWidth: 1, borderColor: '#333' },
  btn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  cancel: { color: '#555', textAlign: 'center', marginTop: 14 },
});
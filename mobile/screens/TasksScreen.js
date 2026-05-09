import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API } from '../api';

export default function TasksScreen({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const load = () => API.get(`/tasks/${user.id}`).then(r => setTasks(r.data));
  useEffect(() => { load(); }, []);

  const addTask = async () => {
    if (!title.trim()) return Alert.alert('Enter a task');
    await API.post('/tasks', { user_id: user.id, title });
    setTitle(''); load();
  };

  const toggle = async (id, done) => {
    await API.put(`/tasks/${id}`, { is_done: !done });
    load();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    load();
  };

  const done = tasks.filter(t => t.is_done).length;

  return (
    <View style={s.container}>
      <Text style={s.heading}>Daily Grind 🔥</Text>
      <Text style={s.sub}>{done}/{tasks.length} tasks crushed today</Text>

      <View style={s.inputRow}>
        <TextInput style={s.input} placeholder="Add a task..." placeholderTextColor="#555"
          value={title} onChangeText={setTitle} />
        <TouchableOpacity style={s.addBtn} onPress={addTask}>
          <Text style={s.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={tasks} keyExtractor={i => i.id.toString()} renderItem={({ item }) => (
        <TouchableOpacity style={s.task} onPress={() => toggle(item.id, item.is_done)}>
          <Text style={s.check}>{item.is_done ? '✅' : '⬜'}</Text>
          <Text style={[s.taskText, item.is_done && s.done]}>{item.title}</Text>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={s.del}>🗑</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 20 },
  heading: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#f5a623', fontSize: 13, marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  input: { flex: 1, backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10,
    padding: 12, fontSize: 14, borderWidth: 1, borderColor: '#333' },
  addBtn: { backgroundColor: '#f5a623', borderRadius: 10, width: 46, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  task: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a',
    borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  check: { fontSize: 18, marginRight: 12 },
  taskText: { flex: 1, color: '#fff', fontSize: 15 },
  done: { color: '#444', textDecorationLine: 'line-through' },
  del: { fontSize: 18 },
});

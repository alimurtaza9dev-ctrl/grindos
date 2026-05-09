import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API } from '../api';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/users/login', { email, password });
      onLogin(res.data.user);
    } catch {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.logo}>⚡ GrindOS</Text>
      <Text style={s.sub}>Your personal hustle command center</Text>
      <TextInput style={s.input} placeholder="Email" placeholderTextColor="#555"
        value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <TextInput style={s.input} placeholder="Password" placeholderTextColor="#555"
        value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity style={s.btn} onPress={handleLogin}>
        <Text style={s.btnText}>Login →</Text>
      </TouchableOpacity>
      <Text style={s.hint}>Test: test@grindos.com / 1234</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', padding: 28 },
  logo: { fontSize: 36, fontWeight: 'bold', color: '#f5a623', textAlign: 'center', marginBottom: 8 },
  sub: { color: '#555', textAlign: 'center', marginBottom: 40, fontSize: 14 },
  input: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 10, padding: 14,
    marginBottom: 14, fontSize: 15, borderWidth: 1, borderColor: '#222' },
  btn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  hint: { color: '#333', textAlign: 'center', marginTop: 20, fontSize: 12 },
});
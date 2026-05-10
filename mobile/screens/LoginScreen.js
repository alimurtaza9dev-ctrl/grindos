import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { API } from '../api';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSupported(compatible && enrolled);
  };

  const handleLogin = async () => {
    try {
      const res = await API.post('/users/login', { email, password });
      onLogin(res.data.user);
    } catch {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleFingerprint = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '⚡ GrindOS — Verify your identity',
        fallbackLabel: 'Use password instead',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Auto login with default credentials after fingerprint
        try {
          const res = await API.post('/users/login', {
            email: 'test@grindos.com',
            password: '1234'
          });
          onLogin(res.data.user);
        } catch {
          Alert.alert('Error', 'Fingerprint verified but login failed. Try manual login.');
        }
      } else {
        Alert.alert('Failed', 'Fingerprint not recognized. Try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric authentication failed: ' + error.message);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.logo}>⚡ GrindOS</Text>
      <Text style={s.sub}>Your personal hustle command center</Text>

      <TextInput
        style={s.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={s.input}
        placeholder="Password"
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={s.btn} onPress={handleLogin}>
        <Text style={s.btnText}>Login →</Text>
      </TouchableOpacity>

      {isBiometricSupported && (
        <TouchableOpacity style={s.fingerprintBtn} onPress={handleFingerprint}>
          <Text style={s.fingerprintIcon}>👆</Text>
          <Text style={s.fingerprintText}>Login with Fingerprint</Text>
        </TouchableOpacity>
      )}

      {!isBiometricSupported && (
        <Text style={s.noFingerprint}>
          Fingerprint not available on this device
        </Text>
      )}

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
  btn: { backgroundColor: '#f5a623', borderRadius: 10, padding: 16,
    alignItems: 'center', marginTop: 8 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  fingerprintBtn: { marginTop: 20, borderRadius: 10, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#f5a623',
    flexDirection: 'row', justifyContent: 'center', gap: 10 },
  fingerprintIcon: { fontSize: 24 },
  fingerprintText: { color: '#f5a623', fontSize: 15, fontWeight: 'bold' },
  noFingerprint: { color: '#333', textAlign: 'center', marginTop: 20, fontSize: 12 },
  hint: { color: '#333', textAlign: 'center', marginTop: 20, fontSize: 12 },
});
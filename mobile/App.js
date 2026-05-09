import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import GigsScreen from './screens/GigsScreen';
import TasksScreen from './screens/TasksScreen';
import LedgerScreen from './screens/LedgerScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <LoginScreen onLogin={setUser} />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#0f0f0f', borderTopColor: '#222' },
          tabBarActiveTintColor: '#f5a623',
          tabBarInactiveTintColor: '#555',
          headerStyle: { backgroundColor: '#0f0f0f' },
          headerTintColor: '#fff',
        }}>
        <Tab.Screen name="Home" options={{ tabBarIcon: () => <Text>🏠</Text> }}>
          {() => <HomeScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Gigs" options={{ tabBarIcon: () => <Text>💼</Text> }}>
          {() => <GigsScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Tasks" options={{ tabBarIcon: () => <Text>✅</Text> }}>
          {() => <TasksScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Ledger" options={{ tabBarIcon: () => <Text>💰</Text> }}>
          {() => <LedgerScreen user={user} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
} 

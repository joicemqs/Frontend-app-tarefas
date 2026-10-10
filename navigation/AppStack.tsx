import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '../screens/TaskScreen';
import { headerOptions } from './headerOptions';
import { useAuth } from '../context/AuthContext';
import { showConfirm } from '../utils/alert';

const Stack = createNativeStackNavigator();

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <TouchableOpacity
      onPress={() => showConfirm('Sair', 'Deseja sair da sua conta?', 'Sair', logout)}
      style={{ paddingHorizontal: 8 }}
    >
      <Text style={{ color: '#22223B', fontWeight: 'bold' }}>Sair</Text>
    </TouchableOpacity>
  );
}

export default function AppStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={headerOptions}>
      <Stack.Screen
        name="Tasks"
        component={TaskScreen}
        options={{ title: 'Tarefas', headerRight: () => <LogoutButton /> }}
      />
    </Stack.Navigator>
  );
}

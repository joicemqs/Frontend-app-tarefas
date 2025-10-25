import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function TaskScreen() {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Minhas Tarefas</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
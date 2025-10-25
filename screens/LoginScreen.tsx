import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <Button title="Entrar" onPress={login} />
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
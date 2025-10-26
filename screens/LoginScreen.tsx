import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/auth';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      login(); // ativa navegação para tela de tarefas
    } catch (error) {
      Alert.alert('Erro ao entrar', 'Verifique suas credenciais.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

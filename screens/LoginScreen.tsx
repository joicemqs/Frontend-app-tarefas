import React, { useState, useEffect } from 'react';
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

  // Botão de simulação: navega direto para PasswordResetConfirm com uid e token
  const simulateEmailLink = () => {
    // Substitua pelos valores reais que aparecem no terminal
    const uid = 'Mw';
    const token = 'cy96c0-4865b70e69f4f90cd652b4f58e79fef8';
    navigation.navigate('PasswordResetConfirm', { uid, token });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
      <Button title="Esqueci minha senha" onPress={() => navigation.navigate('PasswordReset')} />

      {/* Botão temporário para testar deep link sem sair do app */}
      <View style={{ marginTop: 12 }}>
        <Button
          title="Simular clique no e‑mail (navegar direto)"
          onPress={simulateEmailLink}
        />
      </View>
    </View>
  );
}

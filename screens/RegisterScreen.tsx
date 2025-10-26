import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { registerUser } from '../services/auth';

export default function RegisterScreen({ navigation }) {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(username, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro ao registrar', 'Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Senha</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Registrar" onPress={handleRegister} />
      <Button title="Voltar para Login" onPress={() => navigation.goBack()} />
    </View>
  );
}
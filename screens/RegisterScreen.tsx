import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.titleText}>Nome</Text>
      <TextInput style={styles.TextInput} value={username} onChangeText={setUsername} />

      <Text style={styles.titleText}>Email</Text>
      <TextInput style={styles.TextInput} value={email} onChangeText={setEmail} autoCapitalize="none" />

      <Text style={styles.titleText}>Senha</Text>
      <TextInput style={styles.TextInput} value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.text}>Registrar</Text>
      </TouchableOpacity>

      <View style={{ marginTop: '90%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.text}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    backgroundColor: '#F2E9E4',
  },
  TextInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    height: 45,
    borderColor: '#9A8C98'
  },
  button: {
    height: 45,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#9A8C98',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: '#22223B',
  },
  titleText: {
    color: '#22223B',
  }
});
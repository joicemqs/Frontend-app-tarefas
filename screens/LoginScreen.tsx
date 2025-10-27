import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity,} from 'react-native';
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
    const token = 'cy96u3-959143f2c3ec9cbab5f42f0d23080efc';
    navigation.navigate('PasswordResetConfirm', { uid, token });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>
        <Text style={styles.titleText}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.TextInput}
        />
        <Text style={styles.titleText}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.TextInput}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.text}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
          <Text style={styles.text}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <View>
        

        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')} style={styles.button}>
          <Text style={styles.text}>Esqueci a senha</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={simulateEmailLink} style={styles.button}>
            <Text style={styles.text}>Simular clique no e‑mail (navegar direto)</Text>
          </TouchableOpacity>
        </View>
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
  containerLogin:{
    flexDirection: 'column',
    flex: 1,
    alignContent: 'space-around',
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
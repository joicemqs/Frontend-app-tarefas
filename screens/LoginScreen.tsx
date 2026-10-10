import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/auth';
import { showAlert } from '../utils/alert';
import { getApiErrorMessage } from '../utils/apiError';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      showAlert('Erro ao entrar', 'Preencha o e-mail e a senha.');
      return;
    }

    try {
      await loginUser(email.trim(), password);
      login(); // ativa navegação para tela de tarefas
    } catch (error) {
      showAlert('Erro ao entrar', getApiErrorMessage(error, 'Verifique suas credenciais.'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>
        <Text style={styles.titleText}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
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
        

        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')} style={styles.button2}>
          <Text style={styles.text2}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PasswordResetConfirm')} style={styles.button2}>
          <Text style={styles.text2}>Já tenho o link de redefinição</Text>
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
  button2:{
    height: 45,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#22223B',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: '#22223B',
  },
  text2: {
    textAlign: 'center',
    color: '#F2E9E4',
  },
  titleText: {
    color: '#22223B',
  }

});
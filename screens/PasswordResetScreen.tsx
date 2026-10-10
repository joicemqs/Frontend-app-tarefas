import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { requestPasswordReset } from '../services/auth';
import { showAlert } from '../utils/alert';
import { getApiErrorMessage } from '../utils/apiError';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await requestPasswordReset(email.trim());
      showAlert('Verifique seu e-mail', 'Se existir uma conta com este e-mail, enviaremos o link para redefinir sua senha.');
      navigation.navigate('PasswordResetConfirm');
    } catch (error) {
      showAlert('Erro', getApiErrorMessage(error, 'Não foi possível enviar o e-mail. Verifique o endereço informado.'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Digite seu e-mail para recuperar a senha:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.TextInput}
      />

      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>
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
    marginBottom: 5,
  }
});

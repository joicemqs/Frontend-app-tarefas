import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { confirmPasswordReset } from '../services/auth';
import { showAlert } from '../utils/alert';
import { getApiErrorMessage } from '../utils/apiError';

// Extrai uid e token do link enviado por e-mail (ex.: .../reset-password?uid=Mw&token=abc-123)
function parseResetLink(link: string): { uid: string; token: string } | null {
  const uid = link.match(/[?&]uid=([^&\s]+)/)?.[1];
  const token = link.match(/[?&]token=([^&\s]+)/)?.[1];
  return uid && token ? { uid, token } : null;
}

export default function PasswordResetConfirmScreen({ route, navigation }) {
  // uid e token podem chegar pela navegação; se não, a pessoa cola o link recebido por e-mail
  const [link, setLink] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const fromRoute = route.params?.uid && route.params?.token ? route.params : null;

  const handleConfirm = async () => {
    const params = fromRoute ?? parseResetLink(link);
    if (!params) {
      showAlert('Link inválido', 'Cole o link completo que você recebeu por e-mail.');
      return;
    }

    try {
      await confirmPasswordReset(params.uid, params.token, newPassword);
      showAlert('Senha redefinida', 'Você pode fazer login com sua nova senha.');
      navigation.navigate('Login');
    } catch (error) {
      showAlert('Erro', getApiErrorMessage(error, 'Não foi possível redefinir a senha. Verifique o link ou tente novamente.'));
    }
  };

  return (
    <View style={styles.container}>
      {!fromRoute && (
        <>
          <Text style={styles.titleText}>Cole aqui o link recebido por e-mail:</Text>
          <TextInput
            value={link}
            onChangeText={setLink}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="https://...reset-password?uid=...&token=..."
            style={styles.TextInput}
          />
        </>
      )}

      <Text style={styles.titleText}>Digite sua nova senha:</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.TextInput}
      />

      <TouchableOpacity onPress={handleConfirm} style={styles.button}>
        <Text style={styles.text}>Redefinir senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 20,
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
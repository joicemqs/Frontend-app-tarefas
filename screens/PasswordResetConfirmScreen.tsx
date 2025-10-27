import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { confirmPasswordReset } from '../services/auth';

export default function PasswordResetConfirmScreen({ route, navigation }) {
  const { uid, token } = route.params;
  const [newPassword, setNewPassword] = useState('');

  const handleConfirm = async () => {
    try {
      await confirmPasswordReset(uid, token, newPassword);
      Alert.alert('Senha redefinida', 'Você pode fazer login com sua nova senha.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível redefinir a senha. Verifique o link ou tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
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
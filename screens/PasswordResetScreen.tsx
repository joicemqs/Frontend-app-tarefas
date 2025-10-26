import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { requestPasswordReset } from '../services/auth';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await requestPasswordReset(email);
      Alert.alert('Verifique seu e-mail', 'Enviamos instruções para redefinir sua senha.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o e-mail. Verifique o endereço informado.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Digite seu e-mail para recuperar a senha:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginVertical: 10 }}
      />
      <Button title="Enviar" onPress={handleReset} />
    </View>
  );
}

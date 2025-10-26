import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <Text>Digite sua nova senha:</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 10 }}
      />
      <Button title="Redefinir senha" onPress={handleConfirm} />
    </View>
  );
}

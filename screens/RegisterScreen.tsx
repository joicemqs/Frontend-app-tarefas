import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View>
      <Text>Registro</Text>
      <Button title="Voltar para Login" onPress={() => navigation.goBack()} />
    </View>
  );
}


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import PasswordResetConfirmScreen from '../screens/PasswordResetConfirmScreen';
import { headerOptions } from './headerOptions';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" id={undefined} screenOptions={headerOptions}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ title: 'Recuperar Senha' }} />
      <Stack.Screen name="PasswordResetConfirm" component={PasswordResetConfirmScreen} options={{ title: 'Redefinir Senha' }} />
    </Stack.Navigator>
  );
}

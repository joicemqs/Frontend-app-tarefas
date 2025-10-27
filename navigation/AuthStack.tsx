import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import PasswordResetConfirmScreen from '../screens/PasswordResetConfirmScreen';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" id={undefined}>
      <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#9A8C98',
          },
          headerTintColor: '#22223B',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>

      <Stack.Screen name="Register" component={RegisterScreen} options={{
          title: 'Registrar',
          headerStyle: {
            backgroundColor: '#9A8C98',
          },
          headerTintColor: '#22223B',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>

      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{
          title: 'Recuperar Senha',
          headerStyle: {
            backgroundColor: '#9A8C98',
          },
          headerTintColor: '#22223B',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
      <Stack.Screen name="PasswordResetConfirm" component={PasswordResetConfirmScreen} 
      options={{
          title: 'Redefinir Senha',
          headerStyle: {
            backgroundColor: '#9A8C98',
          },
          headerTintColor: '#22223B',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
    </Stack.Navigator>
  );
}

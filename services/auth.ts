import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/accounts/login/', { email, password });
  const { access, refresh } = response.data;

  await AsyncStorage.setItem('access', access);
  await AsyncStorage.setItem('refresh', refresh);

  return access;
}

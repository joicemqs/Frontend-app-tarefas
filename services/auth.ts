import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function loginUser(email: string, password: string) {
  const response = await api.post('/accounts/login/', { email, password });
  const { access, refresh } = response.data;

  await AsyncStorage.setItem('access', access);
  await AsyncStorage.setItem('refresh', refresh);

  return access;
}

const publicApi = axios.create({
  baseURL: 'http://192.168.15.10:8000/api'
});

export async function registerUser(username: string, email: string, password: string) {
  const response = await publicApi.post('/accounts/register/', {
    username,
    email,
    password
  });
  return response.data;
}

export async function requestPasswordReset(email: string) {
  const response = await publicApi.post('/accounts/password-reset/request/', { email });
  return response.data;
}

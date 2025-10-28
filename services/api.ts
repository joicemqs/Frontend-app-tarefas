import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.15.10:8000/api', // ou seu IP local se estiver testando no celular
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o token expirou e ainda não tentamos renovar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh');
        const response = await axios.post('http://192.168.15.10:8000/api/accounts/token/refresh/', { // ou seu IP local se estiver testando no celular
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        await AsyncStorage.setItem('access', newAccessToken);

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Reenvia a requisição original com o novo token
        return api(originalRequest);
      } catch (refreshError) {
        // Se falhar, redireciona para login ou mostra erro
        console.error('Erro ao renovar token:', refreshError);
        return Promise.reject(refreshError);
        
      }
    }

    return Promise.reject(error);
  }
);


export default api;

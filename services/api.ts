import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina EXPO_PUBLIC_API_URL no arquivo .env.local (veja o .env.example).
// Para testar no celular, use o IP da sua máquina na rede local.
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Chamado quando a sessão expira de vez (refresh token inválido); o AuthContext registra o logout aqui
let onSessionExpired: (() => void) | null = null;

export function setOnSessionExpired(handler: (() => void) | null) {
  onSessionExpired = handler;
}

export async function clearTokens() {
  await AsyncStorage.multiRemove(['access', 'refresh']);
}

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
    const refreshToken = await AsyncStorage.getItem('refresh');

    // Se o token expirou, ainda não tentamos renovar e existe um refresh token (no login com senha errada não existe)
    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_URL}/accounts/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        await AsyncStorage.setItem('access', newAccessToken);

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Reenvia a requisição original com o novo token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh também expirou: limpa a sessão e volta para o login
        await clearTokens();
        onSessionExpired?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;

import axios from 'axios';

// Junta as mensagens de validação que o Django devolve (ex.: { password: ["Esta senha é muito curta."] })
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) return fallback;
  if (!error.response) return 'Não foi possível conectar ao servidor. Verifique sua conexão.';

  const data = error.response.data;
  if (!data || typeof data !== 'object') return fallback;

  const messages = Object.values(data as Record<string, unknown>).flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );
  const text = messages.filter((m) => typeof m === 'string').join('\n');
  return text || fallback;
}

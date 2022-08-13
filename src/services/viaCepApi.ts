import api from './api';

export async function getAddressByCEP(value: string) {
  const response = await api.post(`/viacep`, { cep: value });

  return response.data;
}

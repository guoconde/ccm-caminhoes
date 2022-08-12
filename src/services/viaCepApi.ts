import axios from 'axios';

export async function getAddressByCEP(value: string) {
  const response = await axios.get(`http://viacep.com.br/ws/${value}/json/`);

  return response.data;
}

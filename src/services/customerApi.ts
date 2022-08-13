import { DataType } from '../utils/types';
import api from './api';

export async function newCustomer(data: DataType) {
  const response = await api.post('/customer', data);

  return response.data;
}

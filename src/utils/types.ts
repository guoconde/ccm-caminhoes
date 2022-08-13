export interface CustomerType {
  name: string;
  document: string;
  email: string;
  amount: number;
  phone: string;
}

export interface AddressType {
  cep: string;
  street: string;
  district: string;
  number: string | null;
  uf: string;
  city: string;
}

export interface DataType {
  customer: CustomerType;
  address: AddressType;
}

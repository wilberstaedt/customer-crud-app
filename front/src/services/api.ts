import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const getCustomers = async (filters: {
    name?: string;
    type?: string;
    status?: string;
  }) => {
    const res = await api.get('/customers', {
      params: filters,
    });
    return res.data;
};

export const createCustomer = async (data: {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;
    phone?: string;
    birthDate?: string;
    document: string;
    hasLogin?: boolean;
  }
  type: 'INDIVIDUAL' | 'ORGANIZATION';
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  notes?: string;
  password?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postCode?: string;
  };
}) => {
  const res = await api.post('/customers', data);
  return res.data;
};
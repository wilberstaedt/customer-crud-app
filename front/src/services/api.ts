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

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export const getHealthcheck = async () => {
    const response = await api.get('/health');
    return response.data;
};
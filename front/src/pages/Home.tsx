import React, { useEffect, useState } from 'react';
import { getHealthcheck } from '../services/api';

const Home = () => {
  const [status, setStatus] = useState('Carregando...');

  useEffect(() => {
    getHealthcheck()
      .then((res) => setStatus(res.status))
      .catch(() => setStatus('Erro ao conectar com o backend'));
  }, []);

    return <h1>Status do Backend: {status}</h1>;
};

export default Home;

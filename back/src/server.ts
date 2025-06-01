import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthcheckRoute } from './routes/healthcheck';

const app = Fastify();

app.register(cors, {
    origin: '*',
});

app.register(healthcheckRoute);

app.listen({ port: 3333 }, () => {
    console.log('🚀 Backend rodando em http://localhost:3333');
});
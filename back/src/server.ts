import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthcheckRoute } from './routes/healthcheck';
import { customerRoutes } from './routes/customer';

const app = Fastify();

app.register(cors, {
    origin: '*',
});

app.register(healthcheckRoute);
app.register(customerRoutes)

app.listen({ port: 3333 }, () => {
    console.log('🚀 Backend rodando em http://localhost:3333');
});
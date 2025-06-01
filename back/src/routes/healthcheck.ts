import { FastifyInstance } from 'fastify';
import { healthcheckController } from '../controllers/healthcheck';

export async function healthcheckRoute(app: FastifyInstance) {
    app.get('/health', healthcheckController);
}
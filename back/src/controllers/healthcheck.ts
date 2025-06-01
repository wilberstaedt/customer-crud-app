import { FastifyRequest, FastifyReply } from 'fastify';
import { checkHealthService } from '../usecases/healthckeck';

export async function healthcheckController(_req: FastifyRequest, reply: FastifyReply) {
    const result = await checkHealthService();
    console.log(result);
    return reply.send(result);
}

import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateLoginSchema } from '../../usecases/customers/types';
import { createLogin } from '../../usecases/customers/createLogin';

export async function createLoginController(request: FastifyRequest, reply: FastifyReply) {
    const parse = CreateLoginSchema.safeParse(request.body);
    if (!parse.success) {
        return reply.status(400).send({ error: 'Validation failed', details: parse.error.format() });
    }
    const result = await createLogin(parse.data);
    return reply.status(201).send(result);
}
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerSchema } from '../../usecases/customers/types';
import { createCustomer } from '../../usecases/customers/createCustomer';

export async function createCustomerController(request: FastifyRequest, reply: FastifyReply) {
    console.log('chegou no controller')
    const parse = CreateCustomerSchema.safeParse(request.body);
    if (!parse.success) {
        return reply.status(400).send({ error: 'Validation failed', details: parse.error.format() });
    }
    const result = await createCustomer(parse.data);
    return reply.status(201).send(result);
}
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateAddressSchema } from '../../usecases/customers/types';
import { createAddress } from '../../usecases/customers/createAddress';

export async function createAddressController(request: FastifyRequest, reply: FastifyReply) {
    const parse = CreateAddressSchema.safeParse(request.body);
    if (!parse.success) {
        return reply.status(400).send({ error: 'Validation failed', details: parse.error.format() });
    }
    const result = await createAddress(parse.data);
    return reply.status(201).send(result);
}
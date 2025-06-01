import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllCustomers } from '../../usecases/customers/getCustomer';

export async function getCustomerController(request: FastifyRequest, reply: FastifyReply) {
    const { type, status, name, email } = request.query as {
        type?: 'INDIVIDUAL' | 'ORGANIZATION';
        status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
        name?: string;
        email?: string;
    };

    const result = await getAllCustomers({ type, status, name, email });
    return reply.send(result);
}
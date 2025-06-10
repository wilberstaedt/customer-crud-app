import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import {
    CreateCustomerSchema,
    CreateAddressDTO,
} from '../../usecases/customers/types';
import { createCustomer } from '../../usecases/customers/createCustomer';
import { createLogin } from '../../usecases/customers/createLogin';
import { createAddress } from '../../usecases/customers/createAddress';

// Tipo combinado para o body completo
type FullCustomerPayload = z.infer<typeof CreateCustomerSchema> & {
    password?: string;
    address?: Omit<CreateAddressDTO, 'profileId'>;
};

export async function createCustomerController(
    request: FastifyRequest<{ Body: FullCustomerPayload }>,
    reply: FastifyReply,
) {
    const body = request.body as FullCustomerPayload;

    const parse = CreateCustomerSchema.safeParse(body);
    if (!parse.success) {
        return reply
            .status(400)
            .send({ error: 'Validation failed', details: parse.error.format() });
    }

    const customerData = parse.data;

    try {
        const created = await createCustomer(customerData);

        if (!created?.id || !created?.profileId) {
            return reply.status(500).send({ error: 'Customer or profile creation failed' });
        }

        // Cria login se necessário
        if (customerData.profile.hasLogin && body.password) {
            try {
                await createLogin({
                    customerId: created.id,
                    password: body.password,
                });
            } catch (loginError) {
                console.error('Erro ao criar login:', loginError);
                return reply.status(400).send({ error: 'Login creation failed', details: (loginError as Error).message });
            }
        }

        // Cria endereço se fornecido
        if (body.address) {
            try {
                await createAddress({
                    ...body.address,
                    profileId: created.profileId,
                    isMain: true,
                    isActive: true,
                });
            } catch (addressError) {
                console.error('Erro ao criar endereço:', addressError);
                return reply.status(400).send({ error: 'Address creation failed', details: (addressError as Error).message });
            }
        }

        return reply.status(201).send(created);
    } catch (error) {
        console.error('Erro geral na criação de cliente:', error);
        return reply.status(500).send({ error: 'Internal Server Error', details: (error as Error).message });
    }
}

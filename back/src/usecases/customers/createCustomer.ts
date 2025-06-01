import { prisma } from '../../lib/prisma'
import { CreateCustomerDTO } from './types';

export async function createCustomer(data: CreateCustomerDTO) {
    console.log('chegou no usecase')
    return await prisma.$transaction(async (tx) => {
        const createdProfile = await tx.profile.create({
            data: data.profile,
        });

        const customer = await tx.customer.create({
            data: {
                profileId: createdProfile.id,
                type: data.type,
                status: data.status ?? 'ACTIVE',
                hasLogin: false,
                notes: data.notes,
            },
        });

        return customer;
    });
}
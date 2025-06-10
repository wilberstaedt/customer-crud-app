import { prisma } from '../../lib/prisma';
import { CreateAddressDTO } from './types';

export async function createAddress(data: CreateAddressDTO) {
    return await prisma.$transaction(async (tx) => {

        const customer = await prisma.profile.findUnique({
            where: { id: data.profileId },
        });

        if (!customer) {
            throw new Error('Customer not found');
        }

        if (data.isMain) {
            await tx.address.updateMany({
                where: {
                profileId: data.profileId,
                isMain: true,
                },
                data: {
                isMain: false,
                },
            });
        }

        const address = await tx.address.create({
            data: {
                ...data,
                isMain: data.isMain ?? false,
                isActive: data.isActive ?? true,
            },
        });

        return address;
    });
}
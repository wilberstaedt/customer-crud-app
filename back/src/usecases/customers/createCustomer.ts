import { prisma } from '../../lib/prisma';
import { CreateCustomerDTO } from './types';

export async function createCustomer(data: CreateCustomerDTO) {
    const { hasLogin, ...profileWithoutHasLogin } = data.profile;

    const cleanedProfile = {
        ...profileWithoutHasLogin,
        birthDate: profileWithoutHasLogin.birthDate?.trim()
            ? new Date(profileWithoutHasLogin.birthDate)
            : undefined,
        gender: profileWithoutHasLogin.gender?.trim() || undefined,
        phone: profileWithoutHasLogin.phone?.trim() || undefined,
        document: profileWithoutHasLogin.document?.trim() || undefined,
    };

    return await prisma.$transaction(async (tx) => {
        const createdProfile = await tx.profile.create({
            data: cleanedProfile,
        });

        const createdCustomer = await tx.customer.create({
            data: {
                type: data.type,
                status: data.status ?? 'ACTIVE',
                notes: data.notes,
                hasLogin: data.profile.hasLogin,
                profileId: createdProfile.id,
            },
        });

        return {
            id: createdCustomer.id,
            profileId: createdCustomer.profileId,
        };
    });
}

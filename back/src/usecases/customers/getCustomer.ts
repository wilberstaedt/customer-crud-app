import { prisma } from '../../lib/prisma';
import { CustomerFilters } from './types';

export async function getAllCustomers(filters: CustomerFilters = {}) {
    const { type, status, name } = filters;

    return await prisma.customer.findMany({
        where: {
        ...(type ? { type } : {}),
        ...(status ? { status } : {}),
        ...(name
            ? {
                OR: [
                {
                    profile: {
                    firstName: { contains: name, mode: 'insensitive' },
                    },
                },
                {
                    profile: {
                    lastName: { contains: name, mode: 'insensitive' },
                    },
                },
                ],
            }
            : {}),
        },
        include: {
        login: {
            select: {
            id: true,
            email: true,
            lastLogin: true,
            },
        },
        profile: {
            include: {
            addresses: true,
            },
        },
        },
    });
}

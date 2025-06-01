import { prisma } from '../../lib/prisma';
import { CreateLoginDTO } from './types';
import bcrypt from 'bcryptjs';

export async function createLogin(data: CreateLoginDTO) {
    const customer = await prisma.customer.findUnique({
        where: { id: data.customerId },
        include: { profile: true },
    });

    if (!customer) {
        throw new Error('Customer not found');
    }

    const email = customer.profile.email;

    if (!email) {
        throw new Error('Customer profile does not contain an email');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const login = await prisma.login.create({
        data: {
        email,
        password: hashedPassword,
        },
    });

    await prisma.customer.update({
        where: { id: data.customerId },
        data: {
        loginId: login.id,
        hasLogin: true,
        },
    });

    return login;
}
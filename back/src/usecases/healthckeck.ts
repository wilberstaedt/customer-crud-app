import { prisma } from '../lib/prisma';

export async function checkHealthService() {
    try {
        await prisma.healthLog.deleteMany({});

        const log = await prisma.healthLog.create({
            data: { status: 'ok' },
        });

        return { status: log.status, createdAt: log.createdAt };
    } catch (error) {
        console.error('Erro ao registrar healthcheck:', error);
        return { status: 'error', message: 'Erro ao registrar no banco de dados' };
    }
}

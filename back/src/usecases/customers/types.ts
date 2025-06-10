import { z } from 'zod';

export const CreateCustomerSchema = z.object({
    type: z.enum(['INDIVIDUAL', 'ORGANIZATION']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).optional(),
    notes: z.string().optional(),
    profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        gender: z.string().optional(),
        phone: z.string().optional(),
        birthDate: z.string().optional(),
        document: z.string().optional(),
        hasLogin: z.boolean().optional()
    }),
});

export const CreateLoginSchema = z.object({
    customerId: z.string(),
    password: z.string().min(6),
});

export const CreateAddressSchema = z.object({
    profileId: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    suburb: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postCode: z.string(),
    isMain: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

export interface CustomerFilters {
    name?: string;
    type?: 'INDIVIDUAL' | 'ORGANIZATION';
    status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
    email?: string;
}

export type CreateCustomerDTO = z.infer<typeof CreateCustomerSchema>;
export type CreateLoginDTO = z.infer<typeof CreateLoginSchema>;
export type CreateAddressDTO = z.infer<typeof CreateAddressSchema>;
import { FastifyInstance } from 'fastify';
import { createCustomerController } from '../controllers/customer/createCustomer';
import { createLoginController } from '../controllers/customer/createLogin';
import { createAddressController } from '../controllers/customer/createAddress';
import { getCustomerController } from '../controllers/customer/getCustomer';

export async function customerRoutes(app: FastifyInstance) {

    //GET ROUTES
    app.get('/customers', getCustomerController)

    //POST ROUTES
    app.post('/customers', createCustomerController);
    app.post('/customers/login', createLoginController);
    app.post('/customers/address', createAddressController);
}
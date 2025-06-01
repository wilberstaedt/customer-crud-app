import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CreateCustomerPage } from '../components/CreateCustomer';
import '../styles/Global.css';

const CreateCustomer = () => (
  <>
    <Header />
    <main>
      <CreateCustomerPage />
    </main>
    <Footer />
  </>
);

export default CreateCustomer;
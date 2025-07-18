import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CustomerTable } from '../components/CustomerTable';
import '../styles/Global.css';

const Home = () => (
  <>
    <Header />
    <main>
      <CustomerTable />
    </main>
    <Footer />
  </>
);

export default Home;

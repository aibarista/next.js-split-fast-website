import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/client/Header';
import Footer from 'components/common/Footer';

const ClientLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;

import React from 'react';
import { Header } from '../../components/header';
import { NotFound } from '../../components/notFound';
import { Footer } from '../../components/footer';

export const NotFoundPage: React.FC = () => (
  <>
    <Header/>
    <NotFound/>
    <Footer/>
  </>
);

import React from 'react';
import { Header } from '../../components/header';

export const Favorites: React.FC = () => {
  return (
    <div className='page'>
      <Header/>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

          </section>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import './error.scss';

export const Error: React.FC = () => (
  <div className='not-found'>
    <h1 className='not-found__title'>404 Not Found</h1>
    <Link to="/" className='not-found__link'>Вернуться на главную страницу</Link>
  </div>
);

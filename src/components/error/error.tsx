import React from 'react';
import { Link } from 'react-router-dom';

export const Error: React.FC = () => (
  <div>
    <h1>404 Not Found</h1>
    <Link to="/">Вернуться на главную страницу</Link>
  </div>
);

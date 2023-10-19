import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div>
    404 Not Found
    <Link to="/">Вернуться на главную страницу</Link>
  </div>
);

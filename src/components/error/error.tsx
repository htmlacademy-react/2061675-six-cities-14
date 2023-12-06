import React from 'react';
import { Link } from 'react-router-dom';
import styles from './error.module.scss';

export const Error: React.FC = () => (
  <div className={styles.notFound}>
    <h1 className={styles.notFound__title}>404 Not Found</h1>
    <Link to="/" className={styles.notFound__link}>Вернуться на главную страницу</Link>
  </div>
);

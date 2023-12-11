import React, { FormEvent, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, DefaultCities } from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/async-actions';

export const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const randomCity = useMemo(() => {
    const cityIndex = Math.floor(Math.random() * DefaultCities.length);
    return DefaultCities[cityIndex];
  }, []);
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return false;
    }

    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    dispatch(loginAction({email: emailValue, password: passwordValue}));
  };
  return (
    <div className="page page--gray   page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  id="email"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                // onClick={() => navigate(AppRoute.Main)}
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href={`/?city=${randomCity.name}`}>
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

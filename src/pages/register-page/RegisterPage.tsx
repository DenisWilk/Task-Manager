import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserForm } from '../../types/types';
import { fetchLogin, fetchRegistration, userSlice } from '../../redux/user-slice/userSlice';
import { languages } from '../../locales/languages';
import GoWelcomePageLink from '../../UI/go-welcome-page-link/GoWelcomePageLink';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import Spinner from '../../UI/spinner/Spinner';
import './registerPage.css';

export const RegisterPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<IUserForm>({
    mode: 'onChange',
  });
  const navigation = useNavigate();
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const { error, user, password, spinnerStatus } = useAppSelector((state) => state.userSlice);

  const { errors } = formState;
  const onSubmitForm: SubmitHandler<IUserForm> = (data) => {
    dispatch(fetchRegistration(data));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '', login: '', password: '' });
    }
  }, [formState.isSubmitSuccessful, reset]);

  useEffect(() => {
    dispatch(userSlice.actions.setError(''));
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(fetchLogin({ login: user.login, password: password }));
    dispatch(userSlice.actions.setSignInStatus(true));
    navigation(`/boards/${user.login}`);
  };

  return (
    <>
      <div className={'register-container ' + state.themeIndex}>
        {spinnerStatus && <Spinner />}
        <div className="blur-background">
          <div className="welcome-page-link-container">
            <GoWelcomePageLink />
          </div>
          <div className="selectors-container">
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </div>

        <div>
          <h3 className={'register-note ' + state.themeIndex}>
            {languages.haveReg[state.languageIndex]}
            <Link to="/login" className={'register-note-link ' + state.themeIndex}>
              {languages.signIn[state.languageIndex]}
              <span className={'register-note-link-arrow ' + state.themeIndex}>❯</span>
            </Link>
          </h3>
        </div>

        <form
          className="sign-up-form"
          onSubmit={handleSubmit(onSubmitForm)}
          onChange={() => {
            dispatch(userSlice.actions.setError(''));
            dispatch(userSlice.actions.setPassword(''));
          }}
        >
          <p className={'sign-up-form__title ' + state.themeIndex}>
            {languages.registration[state.languageIndex]}
          </p>
          <div className={'sign-up-form__item username ' + state.themeIndex}>
            <label htmlFor="name">{languages.name[state.languageIndex]}</label>
            <input
              className={'sign-up-form__input ' + state.themeIndex}
              type="text"
              id="name"
              {...register('name', {
                required: `${languages.requiredFieldNote[state.languageIndex]}`,
                maxLength: 20,
                minLength: 3,
              })}
            />
            <p className="form-messages">
              {errors.name?.type === 'required' && <span>{errors.name.message}</span>}
              {errors.name?.type === 'minLength' && (
                <span>{languages.formWarnMin[state.languageIndex]}</span>
              )}
              {errors.name?.type === 'maxLength' && (
                <span>{languages.formWarnMax[state.languageIndex]}</span>
              )}
            </p>
          </div>
          <div className={'sign-up-form__item login ' + state.themeIndex}>
            <label htmlFor="login">{languages.login[state.languageIndex]}</label>
            <input
              className={'sign-up-form__input ' + state.themeIndex}
              type="text"
              id="login"
              {...register('login', {
                required: `${languages.requiredFieldNote[state.languageIndex]}`,
                maxLength: 20,
                minLength: 3,
              })}
            />
            <p className="form-messages">
              {errors.login?.type === 'required' && <span>{errors.login.message}</span>}
              {errors.login?.type === 'minLength' && (
                <span>{languages.formWarnMin[state.languageIndex]}</span>
              )}
              {errors.login?.type === 'maxLength' && (
                <span>{languages.formWarnMax[state.languageIndex]}</span>
              )}
            </p>
          </div>
          <div className={'sign-up-form__item password ' + state.themeIndex}>
            <label htmlFor="password">{languages.password[state.languageIndex]}</label>
            <input
              className={'sign-up-form__input ' + state.themeIndex}
              type="password"
              id="password"
              {...register('password', {
                required: `${languages.requiredFieldNote[state.languageIndex]}`,
                minLength: 3,
              })}
            />
            <p className="form-messages">
              {errors.password?.type === 'required' && <span>{errors.password?.message}</span>}
              {errors.password?.type === 'minLength' && (
                <span>{languages.formWarnMin[state.languageIndex]}</span>
              )}
            </p>
          </div>
          <div className="sign-up-form__item buttons">
            <button type="submit" className={'submit__button ' + state.themeIndex}>
              {languages.submit[state.languageIndex]}
            </button>
          </div>
        </form>
        <p className="form-failed">
          {error.includes('userExist') ? languages.userExist[state.languageIndex] : error}
        </p>

        {password && (
          <article className="form-success">
            <p className="form-success__message">
              {languages.successRegister[state.languageIndex]}
            </p>
            <button className={'form-success__button ' + state.themeIndex} onClick={handleLogin}>
              {languages.signIn[state.languageIndex]}
            </button>
          </article>
        )}
      </div>
    </>
  );
};

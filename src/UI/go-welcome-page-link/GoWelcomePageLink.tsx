import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import './goWelcomePageLink.css';

function GoWelcomePageLink(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);

  return (
    <Link to="/" className={'welcome-link ' + state.themeIndex}>
      <span className={'welcome-link-arrow ' + state.themeIndex}>❮</span>
      {languages.returnWelcomePage[state.languageIndex]}
    </Link>
  );
}

export default GoWelcomePageLink;

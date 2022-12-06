import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import Spinner from '../../UI/spinner/Spinner';
import './welcomePage.css';

function WelcomePage() {
  const state = useAppSelector((store) => store.settingsSlice);
  const { isSignIn } = useAppSelector((state) => state.userSlice);
  const { user, spinnerStatus } = useAppSelector((state) => state.userSlice);

  return (
    <>
      <div className={'welcome-page-container ' + state.themeIndex}>
        {spinnerStatus && <Spinner />}
        <div className="blur-background">
          <div className="selectors-container">
            <ThemeSelector />
            <LanguageSelector />
          </div>
          {isSignIn ? (
            <div className="auth-links-duplicate">
              <Link to="/boards/:user" className={'auth-link-duplicate ' + state.themeIndex}>
                {languages.toBoards[state.languageIndex]}
              </Link>
              <Link to="/logout" className={'auth-link-duplicate ' + state.themeIndex}>
                {languages.signOut[state.languageIndex]}
              </Link>
            </div>
          ) : (
            <div className="auth-links-duplicate">
              <Link to="/login" className={'auth-link-duplicate ' + state.themeIndex}>
                {languages.signIn[state.languageIndex]}
              </Link>
              <Link to="/register" className={'auth-link-duplicate ' + state.themeIndex}>
                {languages.register[state.languageIndex]}
              </Link>
            </div>
          )}
        </div>
        <div>
          <h2 className={'welcome-page-title ' + state.themeIndex}>
            {languages.welcome[state.languageIndex]}
          </h2>

          {isSignIn ? (
            <div className="auth-links">
              <Link to={`/boards/${user.login}`} className={'auth-link ' + state.themeIndex}>
                {languages.toBoards[state.languageIndex]}
                <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
              </Link>
              <Link to="/logout" className={'auth-link ' + state.themeIndex}>
                {languages.signOut[state.languageIndex]}
                <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
              </Link>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className={'auth-link ' + state.themeIndex}>
                {languages.signIn[state.languageIndex]}
                <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
              </Link>
              <Link to="/register" className={'auth-link ' + state.themeIndex}>
                {languages.register[state.languageIndex]}
                <span className={'auth-link-arrow ' + state.themeIndex}>❯</span>
              </Link>
            </div>
          )}
        </div>

        <div className={'welcome-page-content1 ' + state.themeIndex}>
          <h4 className={'content-title ' + state.themeIndex}>
            {languages.about[state.languageIndex]}
          </h4>
          <div className={'content-item ' + state.themeIndex}>
            <Avatar
              className="content-item-img"
              src="../Max.png"
              alt="Max"
              sx={{ width: 100, height: 100 }}
            />
            <h5 className={'content-item-title ' + state.themeIndex}>
              {languages.Max[state.languageIndex]}
            </h5>
            <p className={'content-item-about-team ' + state.themeIndex}>
              {languages.MaxPart[state.languageIndex]}
            </p>
          </div>
          <div className={'content-item ' + state.themeIndex}>
            <Avatar
              className="content-item-img"
              src="../Den1.png"
              alt="Den1"
              sx={{ width: 100, height: 100 }}
            />
            <h5 className={'content-item-title ' + state.themeIndex}>
              {languages.Den1[state.languageIndex]}
            </h5>
            <p className={'content-item-about-team ' + state.themeIndex}>
              {languages.Den1Part[state.languageIndex]}
            </p>
          </div>
          <div className={'content-item ' + state.themeIndex}>
            <Avatar
              className="content-item-img"
              src="../Den2.jpg"
              alt="Den2"
              sx={{ width: 110, height: 110 }}
            />
            <h5 className={'content-item-title ' + state.themeIndex}>
              {languages.Den2[state.languageIndex]}
            </h5>
            <p className={'content-item-about-team ' + state.themeIndex}>
              {languages.Den2Part[state.languageIndex]}
            </p>
          </div>
        </div>
        <div className={'welcome-page-content2 ' + state.themeIndex}>
          <h4 className={'content-title ' + state.themeIndex}>
            {languages.aboutApp[state.languageIndex]}
          </h4>
          <p className={'content-item-description ' + state.themeIndex}>
            {languages.appDescryption[state.languageIndex]}
          </p>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;

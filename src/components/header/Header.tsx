import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { setSpinnerStatus } from '../../redux/user-slice/userSlice';
import { languages } from '../../locales/languages';
import { localeEN } from '../../locales/localeEN';
import ThemeSelector from '../../UI/selectors/ThemeSelector';
import LanguageSelector from '../../UI/selectors/LanguageSelector';
import BurgerMenu from '../burger-menu/BurgerMenu';
import './Header.css';

function Header(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const paths: string[] = ['/', '/login', '/register'];

  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };

  const headerRef = useRef<HTMLElement | null>(null);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 0 && headerRef.current?.classList.add('is-sticky');
    scrollTop <= 0 && headerRef.current?.classList.remove('is-sticky');
  };

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  return paths.includes(location.pathname) ? (
    <></>
  ) : (
    <header className={'header ' + state.themeIndex} ref={headerRef}>
      <div className="selectors-container">
        <ThemeSelector />
        <LanguageSelector />
      </div>

      <MediaQuery minWidth={641}>
        <nav className="nav">
          <Link className={'nav__link ' + state.themeIndex} to="/">
            {languages.startPage[state.languageIndex]}
          </Link>

          <button
            className={'nav__link ' + state.themeIndex}
            onClick={addBoardButtonHandler}
            title={localeEN.tooltips.CREATE_NEW_BOARD[state.languageIndex]}
          >
            {languages.createBoard[state.languageIndex]}
          </button>

          <Link className={'nav__link ' + state.themeIndex} to="profile">
            {languages.editProfile[state.languageIndex]}
          </Link>

          <Link
            className={'nav__link ' + state.themeIndex}
            to="/logout"
            onClick={() => dispatch(setSpinnerStatus(true))}
          >
            {languages.signOut[state.languageIndex]}
          </Link>
        </nav>
      </MediaQuery>

      <MediaQuery maxWidth={640}>
        <BurgerMenu />
      </MediaQuery>
    </header>
  );
}

export default Header;

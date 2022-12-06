import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { rssSvg } from './svg';
import './Footer.css';

export default function Footer() {
  const state = useAppSelector((store) => store.settingsSlice);

  function ghSvg(): JSX.Element {
    return (
      <svg className="gh-logo" viewBox="0 0 50 50">
        <path
          className={'gh-logo-fill1 ' + state.themeIndex}
          d="M30.4,40h-4h-4c0,0,0-2.4,0-4c-5.5,1.2-7-3-7-3c-1-2-2-3-2-3c-2-1.2,0-1,0-1c2,0,3,2,3,2  
  c1.8,3,4.9,2.5,6,2c0-1,0.4-2.5,1-3c-4.4-0.5-8-3-8-8s1-6,2-7c-0.2-0.5-1-2.3,0-5c0,0,2,0,4,3c1-1,4-1,5-1c1,0,4,0,5,1c2-3,4-3,4-3  
  c1.1,2.7,0.2,4.5,0,5c1,1,2,2,2,7s-3.6,7.5-8,8c0.6,0.5,1,2.2,1,3L30.4,40L30.4,40z"
          fill="#464646"
          id="Cat_2_"
        />
        <path
          className={'gh-logo-fill2 ' + state.themeIndex}
          d="M25,1C11.7,1,1,11.7,1,25s10.7,24,24,24s24-10.7,24-24S38.3,1,25,1z 
  M25,44C14.5,44,6,35.5,6,25S14.5,6,25,6 s19,8.5,19,19S35.5,44,25,44z"
          fill="#464646"
        />
      </svg>
    );
  }

  return (
    <footer className={'footer ' + state.themeIndex}>
      <div className="footer-items">
        <p className={'footer-item ' + state.themeIndex}>©</p>
        <p className={'footer-item ' + state.themeIndex}>2022</p>
      </div>
      <div className="footer-items">
        <a
          className="gh-link"
          href="https://github.com/maks-1987/"
          rel="noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className={'gh-title ' + state.themeIndex}>Max</p>
        </a>
        <a className="gh-link" href="https://github.com/matvey84/" rel="noreferrer" target="_blank">
          {ghSvg()}
          <p className={'gh-title ' + state.themeIndex}>Den</p>
        </a>
        <a
          className="gh-link"
          href="https://github.com/DenisWilk/"
          rel="noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className={'gh-title ' + state.themeIndex}>Den</p>
        </a>
      </div>
      <a className="rss-link" href="https://rs.school/react/" rel="noreferrer" target="_blank">
        <svg className={'rss-logo ' + state.themeIndex} viewBox="0 0 552.8 205.3">
          {rssSvg()}
        </svg>
      </a>
    </footer>
  );
}

import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useAppSelector } from '../../redux/hooks';
import './Spinner.css';

function Spinner(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);
  const spinnerThemeColors = {
    light: '#c0c0c0',
    dark: '#e1e1e1',
    color: '#ebefd0',
  };

  return (
    <div className="spinner-wrapper">
      <RotatingLines
        strokeColor={spinnerThemeColors[state.themeIndex as keyof typeof spinnerThemeColors]}
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
      />
    </div>
  );
}

export default Spinner;

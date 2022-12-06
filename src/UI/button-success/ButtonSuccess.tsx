import React, { useState } from 'react';
import { languages } from '../../locales/languages';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import './buttonSuccess.css';

interface IProp {
  isValid?: boolean;
  isCompare?: boolean;
}
export default function ButtonSuccess(props: IProp) {
  const { isValid, isCompare } = props;
  const isCreateBoard = useAppSelector((state) => state.modalSlice.isCreateBoard);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const [toolTip, setToolTip] = useState<string>('');
  const showToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid && isCreateBoard
      ? setToolTip(localeEN.tooTipContent.ADD_BOARD_TOOLTIP_MESSAGE[state.languageIndex])
      : !isValid && isCreateColumn
      ? setToolTip(localeEN.tooTipContent.ADD_COLUMN_TOOLTIP_MESSAGE[state.languageIndex])
      : null;
  };
  const hideToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid && setToolTip('');
  };
  const state = useAppSelector((store) => store.settingsSlice);
  return (
    <>
      <button
        className={'add-board-button ' + state.themeIndex}
        disabled={!isValid || isCompare}
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => showToolTip(e)}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => hideToolTip(e)}
      >
        {languages.submit[state.languageIndex]}
        <div className="add-board-button_tooltip">{toolTip}</div>
        <svg className={'add-board-button-svg ' + state.themeIndex} viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </button>
    </>
  );
}

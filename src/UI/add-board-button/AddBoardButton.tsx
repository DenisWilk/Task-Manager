import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsCreateBoard, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { languages } from '../../locales/languages';
import './addBoardButton.css';

export default function AddBoardButton() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };
  return (
    <div
      className={'add-board-button-container ' + state.themeIndex}
      onClick={addBoardButtonHandler}
    >
      <div className={'add-board-button-label ' + state.themeIndex}>
        {languages.createBoard[state.languageIndex]}
      </div>
      <div>
        <svg className={'add-board-svg ' + state.themeIndex} viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>
    </div>
  );
}

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsCreateColumn, setModalOpen } from '../../redux/modal-slice/modalSlice';
import './buttons.css';
import { localeEN } from '../../locales/localeEN';

export const ButtonNewColumn = () => {
  const dispatch = useAppDispatch();
  const addColumnButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateColumn(true));
  };
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);

  return (
    <button className="column-item__add-column" onClick={addColumnButtonHandler}>
      {localeEN.columnContet.ADD_NEW_COLUMN[languageIndex]}
    </button>
  );
};

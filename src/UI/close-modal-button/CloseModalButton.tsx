import React from 'react';
import './closeModalButton.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsEditTask,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setModalOpen,
  setDeleteUser,
  setIsShowTask,
} from '../../redux/modal-slice/modalSlice';
import { setCurrentColumnTitle } from '../../redux/columns-slice/columnsSlice';

export default function CloseModalButton() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const closeModalWindow = () => {
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsRemoveColumn(false));
    dispatch(setIsRemoveTask(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setModalOpen(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setIsEditTask(false));
    dispatch(setDeleteUser(false));
    dispatch(setIsShowTask(false));
    dispatch(setCurrentColumnTitle(''));
  };
  return (
    <>
      <button onClick={closeModalWindow} className={'close-modal-button ' + state.themeIndex}>
        <svg
          className={'close-modal-button-svg ' + state.themeIndex}
          viewBox="0 0 24 24"
          fill="#b84343ad"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </>
  );
}

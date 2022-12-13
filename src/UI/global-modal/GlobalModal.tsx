import React, { ReactElement, useEffect } from 'react';
import { localeEN } from '../../locales/localeEN';
import ConfirmButton from '../modal-confirm-button/ConfirmButton';
import CloseModalButton from '../close-modal-button/CloseModalButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setDeleteUser,
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsEditTask,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setModalOpen,
} from '../../redux/modal-slice/modalSlice';
import './globalModal.css';
import openAndRemoveModalSound from '../audio-effects/openAndRemoveModalSound';

type Props = { component: ReactElement | string };

export const GlobalModal = (props: Props) => {
  const {
    isModalOpen,
    isRemoveBoard,
    isRemoveColumn,
    isRemoveTask,
    isCreateColumn,
    isCreateTask,
    isCreateBoard,
    isEditTask,
    isDeleteUser,
    isShowTask,
  } = useAppSelector((state) => state.modalSlice);
  const modalSliceState = useAppSelector((state) => state.modalSlice);

  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  const currentModalTitle = isCreateBoard
    ? localeEN.modalContetntMessage.CREATE_NEW_BOARD_MESSAGE[languageIndex]
    : isCreateColumn
    ? localeEN.modalContetntMessage.CREATE_NEW_COLUMN_MESSAGE[languageIndex]
    : isCreateTask
    ? localeEN.modalContetntMessage.CREATE_NEW_TASK_MESSAGE[languageIndex]
    : isRemoveBoard
    ? localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE[languageIndex]
    : isRemoveColumn
    ? localeEN.modalContetntMessage.REMOVE_COLUMN_CONFIRM_MESSAGE[languageIndex]
    : isRemoveTask
    ? localeEN.modalContetntMessage.REMOVE_TASK_CONFIRM_MESSAGE[languageIndex]
    : isDeleteUser
    ? localeEN.modalContetntMessage.DELETE_USER_CONFIRM_MESSAGE[languageIndex]
    : isEditTask
    ? localeEN.modalContetntMessage.EDIT_TASK_MESSAGE[languageIndex]
    : localeEN.modalContetntMessage.SELECTED_TASK_MESSAGE[languageIndex];

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
  };
  useEffect(() => {
    openAndRemoveModalSound(modalSliceState);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalSliceState]);

  return (
    <div
      className={isModalOpen ? 'active modal ' + state.themeIndex : 'modal'}
      onClick={closeModalWindow}
    >
      <div
        className={isModalOpen ? 'active modal__content ' + state.themeIndex : 'modal__content'}
        onClick={(event): void => event.stopPropagation()}
      >
        <CloseModalButton />
        <h3 className={'modal-title ' + state.themeIndex}>{currentModalTitle}</h3>
        {isCreateBoard && props.component}
        {isCreateColumn && props.component}
        {isCreateTask && props.component}
        {isEditTask && props.component}
        {isShowTask && props.component}
        {isRemoveBoard && <ConfirmButton />}
        {isRemoveColumn && <ConfirmButton />}
        {isRemoveTask && <ConfirmButton />}
        {isDeleteUser && <ConfirmButton />}
      </div>
    </div>
  );
};

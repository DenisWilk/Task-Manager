import React, { useEffect } from 'react';
import './createBoardForm.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IFetchQuery, IUserBoard } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';
import {
  setIsCreateBoard,
  setIsRemoveBoard,
  setModalOpen,
} from '../../../redux/modal-slice/modalSlice';
import { fetchAddNewUserBoard } from '../../../redux/boards-slice/boardsFechRequest';
import { localeEN } from '../../../locales/localeEN';

export default function CreateBoardForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<IUserBoard>({ mode: 'onBlur' });

  const boardCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const dataForFetch: IFetchQuery = {
      boardData: { ...formData },
      token,
    };
    dispatch(fetchAddNewUserBoard(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsCreateBoard(false));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(boardCreateHandler)} className="board-form">
        <input
          autoComplete="off"
          {...register('title', {
            required: 'This field is required',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
          })}
          type="text"
          placeholder={localeEN.placeholderText.TITLE_BOARD_DESCRIPTION[languageIndex]}
          className="board-form__title-input"
          autoFocus
        />
        <input
          autoComplete="off"
          {...register('description', {
            required: 'This field is requaered',
            minLength: {
              value: 5,
              message: 'Should be min 5 character',
            },
          })}
          type="text"
          placeholder={localeEN.placeholderText.BOARD_DESCRIPTION[languageIndex]}
          className="board-form__description-input"
        />
        <ButtonSuccess isValid={isValid} />
      </form>
    </>
  );
}

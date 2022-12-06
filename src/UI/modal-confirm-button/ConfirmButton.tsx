import React from 'react';
import { fetchRemoveUserBoard } from '../../redux/boards-slice/boardsFechRequest';
import { fetchRemoveUserColumn } from '../../redux/columns-slice/columnsFetchRequest';
import {
  setClearUserCurrentBoardList,
  setCurrentColumnId,
} from '../../redux/columns-slice/columnsSlice';
import { fetchRemoveUserTask } from '../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setDeleteUser,
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsRemoveBoard,
  setIsRemoveColumn,
  setIsRemoveTask,
  setModalOpen,
} from '../../redux/modal-slice/modalSlice';
import { IFetchQuery, JwtDecode } from '../../types/types';
import { languages } from '../../locales/languages';
import './confirmButton.css';
import { fetchDeleteUser } from '../../redux/user-slice/userSlice';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function ConfirmButton() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const removedBoardId = useAppSelector((state) => state.boardsSlice.removedBoardId);
  const removedColumnId = useAppSelector((state) => state.columnsSlice.removedColumnId);
  const removedTaskId = useAppSelector((state) => state.columnsSlice.removedTaskId);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);
  const isRemoveColumn = useAppSelector((state) => state.modalSlice.isRemoveColumn);
  const isRemoveTask = useAppSelector((state) => state.modalSlice.isRemoveTask);
  const isDeleteUser = useAppSelector((state) => state.modalSlice.isDeleteUser);
  const jwt_decode: JwtDecode = jwtDecode(token);
  const navigate = useNavigate();
  const removeHandler = () => {
    const dataForFetch: IFetchQuery = isRemoveBoard
      ? {
          boardId: removedBoardId,
          token,
        }
      : isRemoveColumn
      ? {
          boardId: currentBoardId,
          columnId: removedColumnId,
          token,
        }
      : {
          boardId: currentBoardId,
          columnId: currentColumnId,
          taskId: removedTaskId,
          token,
        };
    isRemoveBoard && dispatch(fetchRemoveUserBoard(dataForFetch));
    isRemoveBoard && dispatch(setClearUserCurrentBoardList(dataForFetch));
    isRemoveColumn && dispatch(fetchRemoveUserColumn(dataForFetch));
    isRemoveTask && dispatch(fetchRemoveUserTask(dataForFetch));
    isDeleteUser && dispatch(fetchDeleteUser({ userId: jwt_decode.userId, token }));
    isDeleteUser && navigate('/logout');
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsRemoveColumn(false));
    dispatch(setIsRemoveTask(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setCurrentColumnId(''));
    dispatch(setDeleteUser(false));
  };

  return (
    <>
      <button className="add-board-button" onClick={removeHandler}>
        {languages.submit[state.languageIndex]}
        <svg className="confirm-button__yes" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </button>
    </>
  );
}

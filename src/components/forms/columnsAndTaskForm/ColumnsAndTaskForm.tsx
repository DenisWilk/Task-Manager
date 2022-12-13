import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchAddNewUserColumns } from '../../../redux/columns-slice/columnsFetchRequest';
import {
  fetchAddNewUserTasks,
  fetchChangeUserTask,
} from '../../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setIsCreateBoard,
  setIsCreateColumn,
  setIsCreateTask,
  setIsEditTask,
  setIsRemoveBoard,
  setModalOpen,
} from '../../../redux/modal-slice/modalSlice';
import { IFetchQuery, IUserBoard, JwtDecode } from '../../../types/types';
import ButtonSuccess from '../../../UI/button-success/ButtonSuccess';
import './columnsAndTasksForm.css';
import { localeEN } from '../../../locales/localeEN';
import { languages } from '../../../locales/languages';
import { TaskFiles } from '../../task/TaskFiles';

export default function ColumnsAndTaskForm() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentColumnId = useAppSelector((state) => state.columnsSlice.currentColumnId);
  const currentTaskId = useAppSelector((state) => state.columnsSlice.currentTaskId);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const isEditTask = useAppSelector((state) => state.modalSlice.isEditTask);
  const currentTaskData = useAppSelector((state) => state.columnsSlice.currentTaskData);
  const [isCompare, setIsCompare] = useState<boolean>(false);
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const state = useAppSelector((store) => store.settingsSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<IUserBoard>({
    mode: 'onBlur',
    defaultValues: {
      title: isEditTask ? currentTaskData.title : '',
      description: isEditTask ? currentTaskData.description : '',
    },
  });

  const columnOrTaskCreateHandler: SubmitHandler<IUserBoard> = (formData: IUserBoard) => {
    const currentUser: JwtDecode = jwtDecode(token);
    const dataForFetch: IFetchQuery = isCreateColumn
      ? {
          boardData: { ...formData },
          boardId: currentBoardId,
          token,
        }
      : isCreateTask
      ? {
          taskData: { ...formData, userId: currentUser.userId },
          boardId: currentBoardId,
          columnId: currentColumnId,
          token,
        }
      : {
          taskData: { ...formData, userId: currentUser.userId, order: currentTaskData.order },
          boardId: currentBoardId,
          columnId: currentColumnId,
          taskId: currentTaskId,
          token,
        };
    isCreateColumn && dispatch(fetchAddNewUserColumns(dataForFetch));
    isCreateTask && dispatch(fetchAddNewUserTasks(dataForFetch));
    isEditTask && dispatch(fetchChangeUserTask(dataForFetch));
    dispatch(setModalOpen(false));
    dispatch(setIsRemoveBoard(false));
    dispatch(setIsCreateColumn(false));
    dispatch(setIsCreateTask(false));
    dispatch(setIsCreateBoard(false));
    dispatch(setIsEditTask(false));
  };

  const titleCompairHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCompaireTitle = localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
      (title) => title.toLowerCase() === e.currentTarget.value.toLowerCase()
    );
    isCreateColumn && setIsCompare(isCompaireTitle);
  };
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="columns-and-task-form_container">
      <form onSubmit={handleSubmit(columnOrTaskCreateHandler)} className="columns-and-task-form">
        <input
          autoComplete="off"
          {...register('title', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => titleCompairHandler(e),
            required: localeEN.columnAndTaskMessages.MESSAGE_REQUIRED[state.languageIndex],
            minLength: {
              value: 2,
              message: localeEN.columnAndTaskMessages.MIN_LENGTH_WARN_TITLE[state.languageIndex],
            },
          })}
          type="text"
          placeholder={localeEN.placeholderText.TITLE_TASK_DESCRIPTION[state.languageIndex]}
          className="columns-and-task-form__title-input"
          autoFocus
        />
        {isCompare ? (
          <p className="compare-warning-message">{languages.compaireColumn[languageIndex]}</p>
        ) : null}
        <textarea
          {...register('description', {
            required: localeEN.columnAndTaskMessages.MESSAGE_REQUIRED[state.languageIndex],
            minLength: {
              value: 5,
              message:
                localeEN.columnAndTaskMessages.MIN_LENGTH_WARN_DESCRIPTION[state.languageIndex],
            },
            disabled: !isCreateTask && !isEditTask,
          })}
          placeholder={localeEN.placeholderText.TASK_DESCRIPTION[state.languageIndex]}
          className="columns-and-task-form__description-input"
        />
        {isEditTask && <TaskFiles />}
        <ButtonSuccess isValid={isValid} isCompare={isCompare} />
      </form>
    </section>
  );
}

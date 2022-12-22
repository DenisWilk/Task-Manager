import React, { useEffect, useState } from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId, setTasksAsDone } from '../../redux/columns-slice/columnsSlice';
import { fetchMarkTasksAsDone } from '../../redux/columns-slice/tasksFetchRequest';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { whenTaskWasDonedHandler } from '../../redux/taskDataCreator/taskDataCreatorAction';
import { IComleteColumn, IFetchQuery, ITask } from '../../types/types';
import { DoneTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
  task: ITask;
}
export const ButtonDoneTask = (props: IProp) => {
  const { id } = props;
  const { title, description, userId } = props.task;
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userSlice.token);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const userCurrentBoardColumns = useAppSelector(
    (state) => state.columnsSlice.userCurrentBoard.columns
  );
  const isDoneTask = useAppSelector((state) => state.modalSlice.isDoneTask);

  const doneTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const doneColumnId = userCurrentBoardColumns
      .filter((column) =>
        localeEN.columnContet.DEFAULT_DONE_COLUMN.some((title) => title === column.title)
      )
      .at(-1);

    const dataForFetch: IFetchQuery = {
      taskData: {
        title,
        description: whenTaskWasDonedHandler(description, isDoneTask),
        userId,
        order: 1,
        columnId: doneColumnId!.id,
      },
      boardId: currentBoardId,
      columnId: props.column.id,
      taskId: e.currentTarget.id,
      token,
    };

    dispatch(fetchMarkTasksAsDone(dataForFetch));
    dispatch(setTasksAsDone(dataForFetch));
    dispatch(setCurrentColumnId(props.column.id));
  };

  return (
    <>
      <button
        disabled={localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
          (lang) => lang === props.column.title
        )}
        id={id}
        className="button-done-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => doneTaskHandler(e)}
      >
        <DoneTaskSVG />
      </button>
    </>
  );
};

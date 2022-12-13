import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId, setCurrentTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsEditTask, setIsShowTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { EditTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
}
export const ButtonEditTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsEditTask(true));
    dispatch(setIsShowTask(false));
    dispatch(setModalOpen(true));
    dispatch(setCurrentTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(props.column.id));
  };
  return (
    <>
      <button
        disabled={localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
          (lang) => lang === props.column.title
        )}
        id={id}
        className="button-edit-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        <EditTaskSVG />
      </button>
    </>
  );
};

import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { setCurrentColumnId, setEditedTaskId } from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsEditTask, setIsShowTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { ShowTaskSVG } from './svgButtons';
import './task-buttons.css';

interface IProp {
  id: string;
  column: IComleteColumn;
}
export const ButtonShowTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsShowTask(true));
    dispatch(setModalOpen(true));
    dispatch(setEditedTaskId(e.currentTarget.id));
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
        <ShowTaskSVG />
      </button>
    </>
  );
};

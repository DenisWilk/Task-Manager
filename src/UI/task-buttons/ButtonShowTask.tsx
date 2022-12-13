import React from 'react';
import { localeEN } from '../../locales/localeEN';
import {
  setCurrentColumnId,
  setCurrentColumnTitle,
  setCurrentTaskId,
} from '../../redux/columns-slice/columnsSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsShowTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
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
    dispatch(setCurrentTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(props.column.id));
    dispatch(setCurrentColumnTitle(props.column.title));
  };
  return (
    <>
      <button
        id={id}
        className="button-show-task"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        <ShowTaskSVG />
      </button>
    </>
  );
};

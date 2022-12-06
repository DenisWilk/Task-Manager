import React from 'react';
import { setCurrentColumnId, setRemovedTaskId } from '../../redux/columns-slice/columnsSlice';

import { useAppDispatch } from '../../redux/hooks';
import { setIsRemoveTask, setModalOpen } from '../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../types/types';
import { DeleteTaskSVG } from '../column-buttons/svgButtons';

interface IProp {
  id: string;
  column: IComleteColumn;
}

export const ButtonDeleteTask = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const goToModalWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsRemoveTask(true));
    dispatch(setModalOpen(true));
    dispatch(setRemovedTaskId(e.currentTarget.id));
    dispatch(setCurrentColumnId(props.column.id));
  };
  return (
    <>
      <button
        id={id}
        className="button-delete-column"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
      >
        <DeleteTaskSVG />
      </button>
    </>
  );
};

import React from 'react';
import { localeEN } from '../../../locales/localeEN';
import { setCurrentColumnId } from '../../../redux/columns-slice/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsEditTask, setIsShowTask } from '../../../redux/modal-slice/modalSlice';
import { IComleteColumn } from '../../../types/types';
import './showTaskData.css';
// interface IProp {
//   id: string;
//   column: IComleteColumn;
// }
export default function ShowTaskData() {
  const currentTaskData = useAppSelector((state) => state.columnsSlice.currentTaskData);
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const currentColumnTtile = useAppSelector((state) => state.columnsSlice.currentColumnTitle);
  const dispatch = useAppDispatch();
  const letEditTask = () => {
    dispatch(setIsEditTask(true));
    dispatch(setIsShowTask(false));
  };

  return (
    <section className="task-data-container">
      <h2 className="task-data__title">{currentTaskData.title}</h2>
      <section className="task-data__description">{currentTaskData.description}</section>
      <div className="edit-checkbox__container">
        <label className="task-data__edit-checkbox-label" htmlFor="task-data__edit-checkbox">
          {localeEN.modalContetntMessage.CHANGE_TASK_CHECKBOX_LABEL[languageIndex]}
        </label>
        <input
          type="checkbox"
          id="task-data__edit-checkbox"
          className="task-data__edit-checkbox"
          disabled={localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
            (lang) => lang === currentColumnTtile
          )}
          onClick={letEditTask}
        />
      </div>
    </section>
  );
}

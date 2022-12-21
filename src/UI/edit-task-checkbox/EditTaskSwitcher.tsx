import React from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsEditTask, setIsShowTask } from '../../redux/modal-slice/modalSlice';

export default function EditTaskSwitcher() {
  const dispatch = useAppDispatch();
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const letEditTask = () => {
    dispatch(setIsEditTask(true));
    dispatch(setIsShowTask(false));
  };
  return (
    <div className="edit-checkbox__container">
      <label className="task-data__edit-checkbox-label" htmlFor="task-data__edit-checkbox">
        {localeEN.modalContetntMessage.CHANGE_TASK_CHECKBOX_LABEL[languageIndex]}
      </label>
      <input
        type="checkbox"
        id="task-data__edit-checkbox"
        className="task-data__edit-checkbox"
        onClick={letEditTask}
      />
    </div>
  );
}

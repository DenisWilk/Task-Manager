import React, { useEffect, useState } from 'react';
import { localeEN } from '../../../locales/localeEN';
import { useAppSelector } from '../../../redux/hooks';
import { ITaskDescriptionData } from '../../../types/types';
import EditTaskSwitcher from '../../../UI/edit-task-checkbox/EditTaskSwitcher';
import Spinner from '../../../UI/spinner/Spinner';
import { TaskFiles } from '../TaskFiles';
import './showTaskData.css';

export default function ShowTaskData() {
  const currentTaskData = useAppSelector((state) => state.columnsSlice.currentTaskData);
  const languageIndex = useAppSelector((state) => state.settingsSlice.languageIndex);
  const currentColumnTtile = useAppSelector((state) => state.columnsSlice.currentColumnTitle);
  const isShowTask = useAppSelector((state) => state.modalSlice.isShowTask);
  const [currentTaskDescription, setCurrentTaskDescription] = useState<ITaskDescriptionData>();
  const isDoneTask = useAppSelector((state) => state.modalSlice.isDoneTask);
  const [taskPriorityColor, setTaskPriorityColor] = useState<string>();
  const [taskPriority, setTaskPriority] = useState<string>();

  useEffect(() => {
    const parsedDescription: ITaskDescriptionData = JSON.parse(currentTaskData.description);
    setCurrentTaskDescription(parsedDescription);
    typeof parsedDescription !== 'undefined'
      ? setTaskPriorityColor(parsedDescription.taskPriority!.color)
      : setTaskPriorityColor('initial');
    typeof parsedDescription !== 'undefined'
      ? setTaskPriority(parsedDescription.taskPriority!.index!)
      : setTaskPriority('');
  }, [currentTaskData]);
  return (
    <section className="task-data-container" style={{ outline: `2px solid ${taskPriorityColor}` }}>
      <h4 className="task-data__create-task-date-title">
        {localeEN.showTaskDataContetnt.CREATE_TASK_LABEL[languageIndex] + ': '}
        {currentTaskDescription ? currentTaskDescription!.createTask : 0}
      </h4>
      <h2 className="task-data__title">{currentTaskData.title}</h2>
      <section className="task-data__description-container">
        <div className="task-data__description">
          {currentTaskDescription ? currentTaskDescription!.description : <Spinner />}
        </div>
      </section>
      <h4 className="task-data__create-task-date-title">
        {localeEN.showTaskDataContetnt.DONE_TASK_LABEL[languageIndex] + ': '}
        {currentTaskDescription && isDoneTask
          ? currentTaskDescription!.createTask
          : localeEN.showTaskDataContetnt.UNCOMPLEATE_TASK_MESSAGE[languageIndex]}
      </h4>
      {isShowTask && <TaskFiles />}
      {localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
        (lang) => lang === currentColumnTtile
      ) ? null : (
        <EditTaskSwitcher />
      )}
      {typeof taskPriority !== 'undefined' ? (
        <div
          className="task-priority-modal__container"
          style={{ border: `1.5px solid ${taskPriorityColor}` }}
        >
          <p className="task-priority" style={{ color: `${taskPriorityColor}` }}>
            {localeEN.priority[languageIndex][Number(taskPriority)]}
          </p>
        </div>
      ) : null}
    </section>
  );
}

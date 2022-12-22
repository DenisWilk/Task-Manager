import { localeEN } from './../../locales/localeEN';
import { ITask, ITaskDescriptionData, IUserBoard, IDate } from './../../types/types';
export const whenTaskWasCreatedHandler = (
  formData: IUserBoard,
  isCreateTask: boolean,
  currentTaskData: ITask
): string => {
  const currentTaskDescription: ITaskDescriptionData =
    typeof currentTaskData.description === 'string' && currentTaskData.description !== ''
      ? JSON.parse(currentTaskData.description)
      : null;

  const taskPriority =
    formData.taskPriority! === ''
      ? { priority: '', color: '' }
      : JSON.parse(formData.taskPriority!);
  const taskDescriptionData: ITaskDescriptionData = {
    description: formData.description! ? formData.description : currentTaskDescription.description,
    createTask: isCreateTask ? getTaskCreateDate() : currentTaskDescription.createTask,
    taskPriority,
  };

  return JSON.stringify(taskDescriptionData);
};

export const whenTaskWasDonedHandler = (currentTaskData: string, isDoneTask: boolean): string => {
  const currentTaskDescription: ITaskDescriptionData =
    typeof currentTaskData === 'string' ? JSON.parse(currentTaskData) : null;
  const taskDescriptionData: ITaskDescriptionData = {
    ...currentTaskDescription,
    doneTask: !isDoneTask ? getTaskCreateDate() : currentTaskDescription.doneTask,
  };
  return JSON.stringify(taskDescriptionData);
};

export const changeTaskDescriptionHandler = (
  formData: IUserBoard,
  currentTaskData: ITask
): string => {
  const currentTaskDescription: ITaskDescriptionData =
    typeof currentTaskData.description === 'string'
      ? JSON.parse(currentTaskData.description)
      : null;

  const taskPriority =
    formData.taskPriority! === ''
      ? { priority: '', color: '' }
      : JSON.parse(formData.taskPriority!);

  const taskDescriptionData: ITaskDescriptionData = {
    ...currentTaskDescription,
    description: formData.description!,
    taskPriority,
  };
  return JSON.stringify(taskDescriptionData);
};

export const parseTaskDescriptionHandler = (currentTaskData: ITask): string => {
  const currentTaskDescription: ITaskDescriptionData =
    typeof currentTaskData.description === 'string'
      ? JSON.parse(currentTaskData.description)
      : null;
  return currentTaskDescription.description;
};

export const getTaskCreateDate = () => {
  const createTaskDate = new Date();
  const date = createTaskDate.getDate();
  const day = createTaskDate.getDay();
  const month = createTaskDate.getMonth();
  const year = createTaskDate.getFullYear();
  return { year, month, date, day };
};

export const getLocalizationCreateAndDoneTaskDateHandler = (
  currentTaskDate: IDate,
  languageIndex: number
) => {
  const finalDate =
    typeof currentTaskDate === 'undefined'
      ? localeEN.showTaskDataContetnt.UNCOMPLEATE_TASK_MESSAGE[languageIndex]
      : `${localeEN.showTaskDataContetnt.DATE_DAYS[languageIndex][currentTaskDate.day]}, ${
          currentTaskDate.date
        } ${localeEN.showTaskDataContetnt.DATE_MONTH[languageIndex][currentTaskDate.month]} ${
          currentTaskDate.year
        } `;
  return finalDate;
};

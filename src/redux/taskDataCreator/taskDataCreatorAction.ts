import { ITask, ITaskDescriptionData, IUserBoard } from './../../types/types';
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
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const createTaskDate = new Date();
  const date = createTaskDate.getDate();
  const day = createTaskDate.getDay();
  const month = createTaskDate.getMonth();
  const year = createTaskDate.getFullYear();
  return `${days[day]}, ${date} ${months[month]}, ${year}`;
};

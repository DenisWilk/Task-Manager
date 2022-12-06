import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { ITask, IFetchQuery } from '../../types/types';
import { AppDispatch } from '../store';
import { setDragableTask } from './columnsSlice';

export const fetchGetAllUserTasks = createAsyncThunk<ITask[], IFetchQuery, { rejectValue: string }>(
  'fetch/fetchGetAllUserTasks',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }

    const userTasks: ITask[] = await response.json();
    return userTasks;
  }
);

export const fetchAddNewUserTasks = createAsyncThunk<ITask, IFetchQuery, { rejectValue: string }>(
  'fetch/fetchAddNewUserTasks',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify(dataForFetch.taskData),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }

    const newTask: ITask = await response.json();
    return newTask;
  }
);

export const fetchRemoveUserTask = createAsyncThunk<
  IFetchQuery,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchRemoveUserTask', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks/${dataForFetch.taskId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
    }
  );

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }
  return dataForFetch;
});

export const fetchChangeUserTask = createAsyncThunk<ITask, IFetchQuery>(
  'fetch/fetchChangeUserTask',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks/${dataForFetch.taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify({
          ...dataForFetch.taskData,
          boardId: dataForFetch.boardId,
          columnId: dataForFetch.columnId,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const editedTask: ITask = await response.json();
    return editedTask;
  }
);

export const fetchChangeOrderTask = createAsyncThunk<ITask, IFetchQuery>(
  'fetch/fetchChangeOrderTask',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks/${dataForFetch.taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify({
          title: dataForFetch.taskData?.title,
          order: dataForFetch.taskData?.order,
          description: dataForFetch.taskData?.description,
          userId: dataForFetch.userId,
          boardId: dataForFetch.boardId,
          columnId: dataForFetch.columnId,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const editedTask: ITask = await response.json();
    return editedTask;
  }
);

export const fetchMarkTasksAsDone = createAsyncThunk<ITask, IFetchQuery>(
  'fetch/fetchChangeDoneTask',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks/${dataForFetch.taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify({
          ...dataForFetch.taskData,
          boardId: dataForFetch.boardId,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const completeTask: ITask = await response.json();
    return completeTask;
  }
);

export const fetchChangeColumnTask = createAsyncThunk<
  ITask,
  IFetchQuery,
  { rejectValue: string; dispatch: AppDispatch }
>('change/changeColumnTask', async (dataForFetch, { rejectWithValue, dispatch }) => {
  const response: Response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}/tasks/${dataForFetch.taskId}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
      body: JSON.stringify({
        title: dataForFetch.taskData?.title,
        order: dataForFetch.taskData?.order,
        description: dataForFetch.taskData?.description,
        userId: dataForFetch.userId,
        boardId: dataForFetch.boardId,
        columnId: dataForFetch.newColumn,
      }),
    }
  );

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }
  const editedTask: ITask = await response.json();
  dispatch(setDragableTask(editedTask));
  return editedTask;
});

export const fetchFiles = createAsyncThunk<
  Blob,
  { taskId: string; filename: string; token: string }
>('files/fetchFiles', async (dataForFetch, { rejectWithValue }) => {
  const responseFile = await fetch(
    `${Endpoints.FILE}/${dataForFetch.taskId}/${dataForFetch.filename}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${dataForFetch.token}`,
      },
    }
  );

  if (!responseFile.ok) {
    const data = await responseFile.json();
    return rejectWithValue(data.message);
  }

  return await responseFile.blob();
});

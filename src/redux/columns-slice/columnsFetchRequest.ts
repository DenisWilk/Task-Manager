import { IFetchQuery, IBoard, IColumn } from './../../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { AppDispatch } from '../store';
import {
  setDoneColumnListByBoardId,
  setUserCurrentBoardListForTaskProgressBar,
} from './columnsSlice';

export const fetchGetUserBoardByID = createAsyncThunk<IBoard, IFetchQuery, { rejectValue: string }>(
  'fetch/fetchGetUserBoardByID',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const currentUserBoard: IBoard = await response.json();
    return currentUserBoard;
  }
);

export const fetchGetUserColumnByID = createAsyncThunk<
  IColumn,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchGetUserColumnByID', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}`,
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
  const columnById: IColumn = await response.json();
  return columnById;
});

export const fetchGetAllUserColumns = createAsyncThunk<
  IColumn[],
  IFetchQuery,
  { rejectValue: string; dispatch: AppDispatch }
>('fetch/fetchGetAllUserColumns', async (dataForFetch, { rejectWithValue, dispatch }) => {
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}/columns`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }

  const userColumn: IColumn[] = await response.json();
  dispatch(setDoneColumnListByBoardId({ boardId: dataForFetch.boardId!, doneColumn: userColumn }));
  return userColumn;
});

export const fetchAddNewUserColumns = createAsyncThunk<
  IColumn,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchAddNewUserColumns', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}/columns`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
    body: JSON.stringify(dataForFetch.boardData),
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }

  const newUserColumn: IColumn = await response.json();
  return newUserColumn;
});

export const fetchRemoveUserColumn = createAsyncThunk<
  IFetchQuery,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchRemoveUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnId}`,
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

export const fetchChangeUserColumn = createAsyncThunk<IColumn, IFetchQuery>(
  'fetch/fetchChangeUserColumn',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnData?.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${dataForFetch.token}`,
        },
        body: JSON.stringify({
          title: dataForFetch.columnData?.title,
          order: dataForFetch.columnData?.order,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const newColumn = (await response.json()) as IColumn;
    return newColumn;
  }
);

export const fetchChangeOrderColumn = createAsyncThunk<
  IColumn,
  IFetchQuery,
  { rejectValue: string }
>('columns/fetchChangeOrderColumn', async (dataForFetch, { rejectWithValue }) => {
  const response = await fetch(
    `${Endpoints.BOARDS}/${dataForFetch.boardId}/columns/${dataForFetch.columnData?.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
      body: JSON.stringify({
        title: dataForFetch.columnData?.title,
        order: dataForFetch.newOrder,
      }),
    }
  );

  if (!response.ok) {
    const userData = await response.json();
    return rejectWithValue(userData.message);
  }

  return (await response.json()) as IColumn;
});

export const fetchGetUserBoardByIDForUserBoardList = createAsyncThunk<
  IBoard,
  IFetchQuery,
  { rejectValue: string; dispatch: AppDispatch }
>(
  'fetch/fetchGetUserBoardByIDForUserBoardList',
  async (dataForFetch, { rejectWithValue, dispatch }) => {
    const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const currentUserBoard: IBoard = await response.json();
    dispatch(setUserCurrentBoardListForTaskProgressBar(currentUserBoard));
    return currentUserBoard;
  }
);

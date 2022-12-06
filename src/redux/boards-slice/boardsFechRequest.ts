import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../endpoints/endpoints';
import { IUserBoard, IFetchQuery } from '../../types/types';

export const fetchGetUserBoards = createAsyncThunk<IUserBoard[], string, { rejectValue: string }>(
  'fetch/fetchGetUserBoards',
  async (token, { rejectWithValue }) => {
    const response: Response = await fetch(Endpoints.BOARDS, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }

    const userBoards: IUserBoard[] = await response.json();
    return userBoards;
  }
);

export const fetchAddNewUserBoard = createAsyncThunk<
  IUserBoard,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchAddNewUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(Endpoints.BOARDS, {
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

  const userBoards: IUserBoard = await response.json();
  return userBoards;
});

export const fetchRemoveUserBoard = createAsyncThunk<
  IFetchQuery,
  IFetchQuery,
  { rejectValue: string }
>('fetch/fetchRemoveUserBoard', async (dataForFetch, { rejectWithValue }) => {
  const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${dataForFetch.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
  }
  return dataForFetch;
});

export const fetchChangeUserBoard = createAsyncThunk<IUserBoard, IFetchQuery>(
  'fetch/fetchChangeUserBoard',
  async (dataForFetch, { rejectWithValue }) => {
    const response: Response = await fetch(`${Endpoints.BOARDS}/${dataForFetch.boardId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${dataForFetch.token}`,
      },
      body: JSON.stringify(dataForFetch.boardData),
    });

    if (!response.ok) {
      return rejectWithValue(`Somethig went wrong. Responseend with ${response.status}`);
    }
    const newData = (await response.json()) as IUserBoard;
    return newData;
  }
);

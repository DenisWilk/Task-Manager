import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFetchQuery, IUser, IUserForm } from '../../types/types';
import { Endpoints } from '../../endpoints/endpoints';

interface IUserState {
  user: IUser;
  token: string;
  error: string;
  password?: string;
  isSignIn: boolean;
  spinnerStatus: boolean;
}

const initFormState: IUserState = {
  user: {
    id: '',
    name: '',
    login: '',
  },
  password: '',
  token: '',
  error: '',
  isSignIn: false,
  spinnerStatus: false,
};

export const fetchRegistration = createAsyncThunk<IUser, IUserForm, { rejectValue: string }>(
  'register/fetchRegister',
  async (user, { rejectWithValue, dispatch }) => {
    const response: Response = await fetch(Endpoints.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      if (response.status === 409) {
        return rejectWithValue('userExist');
      }
      const userData = await response.json();
      return rejectWithValue(userData.message);
    }

    const userData: IUser = await response.json();
    if (user.password != null) {
      dispatch(userSlice.actions.setPassword(user.password));
    }
    return userData;
  }
);

export const fetchLogin = createAsyncThunk<string, IUserForm, { rejectValue: string }>(
  'login/fetchLogin',
  async (user, { rejectWithValue, dispatch }) => {
    const response: Response = await fetch(Endpoints.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      if (response.status === 403) {
        return rejectWithValue('userNotExist');
      }
      const userData = await response.json();
      return rejectWithValue(userData.message);
    }

    const userData = await response.json();
    dispatch(userSlice.actions.setUserLogin(user.login));
    dispatch(userSlice.actions.setPassword(''));
    return userData.token;
  }
);

export const fetchEditUserData = createAsyncThunk<IUserForm, IFetchQuery, { rejectValue: string }>(
  'edit/fetchEdit',
  async (user, { rejectWithValue }) => {
    const response = await fetch(`${Endpoints.USERS}/${user.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: user.userData?.name,
        login: user.userLogin,
        password: user.userData?.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.message);
    }

    const userData: IUserForm = await response.json();
    return userData;
  }
);

export const fetchDeleteUser = createAsyncThunk<string, IFetchQuery, { rejectValue: string }>(
  'edit/fetchDelete',
  async (user, { rejectWithValue }) => {
    const response = await fetch(`${Endpoints.USERS}/${user.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.message);
    }

    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: 'userData',
  initialState: initFormState,
  reducers: {
    setUserData(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserLogin(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setSignInStatus(state, action: PayloadAction<boolean>) {
      state.isSignIn = action.payload;
    },
    setSpinnerStatus(state, action: PayloadAction<boolean>) {
      state.spinnerStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = '';
        state.spinnerStatus = false;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.token = '';
        state.user.login = '';
        state.user.name = '';
        state.user.id = '';
        state.error = action.payload ? action.payload : '';
        state.spinnerStatus = false;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.user.name = '';
        state.user.id = '';
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = '';
        state.isSignIn = true;
        state.spinnerStatus = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.user.name = '';
        state.user.id = '';
        state.user.login = '';
        state.token = '';
        state.error = action.payload ? action.payload : '';
        state.isSignIn = false;
        state.spinnerStatus = false;
      })
      .addCase(fetchEditUserData.pending, (state) => {
        state.error = '';
        state.spinnerStatus = true;
      })
      .addCase(fetchEditUserData.fulfilled, (state, action) => {
        state.error = '';
        state.spinnerStatus = false;
        action.payload.name !== undefined ? (state.user.name = action.payload.name) : false;
        state.user.login = action.payload.login;
      })
      .addCase(fetchDeleteUser.rejected, (state) => {
        state.error = '';
        state.user.id = '';
        state.user.name = '';
        state.user.login = '';
        state.password = '';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload !== undefined ? action.payload : '';
        state.spinnerStatus = false;
      });
  },
});
export const { setUserData, setUserToken, setSignInStatus, setSpinnerStatus } = userSlice.actions;

export default userSlice.reducer;

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

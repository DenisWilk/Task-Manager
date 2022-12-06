import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setSpinnerStatus,
  setUserData,
  setUserToken,
  setSignInStatus,
} from '../../redux/user-slice/userSlice';
import { clearBordsData } from '../../redux/boards-slice/boardsSlice';
import Spinner from '../../UI/spinner/Spinner';

function LogOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const { spinnerStatus } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSpinnerStatus(false));
    }, 500);

    dispatch(setUserData({ id: '', name: '', login: '' }));
    dispatch(setUserToken(''));
    dispatch(setSignInStatus(false));
    dispatch(clearBordsData({}));

    navigate('/', { replace: true });
  }, []);

  return <>{spinnerStatus && <Spinner />}</>;
}

export default LogOut;

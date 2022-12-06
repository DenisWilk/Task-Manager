import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';

type Props = { children: JSX.Element };

const AuthRequire: React.FC<Props> = ({ children }) => {
  const { isSignIn } = useAppSelector((state) => state.userSlice);

  return isSignIn ? <>{children}</> : <Navigate to="/" />;
};

export default AuthRequire;

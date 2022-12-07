import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';

type Props = { children: JSX.Element };

const NotAuthRequire: React.FC<Props> = ({ children }) => {
  const { isSignIn, user } = useAppSelector((state) => state.userSlice);

  return !isSignIn ? <>{children}</> : <Navigate to={`/boards/${user.login}`} />;
};

export default NotAuthRequire;

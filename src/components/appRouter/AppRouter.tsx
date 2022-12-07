import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardsPage from '../../pages/boards-page/BoardsPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import WelcomePage from '../../pages/welcome-page/WelcomePage';
import Layout from './Layout';
import { RegisterPage } from '../../pages/register-page/RegisterPage';
import { LoginPage } from '../../pages/login-page/LoginPage';
import SingleBoard from '../../pages/single-board-page/SingleBoard';
import LogOut from '../log-out/LogOut';
import AuthRequire from '../../hoc/AuthRequire';
import { EditProfilePage } from '../../pages/edit-profile/EditProfile';
import NotAuthRequire from '../../hoc/NotAuthRequire';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="boards/:user"
          element={
            <AuthRequire>
              <BoardsPage />
            </AuthRequire>
          }
        />
        <Route
          path="boards/:user/:boardId"
          element={
            <AuthRequire>
              <SingleBoard />
            </AuthRequire>
          }
        />
        <Route
          path="login"
          element={
            <NotAuthRequire>
              <LoginPage />
            </NotAuthRequire>
          }
        />
        <Route
          path="register"
          element={
            <NotAuthRequire>
              <RegisterPage />
            </NotAuthRequire>
          }
        />
        <Route path="logout" element={<LogOut />} />
        <Route path="profile" element={<EditProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import { GlobalModal } from '../../UI/global-modal/GlobalModal';
import Footer from '../footer/Footer';
import ColumnsAndTaskForm from '../forms/columnsAndTaskForm/ColumnsAndTaskForm';
import CreateBoardForm from '../forms/createBoardForm/CreateBoardForm';
import Header from '../header/Header';
import ShowTaskData from '../task/show-task-data/ShowTaskData';

export default function Layout() {
  const lang = useAppSelector((state) => state.settingsSlice);
  const isModalOpen = useAppSelector((state) => state.modalSlice.isModalOpen);
  const isRemoveBoard = useAppSelector((state) => state.modalSlice.isRemoveBoard);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const isCreateTask = useAppSelector((state) => state.modalSlice.isCreateTask);
  const isEditTask = useAppSelector((state) => state.modalSlice.isEditTask);
  const isShowTask = useAppSelector((state) => state.modalSlice.isShowTask);
  const currentPropComponent = isRemoveBoard ? (
    localeEN.modalContetntMessage.REMOVE_BOARD_CONFIRM_MESSAGE[lang.languageIndex]
  ) : isCreateColumn || isCreateTask || isEditTask ? (
    <ColumnsAndTaskForm />
  ) : isShowTask ? (
    <ShowTaskData />
  ) : (
    <CreateBoardForm />
  );
  return (
    <>
      <Header />
      {isModalOpen && <GlobalModal component={currentPropComponent} />}
      <Outlet />
      <Footer />
    </>
  );
}

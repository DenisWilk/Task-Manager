import { InitState } from '../../redux/modal-slice/modalSlice';
import removeSound from '../../../src/assets/removeWarningModal.mp3';
import openModalSound from '../../../src/assets/openModalWindow.mp3';

export default async function openAndRemoveModalSound(modalSliceState: InitState) {
  const { isModalOpen, isRemoveBoard, isRemoveColumn, isRemoveTask } = modalSliceState;
  const isRemove = isRemoveBoard || isRemoveColumn || isRemoveTask;
  const modalSound = new Audio();
  modalSound.src = isModalOpen && isRemove ? removeSound : openModalSound;
  modalSound.crossOrigin = 'anonymous';
  modalSound.play();
}

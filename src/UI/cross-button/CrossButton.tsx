import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import './crossButton.css';

interface IProp {
  id?: string;
  goToModalWindow: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CrossButton(props: IProp) {
  const { id, goToModalWindow } = props;
  const state = useAppSelector((store) => store.settingsSlice);

  return (
    <>
      <button
        id={id}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => goToModalWindow(e)}
        className="boarder-previwe-item__remove-button"
      >
        <svg
          className={'remove-button__cross ' + state.themeIndex}
          width="35"
          viewBox="0 0 1024 1024"
        >
          <path
            className={'remove-button__cross ' + state.themeIndex}
            fill="#5a5a5a"
            d="M256 832c0 52.992 42.976 96 96 96h320c52.992 0 96-43.008 96-96l64-512h-640l64 512zM608 416h64v416h-64v-416zM480 416h64v416h-64v-416zM352 416h64v416h-64v-416zM816 192h-208c0 0-14.336-64-32-64h-128c-17.696 0-32 64-32 64h-208c-26.528 0-48 21.472-48 48s0 48 0 48h704c0 0 0-21.472 0-48s-21.504-48-48-48z"
          ></path>
        </svg>
      </button>
    </>
  );
}

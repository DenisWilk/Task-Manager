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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          enableBackground="new 0 0 50 50"
        >
          <path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z" />
          <path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z" />
        </svg>
      </button>
    </>
  );
}

import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';

export const AddTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <title>{localeEN.tooltips.ADD_TASK[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path fill="#000" d="M512 192h-192v-192h-128v192h-192v128h192v192h128v-192h192z"></path>
    </svg>
  );
};

export const DeleteColumnSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg viewBox="0 0 1024 1024">
      <title>{localeEN.tooltips.DELETE_COLUMN[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path
        fill="#000"
        d="M256 832c0 52.992 42.976 96 96 96h320c52.992 0 96-43.008 96-96l64-512h-640l64 512zM608 416h64v416h-64v-416zM480 416h64v416h-64v-416zM352 416h64v416h-64v-416zM816 192h-208c0 0-14.336-64-32-64h-128c-17.696 0-32 64-32 64h-208c-26.528 0-48 21.472-48 48s0 48 0 48h704c0 0 0-21.472 0-48s-21.504-48-48-48z"
      ></path>
    </svg>
  );
};

export const DeleteTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg width="1024" height="1024" viewBox="0 0 1024 1024">
      <title>{localeEN.tooltips.DELETE_TASK[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path
        fill="#000"
        d="M256 832c0 52.992 42.976 96 96 96h320c52.992 0 96-43.008 96-96l64-512h-640l64 512zM608 416h64v416h-64v-416zM480 416h64v416h-64v-416zM352 416h64v416h-64v-416zM816 192h-208c0 0-14.336-64-32-64h-128c-17.696 0-32 64-32 64h-208c-26.528 0-48 21.472-48 48s0 48 0 48h704c0 0 0-21.472 0-48s-21.504-48-48-48z"
      ></path>
    </svg>
  );
};

export const DefaultTaskIcon = () => {
  return (
    <svg width="1024" height="1024" viewBox="0 0 1024 1024">
      <title></title>
      <g id="icomoon-ignore"></g>
      <path
        fill="#e51937"
        d="M765.013 496.043l118.699 298.155h-183.381l-77.867-202.069-421.76 284.459-158.037-338.987h34.773l187.307 145.835 324.693-176.981-46.293-120.32-49.835 105.856-210.688 115.883 151.595-398.592h216.619l86.272 216.747 286.891-156.373v-269.653h-1024v1024h1024v-702.635z"
      ></path>
    </svg>
  );
};

export const UploadFileIcon = () => {
  return (
    <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 485 485">
      <path
        d="M233,378.7c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l107.5-107.5c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0L256,336.5
			v-323C256,6,250,0,242.5,0S229,6,229,13.5v323l-84.4-84.4c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1L233,378.7z"
      />
      <path d="M426.5,458h-368C51,458,45,464,45,471.5S51,485,58.5,485h368c7.5,0,13.5-6,13.5-13.5S434,458,426.5,458z" />
    </svg>
  );
};

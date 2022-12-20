import React, { useEffect, useRef, useState } from 'react';
import { IComleteColumn, ITask, ITaskDescriptionData } from '../../types/types';
import { ButtonDeleteTask } from '../../UI/task-buttons/ButtonDeleteTask';
import { ButtonDoneTask } from '../../UI/task-buttons/ButtonDoneTask';
import { ButtonEditTask } from '../../UI/task-buttons/ButtonEditTask';
import './task.css';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Endpoints } from '../../endpoints/endpoints';
import { localeEN } from '../../locales/localeEN';
import { ButtonShowTask } from '../../UI/task-buttons/ButtonShowTask';
import { setIsDoneTask } from '../../redux/modal-slice/modalSlice';
import Spinner from '../../UI/spinner/Spinner';

interface IProp {
  task: ITask;
  index: number;
  column: IComleteColumn;
}

export const Task = (props: IProp) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userSlice);
  const { id, order, title, description, files } = props.task;
  const fileBtn = useRef<HTMLInputElement | null>(null);
  const [fileCounter, setFileCounter] = useState<number | undefined>(0);
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  const [currentTaskDescription, setCurrentTaskDescription] = useState<ITaskDescriptionData>();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await handleFetch(event.currentTarget.files![0]);
  };

  const handleLoadFile = () => {
    fileBtn.current?.click();
  };

  const handleFetch = async (file: File) => {
    const formData = new FormData();
    formData.append('taskId', id);
    formData.append('file', file as string | File);

    const response = await fetch(`${Endpoints.FILE}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: 'multipart/form-data',
      },
      body: formData,
    });

    if (response.ok) {
      setFileCounter(() => (fileCounter ? fileCounter + 1 : 1));
    }
  };

  useEffect(() => {
    setFileCounter(files?.length !== undefined ? files.length : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files?.length]);

  useEffect(() => {
    dispatch(
      setIsDoneTask(
        localeEN.columnContet.DEFAULT_DONE_COLUMN.some((lang) => lang === props.column.title)
      )
    );
  }, [dispatch, props.column.title]);

  useEffect(() => {
    setCurrentTaskDescription(JSON.parse(description));
  }, [description]);

  return (
    <Draggable draggableId={id} index={props.index}>
      {(provided) => (
        <div
          className="task"
          id={id}
          style={{ order: `${order}` }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <svg className="task-hand-svg" viewBox="0 0 24 24">
            <rect fill="none" height="24" width="24" />
            <path d="M23,5.5V20c0,2.2-1.8,4-4,4h-7.3c-1.08,0-2.1-0.43-2.85-1.19L1,14.83c0,0,1.26-1.23,1.3-1.25 c0.22-0.19,0.49-0.29,0.79-0.29c0.22,0,0.42,0.06,0.6,0.16C3.73,13.46,8,15.91,8,15.91V4c0-0.83,0.67-1.5,1.5-1.5S11,3.17,11,4v7 h1V1.5C12,0.67,12.67,0,13.5,0S15,0.67,15,1.5V11h1V2.5C16,1.67,16.67,1,17.5,1S19,1.67,19,2.5V11h1V5.5C20,4.67,20.67,4,21.5,4 S23,4.67,23,5.5z" />
          </svg>
          <div className="task__content-block">
            <h3 className="task__title">{title}</h3>
            <div className="task__description">
              <p className="task__description_content">
                {currentTaskDescription ? currentTaskDescription!.description : null}
              </p>
            </div>
          </div>
          <div className="task_button-block">
            <ButtonDoneTask id={id} task={props.task} column={props.column} />
            <ButtonEditTask id={id} column={props.column} />
            <button
              className="upload-file-task"
              onClick={handleLoadFile}
              title={localeEN.tooltips.UPLOAD_FILE[languageIndex]}
              disabled={localeEN.columnContet.DEFAULT_DONE_COLUMN.some(
                (lang) => lang === props.column.title
              )}
            ></button>
            <input
              type="file"
              autoComplete="off"
              onChange={handleFile}
              ref={fileBtn}
              className="vis-hidden"
              accept="image/*"
            />
            <span className="task__counter-files">{fileCounter}</span>
            <ButtonShowTask id={id} column={props.column} />
            <ButtonDeleteTask id={id} column={props.column} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

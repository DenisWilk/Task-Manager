import React, { useEffect, useState } from 'react';
import './taskFiles.css';
import { useAppSelector } from '../../redux/hooks';
import { TaskFilesRow } from './task-file-row/TaskFilesRow';
import { Endpoints } from '../../endpoints/endpoints';
import { IFiles, ITask } from '../../types/types';

export const TaskFiles = () => {
  const { currentTaskId, userCurrentBoard, currentColumnId } = useAppSelector(
    (state) => state.columnsSlice
  );
  const { token } = useAppSelector((state) => state.userSlice);
  const [filesArray, setFilesArray] = useState<IFiles[]>([]);

  const getFiles = async () => {
    const response: Response = await fetch(
      `${Endpoints.BOARDS}/${userCurrentBoard.id}/columns/${currentColumnId}/tasks/${currentTaskId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data: ITask = await response.json();
      data.files ? setFilesArray(data.files) : setFilesArray([]);
    }
  };

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {filesArray.length ? (
        <article className="task-files-wrapper">
          <h3 className="task-files__title">Uploaded files</h3>
          <div className="task-files-item title">
            <span className="file-name">name</span>
            <span className="file-size">size</span>
            <span className="file-img">file</span>
          </div>
          <div className="task-files-content">
            {filesArray.map((file, index) => (
              <TaskFilesRow
                key={currentTaskId + index}
                taskId={currentTaskId}
                fileName={file.filename}
                fileSize={file.fileSize}
              />
            ))}
          </div>
        </article>
      ) : null}
    </>
  );
};

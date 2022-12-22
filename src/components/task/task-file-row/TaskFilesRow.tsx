import React, { useEffect, useState } from 'react';
import './taskFilesRow.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Endpoints } from '../../../endpoints/endpoints';
import { Link } from 'react-router-dom';
import { setModalOpen } from '../../../redux/modal-slice/modalSlice';

type Props = {
  taskId: string;
  fileName: string;
  fileSize: number;
};

export const TaskFilesRow = (props: Props) => {
  const { taskId, fileName, fileSize } = props;
  const { token } = useAppSelector((state) => state.userSlice);
  const [taskFiles, setTaskFiles] = useState<Blob>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user.login);
  const currentBoardId = useAppSelector((state) => state.boardsSlice.currentBoardId);
  const currentTaskId = useAppSelector((state) => state.columnsSlice.currentTaskId);

  const getFile = async () => {
    const responseFile = await fetch(`${Endpoints.FILE}/${taskId}/${fileName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (responseFile.ok) {
      const data = await responseFile.blob();
      setTaskFiles(data);
    }
  };

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentFileSize =
    String(fileSize).length >= 7
      ? `${(fileSize / 1000000).toFixed(2)} mb`
      : `${(fileSize / 1000).toFixed(2)} kb`;
  return (
    <Link
      className="link-to-show-file"
      to={`boards/${user}/${currentBoardId}/${currentTaskId}/${fileName}`}
      onClick={() => dispatch(setModalOpen(false))}
    >
      <div className="task-files-item">
        <span className="file-name">{fileName}</span>
        <span className="file-size">{currentFileSize}</span>
        <span className="file-preview">
          {taskFiles && (
            <img
              className="image"
              alt={fileName}
              src={taskFiles && URL.createObjectURL(taskFiles as Blob)}
            />
          )}
        </span>
      </div>
    </Link>
  );
};

import React, { useEffect, useState } from 'react';
import './taskFilesRow.css';
import { useAppSelector } from '../../../redux/hooks';
import { Endpoints } from '../../../endpoints/endpoints';

type Props = {
  taskId: string;
  fileName: string;
  fileSize: number;
};

export const TaskFilesRow = (props: Props) => {
  const { taskId, fileName, fileSize } = props;
  const { token } = useAppSelector((state) => state.userSlice);
  const [taskFiles, setTaskFiles] = useState<Blob>();

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

  return (
    <div className="task-files-item">
      <span className="file-name">{fileName}</span>
      <span className="file-size">{fileSize}</span>
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
  );
};

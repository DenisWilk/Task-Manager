import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Endpoints } from '../../endpoints/endpoints';
import { useAppSelector } from '../../redux/hooks';
import Spinner from '../../UI/spinner/Spinner';
import './showFilePage.css';

export default function ShowFilePage() {
  const { fileName } = useParams();
  const { token } = useAppSelector((state) => state.userSlice);
  const currentTaskId = useAppSelector((state) => state.columnsSlice.currentTaskId);
  const [taskFiles, setTaskFiles] = useState<Blob>();

  const getFile = async () => {
    const responseFile = await fetch(`${Endpoints.FILE}/${currentTaskId}/${fileName}`, {
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
    <section className="show-file-page">
      <div className="show-file-page__file-container">
        {!taskFiles && <Spinner />}
        {taskFiles && (
          <img
            className="image"
            alt={fileName}
            src={taskFiles && URL.createObjectURL(taskFiles as Blob)}
          />
        )}
      </div>
    </section>
  );
}

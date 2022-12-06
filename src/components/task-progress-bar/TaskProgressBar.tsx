import React, { useEffect, useRef, useState } from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import './taskProgressBar.css';
interface IProp {
  boardId?: string;
}
export default function TaskProgressBar(props: IProp) {
  const userCurrentBoard = useAppSelector((state) => state.columnsSlice.userCurrentBoard);
  const { languageIndex, themeIndex } = useAppSelector((state) => state.settingsSlice);
  const [uncompleteTasks, setUncompleteTasks] = useState<number>(0);
  const [doneTasks, setDoneTasks] = useState<number>(0);
  const [visible, setVisible] = useState<DocumentVisibilityState | undefined>('hidden');
  const [step, setStep] = useState<number>(0);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressScale = useRef<HTMLDivElement>(null);
  const isBoardPageOpen = useAppSelector((state) => state.columnsSlice.isBoardPageOpen);
  const isSingleBoardPageOpen = useAppSelector((state) => state.columnsSlice.isSingleBoardPageOpen);
  const userCurrentBoardListForTaskProgressBar = useAppSelector(
    (state) => state.columnsSlice.userCurrentBoardListForTaskProgressBar
  );

  useEffect(() => {
    if (isSingleBoardPageOpen && userCurrentBoard.columns !== undefined) {
      setTimeout(() => {
        const doneTasks = userCurrentBoard.columns
          .filter(
            (column) =>
              column.title ===
              localeEN.columnContet.DEFAULT_DONE_COLUMN.filter(
                (title) => title === column.title
              ).at(-1)
          )
          .map((column) => column.tasks.length)
          .reduce((sum, num) => sum + num, 0);

        const tasksAll = userCurrentBoard.columns
          .filter(
            (column) =>
              column.title !==
              localeEN.columnContet.DEFAULT_DONE_COLUMN.filter(
                (title) => title === column.title
              ).at(-1)
          )
          .map((column) => column.tasks.length)
          .reduce((sum, num) => sum + num, 0);

        setUncompleteTasks(tasksAll + doneTasks!);
        setDoneTasks(doneTasks!);
      }, 1000);
    }
  }, [isSingleBoardPageOpen, userCurrentBoard.columns]);

  useEffect(() => {
    doneTasks === 0 && uncompleteTasks === 0 ? setVisible('hidden') : setVisible('visible');
    const progressBarWidth = parseInt(window.getComputedStyle(progressBar.current!).width);
    setStep(progressBarWidth / uncompleteTasks);
  }, [doneTasks, step, uncompleteTasks]);

  useEffect(() => {
    if (isBoardPageOpen) {
      const donedTasks = userCurrentBoardListForTaskProgressBar!
        .filter((board) => board.id === props.boardId)
        .at(-1)!
        .columns!.filter(
          (column) =>
            column.title ===
            localeEN.columnContet.DEFAULT_DONE_COLUMN.filter((title) => title === column.title).at(
              -1
            )
        )
        .at(-1)?.tasks.length;

      const allTasks = userCurrentBoardListForTaskProgressBar!
        .filter((board) => board.id === props.boardId)
        .at(-1)!
        .columns!.filter(
          (column) =>
            column.title !==
            localeEN.columnContet.DEFAULT_DONE_COLUMN.filter((title) => title === column.title).at(
              -1
            )
        )
        .map((column) => column.tasks.length)
        .reduce((sum, num) => sum + num, 0);

      setDoneTasks(donedTasks!);
      setUncompleteTasks(allTasks + donedTasks!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBoardPageOpen]);

  return (
    <div className="progress-block">
      <div className={'done-task ' + themeIndex}>
        <span className="done-task_text">
          {isBoardPageOpen ? (
            <></>
          ) : (
            `${localeEN.columnContet.PROGRES_DONE[languageIndex]}: ${doneTasks}`
          )}
        </span>
      </div>
      <div ref={progressBar} className={'progress-bar ' + themeIndex}>
        <div
          ref={progressScale}
          className={'progress-scale ' + themeIndex}
          style={{
            width: `${step * doneTasks}px`,
            visibility: visible,
          }}
        ></div>
      </div>
      <div className={'total-task ' + themeIndex}>
        <span className="total-task_text">
          {isBoardPageOpen ? (
            <></>
          ) : (
            `${localeEN.columnContet.PROGRES_TOTAL[languageIndex]}: ${uncompleteTasks}`
          )}
        </span>
      </div>
    </div>
  );
}

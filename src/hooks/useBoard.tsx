import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { initBoard, initMines } from "../lib/initBoard";
import { GameType, typeInfo } from "../constants/game";
import { setTimerActive, setTimesZero } from "../redux/timerSlice";
import {
  initRevealAndFlagArr,
  revealBox,
  revealOneBox,
  setFlagNum,
} from "../redux/revealSlice";
import { IndexType, MineSizeType } from "@/type";

export default function useBoard() {
  const [type, setType] = useState<GameType>(GameType.BEGINNER);

  const [fail, setFail] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [customMines, setCustomMines] = useState<number>(10);

  const { revealedArr, flagArr, concealNum, flagNum } = useSelector(
    (state: RootState) => state.reveal
  );

  const dispatch = useDispatch();

  const { rows, cols, mines } = typeInfo[type];
  const board = useRef<number[][]>([[]]);

  const resetBoardInfo = () => {
    setFail(false);
    setSuccess(false);
    setStart(false);
    dispatch(setTimerActive(false));
    dispatch(setTimesZero());
  };

  const resetBoardArr = ({ rows, cols, mines }: MineSizeType) => {
    // 너비 높이에 따라 board array 생성
    const boardArr = initBoard({ rows, cols });
    board.current = boardArr;

    // 열린칸을 판단하기 위한 revealArr와 깃발을 위한 flagArr 생성
    dispatch(initRevealAndFlagArr({ rows, cols, mines }));
  };

  useEffect(() => {
    resetBoardInfo();
    resetBoardArr({ rows, cols, mines });
  }, [type]);

  useEffect(() => {
    // 남아있는 칸의 수와 지뢰수가 같아지면 성공
    const currentMines = type === GameType.CUSTOM ? customMines : mines;
    if (concealNum === currentMines) {
      setSuccess(true);
      dispatch(setFlagNum(0));
      dispatch(setTimerActive(false));
    }
  }, [concealNum]);

  const handleFirstClick = ({
    rowIndex,
    colIndex,
    mines,
  }: {
    rowIndex: number;
    colIndex: number;
    mines: number;
  }) => {
    // 지뢰수에 맞게 지뢰 생성
    const mineBoard = initMines({
      board: board.current,
      rows: board.current.length,
      cols: board.current[0].length,
      mines,
      targetIndex: `${rowIndex},${colIndex}`,
    });

    board.current = mineBoard;
    setStart(true);
    dispatch(setTimerActive(true));

    return mineBoard[rowIndex][colIndex];
  };

  const handleOnClickBox = ({
    value,
    rowIndex,
    colIndex,
    mines,
  }: {
    value: number;
    rowIndex: number;
    colIndex: number;
    mines: number;
  }) => {
    if (!start) {
      const firstValue = handleFirstClick({ rowIndex, colIndex, mines });
      value = firstValue;
    }
    if (revealedArr[rowIndex][colIndex]) {
      return;
    }
    if (success || fail) {
      return;
    }
    if (value === -1) {
      setFail(true);
      dispatch(setTimerActive(false));

      return;
    }
    if (value !== 0) {
      dispatch(revealOneBox({ rowIndex, colIndex }));
      return;
    }
    if (value === 0) {
      dispatch(revealBox({ rowIndex, colIndex, board: board.current }));
      return;
    }
  };

  const restart = ({ rows, cols, mines }: MineSizeType) => {
    resetBoardInfo();
    resetBoardArr({ rows, cols, mines });
  };

  const onClickCustom = ({
    rows: customRows,
    cols: customCols,
    mines: customMines,
  }: MineSizeType) => {
    if (customCols > 100 || customRows > 100) {
      alert("너비와 높이는 100까지 가능합니다");
      return;
    }
    if (customMines > (customRows * customCols) / 3) {
      alert("지뢰수는 너비와 높이의 곱의 1/3까지 가능합니다");
      return;
    }

    resetBoardInfo();
    resetBoardArr({
      rows: customRows,
      cols: customCols,
      mines: customMines,
    });
    setCustomMines(customMines);
  };

  return {
    type,
    flagNum,
    success,
    fail,
    revealedArr,
    flagArr,
    setType,
    onClickCustom,
    handleOnClickBox,
    restart,
    board: board.current,
    mines: type === GameType.CUSTOM ? customMines : mines,
  };
}

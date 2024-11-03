import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { GameType } from "../constants/game";
import { setTimerActive, setTimesZero } from "../redux/timerSlice";
import { setBoardInfo, setType } from "../redux/boardSlice";
import { IndexType, MineSizeType } from "@/type";
import { resetStatus, setFail, setSuccess } from "../redux/statusSlice";
import useSetBoard from "./useSetBoard";

export default function useBoard() {
  const [start, setStart] = useState<boolean>(true);

  const {
    resetBoard,
    initMines,
    revealOneBox,
    revealBox,
    toggleFlag,
    setFlagNum,
    boardArr,
    revealedArr,
    flagArr,
    concealNum,
    flagNum,
  } = useSetBoard();

  const { type, info: boardInfo } = useSelector(
    (state: RootState) => state.board
  );
  const { rows, cols, mines } = boardInfo;

  const { fail, success } = useSelector((state: RootState) => state.status);

  const dispatch = useDispatch();

  const resetBoardInfo = () => {
    dispatch(resetStatus());
    setStart(false);
    dispatch(setTimerActive(false));
    dispatch(setTimesZero());
  };

  useEffect(() => {
    resetBoard();
    resetBoardInfo();
  }, [type, rows, cols, mines]);

  useEffect(() => {
    // 남아있는 칸의 수와 지뢰수가 같아지면 성공
    if (concealNum === mines) {
      dispatch(setSuccess(true));
      setFlagNum(0);
      dispatch(setTimerActive(false));
    }
  }, [concealNum]);

  const handleFirstClick = ({ rowIndex, colIndex }: IndexType) => {
    // 지뢰수에 맞게 지뢰 생성
    const value = initMines({ rowIndex, colIndex });
    setStart(true);
    dispatch(setTimerActive(true));

    if (value !== 0) {
      revealOneBox({ rowIndex, colIndex });
      return;
    }
    if (value === 0) {
      revealBox({ rowIndex, colIndex });
      return;
    }
  };

  const handleOnClickBox = ({
    value,
    rowIndex,
    colIndex,
  }: {
    value: number;
    rowIndex: number;
    colIndex: number;
  }) => {
    if (!start) {
      handleFirstClick({ rowIndex, colIndex });
      return;
    }
    if (revealedArr[rowIndex][colIndex]) {
      return;
    }
    if (success || fail) {
      return;
    }
    if (value === -1) {
      dispatch(setFail(true));
      dispatch(setTimerActive(false));

      return;
    }
    if (value !== 0) {
      revealOneBox({ rowIndex, colIndex });
      return;
    }
    if (value === 0) {
      revealBox({ rowIndex, colIndex });
      return;
    }
  };

  const restart = () => {
    resetBoardInfo();
    resetBoard();
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

    dispatch(setType(GameType.CUSTOM));
    dispatch(
      setBoardInfo({
        rows: customRows,
        cols: customCols,
        mines: customMines,
      })
    );
  };

  return {
    board: boardArr,
    revealedArr,
    flagArr,
    flagNum,
    onClickCustom,
    handleOnClickBox,
    restart,
    toggleFlag,
  };
}

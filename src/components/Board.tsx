import { useEffect, useRef, useState } from "react";
import { initBoard, initMines } from "../lib/initBoard";
import { GameType, typeInfo } from "../constants/game";
import Box from "./Box";
import { useDispatch, useSelector } from "react-redux";
import {
  IndexType,
  initRevealAndFlagArr,
  MineSizeType,
  revealBox,
  revealOneBox,
  setFlagNum,
  toggleFlag,
} from "../redux/revealSlice";
import { RootState } from "@/redux/store";
import GameTypeButton from "./GameTypeButton";
import CustomType from "./CustomType";
import Timer from "./Timer";
import { setTimerActive, setTimesZero } from "../redux/timerSlice";

export default function Board() {
  const [type, setType] = useState<GameType>(GameType.BEGINNER);

  const [fail, setFail] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

  const { revealedArr, flagArr, concealNum, flagNum } = useSelector(
    (state: RootState) => state.reveal
  );

  const dispatch = useDispatch();

  const { rows, cols, mines } = typeInfo[type];
  const board = useRef<number[][]>([[]]);

  useEffect(() => {
    setFail(false);
    setSuccess(false);
    setStart(false);
    dispatch(setTimerActive(false));
    dispatch(setTimesZero());
    // 너비 높이에 따라 board array 생성
    const initBoardArr = initBoard({ rows, cols });
    board.current = initBoardArr;

    // 열린칸을 판단하기 위한 revealArr와 깃발을 위한 flagArr 생성
    dispatch(initRevealAndFlagArr({ rows, cols, mines }));
  }, [type]);

  useEffect(() => {
    // 남아있는 칸의 수와 지뢰수가 같아지면 성공
    if (concealNum === mines) {
      setSuccess(true);
      dispatch(setFlagNum(0));
      dispatch(setTimerActive(false));
    }
  }, [concealNum]);

  const getBoardSize = (rows: number, cols: number) => {
    return {
      width: `${cols * 8 * 4}px`,
      height: `${rows * 8 * 4}px`,
    };
  };

  const handleFirstClick = ({ rowIndex, colIndex }: IndexType) => {
    // 지뢰수에 맞게 지뢰 생성
    const mineBoard = initMines({
      board: board.current,
      rows,
      cols,
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
  }: {
    value: number;
    rowIndex: number;
    colIndex: number;
  }) => {
    if (!start) {
      const firstValue = handleFirstClick({ rowIndex, colIndex });
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

  const restart = () => {
    setFail(false);
    setSuccess(false);
    setStart(false);
    dispatch(setTimerActive(false));
    dispatch(setTimesZero());
    const boardArr = initBoard({ rows, cols });

    board.current = boardArr;
    dispatch(initRevealAndFlagArr({ rows, cols, mines }));
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
    const initCustomBoardArr = initBoard({
      rows: customRows,
      cols: customCols,
    });

    board.current = initCustomBoardArr;
    dispatch(
      initRevealAndFlagArr({
        rows: customRows,
        cols: customCols,
        mines: customMines,
      })
    );
    setFail(false);
    setSuccess(false);
    setStart(false);
    dispatch(setTimerActive(false));
    dispatch(setTimesZero());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <GameTypeButton setType={setType} />
      <div className="h-10">
        {type === GameType.CUSTOM && (
          <CustomType onClickCustom={onClickCustom} />
        )}
      </div>

      <div className="w-[320px] flex flex-col justify-center items-center gap-2">
        <div
          className="flex justify-between"
          style={{
            width: getBoardSize(board.current.length, board.current[0].length)
              .width,
          }}
        >
          <div className="flex justify-center items-center w-10 h-8 border border-blue-300">
            {flagNum}
          </div>
          <button
            className="w-20 h-8 p-1 border rounded-lg hover:bg-slate-200"
            onClick={restart}
          >
            {success && "성공"}
            {fail && "실패"}
            {!success && !fail && "다시시작"}
          </button>
          <Timer />
        </div>

        <div
          className={`flex flex-wrap`}
          style={{
            width: getBoardSize(board.current.length, board.current[0].length)
              .width,
            height: getBoardSize(board.current.length, board.current[0].length)
              .height,
          }}
        >
          {board.current.map((rows, rowIndex) => {
            return rows.map((value, colIndex) => {
              return (
                <Box
                  key={`${rowIndex}-${colIndex}`}
                  value={value}
                  revealed={revealedArr[rowIndex][colIndex]}
                  flagged={
                    (!success && flagArr[rowIndex][colIndex]) ||
                    (success && value === -1)
                  }
                  failed={fail}
                  onClick={() =>
                    handleOnClickBox({ value, rowIndex, colIndex })
                  }
                  onContextMenu={() =>
                    dispatch(toggleFlag({ rowIndex, colIndex }))
                  }
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

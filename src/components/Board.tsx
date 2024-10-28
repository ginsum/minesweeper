import { useEffect, useRef, useState } from "react";
import { initBoard, initMines } from "../lib/initBoard";
import { GameType, typeInfo } from "../constants/game";
import Box from "./Box";
import { useDispatch, useSelector } from "react-redux";
import {
  initRevealAndFlagArr,
  revealBox,
  revealOneBox,
  toggleFlag,
} from "../redux/revealSlice";
import { RootState } from "@/redux/store";

export default function Board() {
  const [type, setType] = useState<GameType>(GameType.BEGINNER);
  const [start, setStart] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const { revealedArr, flagArr, concealNum } = useSelector(
    (state: RootState) => state.reveal
  );

  const dispatch = useDispatch();

  const { rows, cols, mines } = typeInfo[type];
  const board = useRef<number[][]>([[]]);

  // 너비 높이에 따라 board array 생성
  const initBoardArr = initBoard({ rows, cols });

  useEffect(() => {
    if (!start) {
      // 지뢰수에 맞게 지뢰 생성
      const mineBoard = initMines({
        board: initBoardArr,
        rows,
        cols,
        mines,
      });

      board.current = mineBoard;
      // 열린칸을 판단하기 위한 revealArr와 깃발을 위한 flagArr 생성
      dispatch(initRevealAndFlagArr({ rows, cols, mines }));
      setStart(true);
    }
  }, []);

  useEffect(() => {
    // 남아있는 칸의 수와 지뢰수가 같아지면 성공
    if (concealNum === mines) {
      setSuccess(true);
    }
  }, [concealNum]);

  const getBoardSize = () => {
    return {
      width: `${cols * 8 * 4}px`,
      height: `${rows * 8 * 4}px`,
    };
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
    if (revealedArr[rowIndex][colIndex]) {
      return;
    }
    if (success || fail) {
      return;
    }
    if (value === -1) {
      setFail(true);
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

  return (
    <div
      className={`flex flex-wrap`}
      style={{
        width: getBoardSize().width,
        height: getBoardSize().height,
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
              onClick={() => handleOnClickBox({ value, rowIndex, colIndex })}
              onContextMenu={() => dispatch(toggleFlag({ rowIndex, colIndex }))}
            />
          );
        });
      })}
    </div>
  );
}

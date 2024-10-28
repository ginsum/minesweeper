import { useEffect, useRef, useState } from "react";
import { initBoard, initMines } from "../lib/initBoard";
import { GameType, typeInfo } from "../type";
import Box from "./Box";

export default function Board() {
  const [type, setType] = useState<GameType>(GameType.BEGINNER);
  const [start, setStart] = useState<boolean>(false);

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
      setStart(true);
    }
  }, []);

  const getBoardSize = () => {
    return {
      width: `${cols * 8 * 4}px`,
      height: `${rows * 8 * 4}px`,
    };
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
          return <Box key={`${rowIndex}-${colIndex}`} value={value} />;
        });
      })}
    </div>
  );
}

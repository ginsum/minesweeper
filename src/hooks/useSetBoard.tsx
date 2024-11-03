import { directions } from "../constants";
import { IndexType, RevealType } from "@/type";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function useSetBoard() {
  const [boardArr, setBoardArr] = useState<number[][]>([[]]);
  const [revealedArr, setRevealedArr] = useState<boolean[][]>([[]]);
  const [flagArr, setFlagArr] = useState<boolean[][]>([[]]);
  const [flagNum, setFlagNum] = useState<number>(0);
  const [concealNum, setConcealNum] = useState<number>(0);

  const { info: boardInfo } = useSelector((state: RootState) => state.board);

  const { rows, cols, mines } = boardInfo;

  const resetBoard = () => {
    const initBoardArr = Array.from({ length: rows }, () =>
      Array(cols).fill(0)
    );
    const initRevealedArr = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );
    const initFlagArr = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );

    setBoardArr(initBoardArr);
    setRevealedArr(initRevealedArr);
    setFlagArr(initFlagArr);
    setConcealNum(rows * cols);
    setFlagNum(mines);
  };

  const initMines = ({ rowIndex, colIndex }: IndexType) => {
    const sliceBoardArr = [...boardArr];

    const minePositions: string[] = [];

    for (let i = 0; minePositions.length < mines; i++) {
      const mineRow = Math.floor(Math.random() * rows);
      const mineCol = Math.floor(Math.random() * cols);
      const position = `${mineRow},${mineCol}`;

      if (
        !minePositions.includes(position) &&
        `${rowIndex},${colIndex}` !== position
      ) {
        minePositions.push(position);
        sliceBoardArr[mineRow][mineCol] = -1;
      }
    }
    minePositions.forEach((position) => {
      const [row, col] = position.split(",").map(Number);
      directions.forEach(([directionRow, directionCol]) => {
        const currentRow = row + directionRow;
        const currentCol = col + directionCol;

        if (
          currentRow >= 0 &&
          currentCol >= 0 &&
          currentRow < rows &&
          currentCol < cols &&
          sliceBoardArr[currentRow][currentCol] !== -1
        ) {
          sliceBoardArr[currentRow][currentCol] += 1;
        }
      });
    });

    setBoardArr(sliceBoardArr);
    return sliceBoardArr[rowIndex][colIndex];
  };

  const revealOneBox = ({ rowIndex, colIndex }: IndexType) => {
    const updateReveal = [...revealedArr];
    updateReveal[rowIndex][colIndex] = true;
    setRevealedArr(updateReveal);
    setConcealNum(concealNum - 1);
  };

  const revealBox = ({ rowIndex, colIndex }: IndexType) => {
    const updateReveal = [...revealedArr];
    let revealedNumber = 0;

    const reveal = ({ rowIndex, colIndex, board }: RevealType) => {
      if (
        revealedArr[rowIndex][colIndex] ||
        board[rowIndex][colIndex] === -1 ||
        flagArr[rowIndex][colIndex]
      ) {
        return;
      }

      updateReveal[rowIndex][colIndex] = true;
      revealedNumber += 1;

      directions.forEach(([directionRow, directionCol]) => {
        const currentRow = rowIndex + directionRow;
        const currentCol = colIndex + directionCol;

        if (
          currentRow >= 0 &&
          currentCol >= 0 &&
          currentRow < board.length &&
          currentCol < board[0].length &&
          !updateReveal[currentRow][currentCol] &&
          !flagArr[currentRow][currentCol]
        ) {
          if (board[currentRow][currentCol] === 0) {
            reveal({ rowIndex: currentRow, colIndex: currentCol, board });
          } else {
            updateReveal[currentRow][currentCol] = true;
            revealedNumber += 1;
            return;
          }
        }
      });
    };
    reveal({ rowIndex, colIndex, board: boardArr });
    setRevealedArr(updateReveal);
    setConcealNum(concealNum - revealedNumber);
  };

  const toggleFlag = ({ rowIndex, colIndex }: IndexType) => {
    if (revealedArr[rowIndex][colIndex]) {
      return;
    }
    const updateFlag = [...flagArr];
    if (!updateFlag[rowIndex][colIndex]) {
      updateFlag[rowIndex][colIndex] = true;
      setFlagNum(flagNum - 1);
    } else {
      updateFlag[rowIndex][colIndex] = false;
      setFlagNum(flagNum + 1);
    }

    setFlagArr(updateFlag);
  };

  return {
    boardArr,
    revealedArr,
    flagArr,
    concealNum,
    flagNum,
    resetBoard,
    initMines,
    revealOneBox,
    revealBox,
    toggleFlag,
    setFlagNum,
  };
}

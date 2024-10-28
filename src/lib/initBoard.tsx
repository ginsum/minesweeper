import { directions } from "../constants";

export function initBoard({ rows, cols }: { rows: number; cols: number }) {
  const boardArr = Array.from({ length: rows }, () => Array(cols).fill(0));

  return boardArr;
}

export function initMines({
  board,
  rows,
  cols,
  mines,
}: {
  board: number[][];
  rows: number;
  cols: number;
  mines: number;
}) {
  const minePositions: string[] = [];
  for (let i = 0; minePositions.length < mines; i++) {
    const mineRow = Math.floor(Math.random() * rows);
    const mineCol = Math.floor(Math.random() * cols);
    const position = `${mineRow},${mineCol}`;

    if (!minePositions.includes(position)) {
      minePositions.push(position);
      board[mineRow][mineCol] = -1;
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
        board[currentRow][currentCol] !== -1
      ) {
        board[currentRow][currentCol] += 1;
      }
    });
  });

  return board;
}

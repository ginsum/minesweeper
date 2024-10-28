import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { directions } from "../constants";

interface SizeType {
  rows: number;
  cols: number;
}
interface IndexType {
  rowIndex: number;
  colIndex: number;
}

interface RevealType extends IndexType {
  board: number[][];
}

export interface RevealState {
  revealedArr: boolean[][];
}

const initialState: RevealState = {
  revealedArr: [[]],
};

export const revealSlice = createSlice({
  name: "reveal",
  initialState,
  reducers: {
    initRevealArr: (state, action: PayloadAction<SizeType>) => {
      const { rows, cols } = action.payload;
      const initReveal = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
      );
      state.revealedArr = initReveal;
    },
    revealOneBox: (state, action: PayloadAction<IndexType>) => {
      const { rowIndex, colIndex } = action.payload;
      const updateReveal = [...state.revealedArr];
      updateReveal[rowIndex][colIndex] = true;
      state.revealedArr = updateReveal;
    },
    revealBox: (state, action: PayloadAction<RevealType>) => {
      const { rowIndex, colIndex, board } = action.payload;
      const updateReveal = [...state.revealedArr];

      const reveal = ({ rowIndex, colIndex, board }: RevealType) => {
        if (
          state.revealedArr[rowIndex][colIndex] ||
          board[rowIndex][colIndex] === -1
        ) {
          return;
        }

        updateReveal[rowIndex][colIndex] = true;

        directions.forEach(([directionRow, directionCol]) => {
          const currentRow = rowIndex + directionRow;
          const currentCol = colIndex + directionCol;

          if (
            currentRow >= 0 &&
            currentCol >= 0 &&
            currentRow < board.length &&
            currentCol < board[0].length
          ) {
            if (board[currentRow][currentCol] === 0) {
              reveal({ rowIndex: currentRow, colIndex: currentCol, board });
            } else {
              updateReveal[currentRow][currentCol] = true;
              return;
            }
          }
        });
      };
      reveal({ rowIndex, colIndex, board });
      state.revealedArr = updateReveal;
    },
  },
});

export const { initRevealArr, revealOneBox, revealBox } = revealSlice.actions;

export default revealSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { directions } from "../constants";
import { IndexType, MineSizeType, RevealType } from "@/type";

export interface RevealState {
  revealedArr: boolean[][];
  flagArr: boolean[][];
  flagNum: number;
  concealNum: number;
}

const initialState: RevealState = {
  revealedArr: [[]],
  flagArr: [[]],
  flagNum: 0,
  concealNum: 0,
};

export const revealSlice = createSlice({
  name: "reveal",
  initialState,
  reducers: {
    initRevealAndFlagArr: (state, action: PayloadAction<MineSizeType>) => {
      const { rows, cols, mines } = action.payload;
      const initArr = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
      );
      state.revealedArr = initArr;
      state.flagArr = initArr;
      state.concealNum = rows * cols;
      state.flagNum = mines;
    },
    revealOneBox: (state, action: PayloadAction<IndexType>) => {
      const { rowIndex, colIndex } = action.payload;
      const updateReveal = [...state.revealedArr];
      updateReveal[rowIndex][colIndex] = true;
      state.revealedArr = updateReveal;
      state.concealNum -= 1;
    },
    revealBox: (state, action: PayloadAction<RevealType>) => {
      const { rowIndex, colIndex, board } = action.payload;
      const updateReveal = [...state.revealedArr];
      let revealedNumber = 0;

      const reveal = ({ rowIndex, colIndex, board }: RevealType) => {
        if (
          state.revealedArr[rowIndex][colIndex] ||
          board[rowIndex][colIndex] === -1 ||
          state.flagArr[rowIndex][colIndex]
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
            !state.flagArr[currentRow][currentCol]
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
      reveal({ rowIndex, colIndex, board });
      state.revealedArr = updateReveal;
      state.concealNum = state.concealNum - revealedNumber;
    },
    toggleFlag: (state, action: PayloadAction<IndexType>) => {
      const { rowIndex, colIndex } = action.payload;

      if (state.revealedArr[rowIndex][colIndex]) {
        return;
      }
      const updateFlag = [...state.flagArr];
      if (!updateFlag[rowIndex][colIndex]) {
        updateFlag[rowIndex][colIndex] = true;
        state.flagNum -= 1;
      } else {
        updateFlag[rowIndex][colIndex] = false;
        state.flagNum += 1;
      }

      state.flagArr = updateFlag;
    },
    setFlagNum: (state, action: PayloadAction<number>) => {
      state.flagNum = action.payload;
    },
  },
});

export const {
  initRevealAndFlagArr,
  revealOneBox,
  revealBox,
  toggleFlag,
  setFlagNum,
} = revealSlice.actions;

export default revealSlice.reducer;

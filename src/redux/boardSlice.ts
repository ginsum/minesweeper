import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MineSizeType } from "@/type";
import { GameType, typeInfo } from "../constants/game";

export interface BoardState {
  type: GameType;
  info: {
    rows: number;
    cols: number;
    mines: number;
  };
  showCustomButton: boolean;
}

const initialState: BoardState = {
  type: GameType.BEGINNER,
  info: {
    rows: typeInfo[GameType.BEGINNER].rows,
    cols: typeInfo[GameType.BEGINNER].cols,
    mines: typeInfo[GameType.BEGINNER].mines,
  },
  showCustomButton: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardInfo: (state, action: PayloadAction<MineSizeType>) => {
      state.info = action.payload;
    },
    setType: (state, action: PayloadAction<GameType>) => {
      state.type = action.payload;
      if (action.payload !== GameType.CUSTOM) {
        state.info = typeInfo[action.payload];
      }
    },
    setShowCustomButton: (state, action: PayloadAction<boolean>) => {
      state.showCustomButton = action.payload;
    },
  },
});

export const { setBoardInfo, setType, setShowCustomButton } =
  boardSlice.actions;

export default boardSlice.reducer;

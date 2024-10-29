import { useDispatch } from "react-redux";
import useBoard from "../hooks/useBoard";
import { GameType } from "../constants/game";
import { toggleFlag } from "../redux/revealSlice";
import Box from "./Box";
import GameTypeButton from "./GameTypeButton";
import CustomType from "./CustomType";
import Timer from "./Timer";
import { getBoardSize } from "../lib/util";

export default function Board() {
  const {
    board,
    type,
    flagNum,
    success,
    fail,
    revealedArr,
    flagArr,
    mines,
    setType,
    onClickCustom,
    handleOnClickBox,
    restart,
  } = useBoard();

  const dispatch = useDispatch();

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
            width: getBoardSize(board.length, board[0].length).width,
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
            width: getBoardSize(board.length, board[0].length).width,
            height: getBoardSize(board.length, board[0].length).height,
          }}
        >
          {board.map((rows, rowIndex) => {
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
                    handleOnClickBox({ value, rowIndex, colIndex, mines })
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

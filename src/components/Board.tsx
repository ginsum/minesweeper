import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useBoard from "../hooks/useBoard";
import { getBoardSize } from "../lib/util";
import Box from "./Box";
import GameTypeButton from "./GameTypeButton";
import CustomType from "./CustomType";
import Timer from "./Timer";

export default function Board() {
  const { fail, success } = useSelector((state: RootState) => state.status);
  const { info: boardInfo, showCustomButton } = useSelector(
    (state: RootState) => state.board
  );
  const { rows, cols } = boardInfo;

  const {
    board,
    flagNum,
    revealedArr,
    flagArr,
    onClickCustom,
    handleOnClickBox,
    restart,
    toggleFlag,
  } = useBoard();

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <GameTypeButton />
      <div className="h-10">
        {showCustomButton && <CustomType onClickCustom={onClickCustom} />}
      </div>

      <div className="w-[320px] flex flex-col justify-center items-center gap-2">
        <div
          className="flex justify-between"
          style={{
            width: getBoardSize(rows, cols).width,
          }}
        >
          <div className="flex justify-center items-center w-10 h-8 border border-blue-300">
            {flagNum}
          </div>
          <button
            className="w-20 h-8 p-1 border rounded-lg hover:bg-slate-200"
            onClick={() => restart()}
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
            width: getBoardSize(rows, cols).width,
            height: getBoardSize(rows, cols).height,
          }}
        >
          {board.length > 0 &&
            board.map((rows, rowIndex) => {
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
                    onContextMenu={() => toggleFlag({ rowIndex, colIndex })}
                  />
                );
              });
            })}
        </div>
      </div>
    </div>
  );
}

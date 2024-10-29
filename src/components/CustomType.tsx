import { MineSizeType } from "../redux/revealSlice";
import { useState } from "react";
import { GameType } from "../constants/game";

export default function CustomType({
  onClickCustom,
}: {
  onClickCustom: (num: MineSizeType) => void;
}) {
  const [size, setSize] = useState<MineSizeType>({
    rows: 8,
    cols: 8,
    mines: 10,
  });
  return (
    <>
      <div className={"flex justify-center gap-4"}>
        <input
          className="w-10 border"
          type="number"
          value={size.rows}
          onChange={(e) => setSize({ ...size, rows: Number(e.target.value) })}
        />
        <input
          className="w-10 border"
          type="number"
          value={size.cols}
          onChange={(e) => setSize({ ...size, cols: Number(e.target.value) })}
        />
        <input
          className="w-10 border"
          type="number"
          value={size.mines}
          onChange={(e) => setSize({ ...size, mines: Number(e.target.value) })}
        />
        <button
          className="w-10 border"
          onClick={() =>
            onClickCustom({
              rows: size.rows,
              cols: size.cols,
              mines: size.mines,
            })
          }
        >
          OK
        </button>
      </div>
    </>
  );
}

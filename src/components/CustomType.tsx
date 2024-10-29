import { MineSizeType } from "../redux/revealSlice";
import { useState } from "react";

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
        <div className="flex items-center gap-2">
          <div className="text-sm">높이</div>
          <input
            className="w-14 h-8 border"
            type="number"
            maxLength={100}
            value={size.rows}
            onChange={(e) => setSize({ ...size, rows: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">너비</div>

          <input
            className="w-14 h-8 border"
            type="number"
            maxLength={100}
            value={size.cols}
            onChange={(e) => setSize({ ...size, cols: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">지뢰수</div>
          <input
            className="w-14 h-8 border"
            type="number"
            maxLength={(size.rows * size.cols) / 3}
            value={size.mines}
            onChange={(e) =>
              setSize({ ...size, mines: Number(e.target.value) })
            }
          />
        </div>
        <button
          className="w-10 border-2 rounded-lg hover:bg-slate-200"
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

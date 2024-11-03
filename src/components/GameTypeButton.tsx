import { useDispatch } from "react-redux";
import { setShowCustomButton, setType } from "../redux/boardSlice";
import { gameTypes, GameType } from "../constants/game";

export default function GameTypeButton() {
  const dispatch = useDispatch();

  return (
    <div className={"flex w-[440px] justify-between items-center gap-2"}>
      <div className="text-sm">난이도 설정</div>
      {gameTypes.map((el) => (
        <button
          key={el}
          className="p-2 border-2 rounded-lg hover:bg-slate-200"
          onClick={() =>
            el !== GameType.CUSTOM
              ? dispatch(setType(el))
              : dispatch(setShowCustomButton(true))
          }
        >
          {el}
        </button>
      ))}
    </div>
  );
}

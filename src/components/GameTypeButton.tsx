import { gameTypes, GameType } from "../constants/game";

export default function GameTypeButton({
  setType,
}: {
  setType: (el: GameType) => void;
}) {
  return (
    <>
      <div className={"flex w-[320px] justify-between"}>
        {gameTypes.map((el) => (
          <button key={el} className="border" onClick={() => setType(el)}>
            {el}
          </button>
        ))}
      </div>
    </>
  );
}

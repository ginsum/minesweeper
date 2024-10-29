import flagImage from "../assets/flag.png";
import mineImage from "../assets/mine.png";

const bgColor = ({ revealed }: { revealed: boolean }) => {
  if (revealed) {
    return "bg-slate-300";
  }
  return "bg-slate-200";
};

export default function Box({
  value,
  revealed,
  flagged,
  failed,
  onClick,
  onContextMenu,
}: {
  value: number;
  revealed: boolean;
  flagged: boolean;
  failed: boolean;
  onClick: () => void;
  onContextMenu: () => void;
}) {
  const handleOnContextMenu = (e: any) => {
    e.preventDefault();
    onContextMenu();
  };

  return (
    <div
      className={`w-8 h-8 flex justify-center items-center border border-slate-100 ${bgColor(
        { revealed }
      )}`}
      onClick={onClick}
      onContextMenu={handleOnContextMenu}
    >
      {revealed && value !== 0 ? value : ""}
      {flagged && <img src={flagImage} className="w-8 h-8" />}
      {failed && value === -1 && !flagged && (
        <img src={mineImage} className="w-8 h-8" />
      )}
    </div>
  );
}

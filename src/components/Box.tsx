import flagImage from "../assets/flag.png";

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
  onClick,
  onContextMenu,
}: {
  value: number;
  revealed: boolean;
  flagged: boolean;
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
      {/* {value} */}
      {revealed && value !== 0 ? value : ""}
      {flagged && <img src={flagImage} className="w-8 h-8" />}
    </div>
  );
}

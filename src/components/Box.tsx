const bgColor = ({ revealed }: { revealed: boolean }) => {
  if (revealed) {
    return "bg-slate-300";
  }
  return "bg-slate-200";
};

export default function Box({
  value,
  revealed,
  onClick,
}: {
  value: number;
  revealed: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-8 h-8 flex justify-center items-center border border-slate-100 ${bgColor(
        { revealed }
      )}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

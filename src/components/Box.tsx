export default function Box({ value }: { value: number }) {
  return (
    <div
      className={`w-8 h-8 flex justify-center items-center border border-slate-100`}
    >
      {value}
    </div>
  );
}

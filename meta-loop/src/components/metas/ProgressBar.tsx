export default function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div className="h-5 w-full rounded-full bg-background border border-borderc overflow-hidden">
      <div
        className="h-full rounded-r-full transition-[width] duration-500"
        style={{
          width: `${pct}%`,
          background:
            'linear-gradient(90deg, rgba(34,197,94,0.9) 0%, rgba(132,204,22,0.9) 40%, rgba(59,130,246,0.9) 100%)',
        }}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
}

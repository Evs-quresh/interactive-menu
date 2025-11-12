type TrendObject = {
  label: string;
  value: string;
  isPositive?: boolean;
};

type StatCardProps = {
  title: string;
  value: string;
  helperText?: string;
  // allow either a structured trend object or a simple string (legacy pages pass strings)
  trend?: string | TrendObject;
  // optional hint used when a simple string is provided
  trendDirection?: "up" | "down" | string;
};

export default function StatCard({
  title,
  value,
  helperText,
  trend,
  trendDirection,
}: StatCardProps) {
  // compute class and text for trend display to avoid nested JSX parsing issues
  let trendClass: string | null = null;
  let trendText: string | null = null;

  if (trend) {
    if (typeof trend === "string") {
      const positive = trendDirection === "up" || trendDirection === "positive";
      trendClass = positive
        ? "font-medium text-emerald-600"
        : "font-medium text-rose-600";
      trendText = trend;
    } else {
      trendClass = trend.isPositive
        ? "font-medium text-emerald-600"
        : "font-medium text-rose-600";
      trendText = `${trend.label} ${trend.value}`;
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        {helperText ? <p className="text-slate-500">{helperText}</p> : <span />}
        {trendText ? (
          <p className={trendClass ?? undefined}>{trendText}</p>
        ) : null}
      </div>
    </div>
  );
}

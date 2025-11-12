type StatCardProps = {
  title: string;
  value: string;
  helperText?: string;
  trend?: {
    label: string;
    value: string;
    isPositive?: boolean;
  };
};

export default function StatCard({ title, value, helperText, trend }: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        {helperText ? <p className="text-slate-500">{helperText}</p> : <span />}
        {trend ? (
          <p
            className={trend.isPositive ? "font-medium text-emerald-600" : "font-medium text-rose-600"}
          >
            {trend.label} {trend.value}
          </p>
        ) : null}
      </div>
    </div>
  );
}


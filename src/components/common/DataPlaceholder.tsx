import type { ReactNode } from "react";

type DataPlaceholderProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  hint?: string;
};

export default function DataPlaceholder({ icon, title, description, hint }: DataPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
      {icon ? <div className="text-3xl">{icon}</div> : null}
      <h3 className="text-base font-medium text-slate-700">{title}</h3>
      {description ? <p className="max-w-lg text-sm text-slate-500">{description}</p> : null}
      {hint ? <p className="text-xs uppercase tracking-wide text-slate-400">{hint}</p> : null}
    </div>
  );
}


type TopBarProps = {
  title: string;
  description?: string;
  onToggleSidebar: () => void;
  onToggleSidebarCollapse: () => void;
  isSidebarCollapsed: boolean;
};

export default function TopBar({
  title,
  description,
  onToggleSidebar,
  onToggleSidebarCollapse,
  isSidebarCollapsed,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary-200 hover:text-primary-600 md:hidden"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle sidebar</span>
            <span className="flex h-4 w-4 flex-col justify-between">
              <span className="h-0.5 w-full rounded bg-current" />
              <span className="h-0.5 w-full rounded bg-current" />
              <span className="h-0.5 w-full rounded bg-current" />
            </span>
          </button>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary-200 hover:text-primary-600 md:inline-flex"
            onClick={onToggleSidebarCollapse}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isSidebarCollapsed}
          >
            <CollapseIcon collapsed={isSidebarCollapsed} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 md:text-xl">{title}</h1>
            {description ? (
              <p className="text-sm text-slate-500">{description}</p>
            ) : (
              <p className="text-sm text-slate-500">
                Manage operations, orders, and immersive menu experiences.
              </p>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            View Docs
          </button>
          <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            New Action
          </button>
        </div>
      </div>
    </header>
  );
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {collapsed ? <path d="M10 6l6 6-6 6" /> : <path d="M14 6l-6 6 6 6" />}
    </svg>
  );
}


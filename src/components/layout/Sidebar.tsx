import clsx from "clsx";
import { NavLink } from "react-router-dom";

import type { NavItem } from "../../config/navigation";

type SidebarProps = {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export default function Sidebar({
  items,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <>
      <div
        className={clsx(
          "relative hidden flex-shrink-0 border-r border-slate-200 bg-white transition-all md:flex md:flex-col",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <Brand
          isCollapsed={isCollapsed}
          onToggleCollapse={onToggleCollapse}
        />
        <nav
          className={clsx(
            "flex-1 space-y-1 pb-6",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          {items.map((item) => (
            <NavItemLink
              key={item.path}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-slate-900/40 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white p-4 shadow-lg transition-transform md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Brand
          isCollapsed={false}
          onToggleCollapse={onClose}
          showCollapseButton={false}
        />
        <nav className="mt-4 space-y-1">
          {items.map((item) => (
            <NavItemLink key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>
      </div>
    </>
  );
}

type BrandProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showCollapseButton?: boolean;
};

function Brand({
  isCollapsed,
  onToggleCollapse,
  showCollapseButton = true,
}: BrandProps) {
  return (
    <div
      className={clsx(
        "flex items-center px-4 py-5 transition-all",
        isCollapsed ? "flex-col gap-3 px-0" : "justify-between"
      )}
    >
      {!isCollapsed && (
        <div className="text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
            ServeSense
          </p>
          <p className="text-xs text-slate-500">Next-gen restaurant control</p>
        </div>
      )}
      {isCollapsed && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-sm font-semibold uppercase text-primary-500">
          SS
        </span>
      )}
      {showCollapseButton && (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary-200 hover:text-primary-600"
        >
          <CollapseIcon collapsed={isCollapsed} />
        </button>
      )}
    </div>
  );
}

type NavItemLinkProps = {
  item: NavItem;
  onNavigate?: () => void;
  isCollapsed?: boolean;
};

function NavItemLink({
  item,
  onNavigate,
  isCollapsed = false,
}: NavItemLinkProps) {
  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }: { isActive: boolean }) =>
        clsx(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition",
          isCollapsed ? "justify-center gap-0" : "gap-3",
          isActive
            ? "bg-primary-50 text-primary-600 ring-1 ring-primary-100"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-500">
        <SidebarIcon name={item.icon} label={item.label} />
      </span>
      {!isCollapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

type SidebarIconProps = {
  name: string;
  label: string;
};

function SidebarIcon({ name, label }: SidebarIconProps) {
  const icons: Record<string, JSX.Element> = {
    chart: (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <path d="M5 19h14" />
        <path d="M8 19V9" />
        <path d="M12 19V5" />
        <path d="M16 19v-7" />
      </svg>
    ),
    menu: (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h10" />
      </svg>
    ),
    table: (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <rect x="3" y="6" width="18" height="12" rx="1.5" />
        <path d="M12 6v12" />
        <path d="M3 12h18" />
      </svg>
    ),
    receipt: (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
      </svg>
    ),
    cube: (
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
        <path d="M12 2l8 4v12l-8 4-8-4V6z" />
        <path d="M4 6l8 4 8-4" />
        <path d="M12 10v12" />
      </svg>
    ),
    analytics: (
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <path d="M4 19h16" />
        <path d="M6 16v-4" />
        <path d="M10 16V8" />
        <path d="M14 16v-6" />
        <path d="M18 16v-2" />
      </svg>
    ),
    settings: (
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
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.02A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.02a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.02a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    users: (
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    feedback: (
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
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  };

  return (
    icons[name] ?? (
      <span className="text-xs font-semibold uppercase">
        {label.slice(0, 2)}
      </span>
    )
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



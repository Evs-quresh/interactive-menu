import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  { label: "Live Orders", path: "/orders/live" },
  { label: "Order History", path: "/orders/history" },
];

export default function OrdersLayout() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Orders</h2>
          <p className="text-sm text-slate-500">Track live kitchen activity and revisit past orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Print latest
          </button>
          <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              isActive
                ? "rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                : "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}


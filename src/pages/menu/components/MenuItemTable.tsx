import clsx from "clsx";

export type MenuItemRow = {
  id: string;
  name: string;
  category: string;
  servings: string[];
  priceRange: string;
  tags: string[];
  availability: "active" | "inactive" | "scheduled";
  lastUpdated: string;
};

type MenuItemTableProps = {
  items: MenuItemRow[];
};

export default function MenuItemTable({ items }: MenuItemTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Menu Inventory</h3>
          <p className="text-sm text-slate-500">{items.length} items • showing dummy data for design preview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            className="w-56 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300"
            placeholder="Search name or ingredient"
          />
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Filters
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Export CSV
          </button>
        </div>
      </header>

      <div className="max-h-[420px] overflow-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Item</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Servings</th>
              <th className="px-5 py-3">Price Range</th>
              <th className="px-5 py-3">Tags</th>
              <th className="px-5 py-3">Last Updated</th>
              <th className="px-5 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-600">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <span className="text-xs text-slate-400">ID: {item.id}</span>
                  </div>
                </td>
                <td className="px-5 py-4">{item.category}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.servings.map((serving) => (
                      <span
                        key={serving}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                      >
                        {serving}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-900">{item.priceRange}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500">{item.lastUpdated}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <StatusPill status={item.availability} />
                    <button className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type StatusPillProps = {
  status: MenuItemRow["availability"];
};

function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        status === "active" && "bg-emerald-50 text-emerald-600",
        status === "inactive" && "bg-rose-50 text-rose-600",
        status === "scheduled" && "bg-amber-50 text-amber-600"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}


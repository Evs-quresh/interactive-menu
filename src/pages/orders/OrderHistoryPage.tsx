import { useMemo, useState } from "react";

import PageSection from "../../components/common/PageSection";

type HistoryOrder = {
  id: string;
  table: string;
  guests: number;
  items: string;
  total: string;
  payment: "Card" | "Cash" | "QR";
  status: "Completed" | "Cancelled";
  date: string;
  timeAgo: string;
  server: string;
  tips: string;
  notes?: string;
};

const HISTORY_ORDERS: HistoryOrder[] = [
  {
    id: "ORD-4987",
    table: "T02",
    guests: 2,
    items: "Lunar tasting menu · Zero proof pairing",
    total: "$218.40",
    payment: "Card",
    status: "Completed",
    date: "2024-11-01",
    timeAgo: "18 minutes ago",
    server: "Jordan",
    tips: "$42.00",
    notes: "Birthday celebration, added kitchen sparkler",
  },
  {
    id: "ORD-4986",
    table: "T14",
    guests: 4,
    items: "Chef omakase · Wine pairing",
    total: "$612.00",
    payment: "Card",
    status: "Completed",
    date: "2024-10-31",
    timeAgo: "1 hour ago",
    server: "Priya",
    tips: "$120.00",
  },
  {
    id: "ORD-4985",
    table: "T07",
    guests: 3,
    items: "À la carte · 3D dessert reveal",
    total: "$182.75",
    payment: "QR",
    status: "Completed",
    date: "2024-10-31",
    timeAgo: "2 hours ago",
    server: "Mia",
    tips: "$28.00",
    notes: "Guest requested dairy-free syrup",
  },
  {
    id: "ORD-4984",
    table: "T11",
    guests: 2,
    items: "Mocktail pairing · Shared plates",
    total: "$128.40",
    payment: "Cash",
    status: "Cancelled",
    date: "2024-10-31",
    timeAgo: "Cancelled 3 hours ago",
    server: "Liam",
    tips: "$0.00",
    notes: "Guest rescheduled due to emergency",
  },
  {
    id: "ORD-4983",
    table: "T04",
    guests: 1,
    items: "Lunch prix fixe",
    total: "$48.60",
    payment: "Card",
    status: "Completed",
    date: "2024-10-30",
    timeAgo: "Yesterday",
    server: "Alex",
    tips: "$9.00",
  },
  {
    id: "ORD-4982",
    table: "T19",
    guests: 6,
    items: "Family-style menu",
    total: "$354.20",
    payment: "QR",
    status: "Completed",
    date: "2024-10-29",
    timeAgo: "2 days ago",
    server: "Jamie",
    tips: "$68.00",
    notes: "Noted positive feedback on AR menu",
  },
];

const FILTERS = [
  { label: "Status", options: ["All", "Completed", "Cancelled"] },
  { label: "Table", options: ["Any", "T02", "T14", "T07", "T11"] },
  { label: "Date", options: ["Today", "This week", "This month"] },
];

export default function OrderHistoryPage() {
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredOrders = useMemo(() => {
    if (activeStatus === "All") return HISTORY_ORDERS;
    return HISTORY_ORDERS.filter((order) => order.status === activeStatus);
  }, [activeStatus]);

  return (
    <PageSection
      title="Order History"
      description="Search archived orders, revenue, and serving style breakdowns."
      action={
        <div className="flex gap-2">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Export PDF
          </button>
          <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            Export CSV
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-3 md:grid-cols-3">
          {FILTERS.map((filter) => (
            <div key={filter.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{filter.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => filter.label === "Status" && setActiveStatus(option)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      filter.label === "Status" && activeStatus === option
                        ? "border-primary-200 bg-primary-50 text-primary-600"
                        : "border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Guest & table</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Totals</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{order.id}</p>
                    <p className="text-xs text-slate-400">{order.timeAgo}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">Table {order.table}</p>
                    <p className="text-xs text-slate-500">Guests: {order.guests}</p>
                    <p className="text-xs text-slate-400">Server: {order.server}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p>{order.items}</p>
                    {order.notes ? <p className="text-xs text-primary-500">{order.notes}</p> : null}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{order.total}</p>
                    <p className="text-xs text-slate-500">Tips {order.tips}</p>
                    <p className="text-xs text-slate-400">Paid via {order.payment}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                        order.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                        View receipt
                      </button>
                      <button className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                        Reopen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>Showing {filteredOrders.length} of {HISTORY_ORDERS.length} archived orders.</span>
          <button className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Load more
          </button>
        </div>
      </div>
    </PageSection>
  );
}


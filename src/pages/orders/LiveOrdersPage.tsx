import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

type OrderStatus = "Pending" | "Preparing" | "Ready" | "Served";

type LiveOrder = {
  id: string;
  table: string;
  items: string;
  status: OrderStatus;
  time: string;
  guests?: number;
  rush?: boolean;
};

const INITIAL_ORDERS: LiveOrder[] = [
  {
    id: "ORD-5124",
    table: "T08",
    items: "2x Truffle Pasta, 1x Citrus Spritz",
    status: "Preparing",
    time: "5 min ago",
  },
  {
    id: "ORD-5125",
    table: "T03",
    items: "1x Vegan Bowl",
    status: "Pending",
    time: "Just now",
  },
  {
    id: "ORD-5121",
    table: "T14",
    items: "3x Sushi Flight",
    status: "Ready",
    time: "2 min ago",
  },
];

const STATUS_STEPS: OrderStatus[] = ["Pending", "Preparing", "Ready", "Served"];

export default function LiveOrdersPage() {
  const [orders, setOrders] = useState<LiveOrder[]>(INITIAL_ORDERS);
  const [recentAction, setRecentAction] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const headers = useMemo(
    () => [
      { key: "id", label: "Order ID" },
      { key: "table", label: "Table" },
      { key: "items", label: "Items" },
      { key: "status", label: "Status" },
      { key: "time", label: "Placed" },
      { key: "actions", label: "Actions" },
    ],
    []
  );

  const handleAdvance = (targetId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== targetId) return order;
        const currentIndex = STATUS_STEPS.indexOf(order.status);
        const nextStatus = STATUS_STEPS[currentIndex + 1] ?? order.status;
        if (nextStatus === order.status) {
          setRecentAction(`Order ${order.id} already served.`);
          return order;
        }
        setRecentAction(`Order ${order.id} moved to ${nextStatus}.`);
        return { ...order, status: nextStatus };
      })
    );
  };

  const handlePrint = (order: LiveOrder) => {
    const printWindow = window.open("", "_blank", "width=420,height=600");
    if (!printWindow) {
      setRecentAction("Unable to open print preview.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>${order.id} • Ticket</title>
          <style>
            body { font-family: sans-serif; margin: 32px; color: #1e293b; }
            h1 { font-size: 18px; margin-bottom: 8px; }
            p { margin: 4px 0; font-size: 14px; }
            .label { text-transform: uppercase; letter-spacing: .08em; font-size: 11px; color: #475569; margin-top: 16px; }
            .ticket { border: 1px dashed #cbd5f5; border-radius: 16px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h1>${order.id}</h1>
            <p><strong>Table:</strong> ${order.table}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Items:</strong><br />${order.items}</p>
            <p class="label">Placed</p>
            <p>${order.time}</p>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setRecentAction(`Print ticket opened for ${order.id}.`);
  };

  const handleCreate = (input: NewOrderInput) => {
    const timestamp = new Date();
    const newOrder: LiveOrder = {
      id: generateWalkInId(timestamp),
      table: input.table.trim().toUpperCase() || "TAKEOUT",
      items: input.items,
      status: "Pending",
      time: "Just now",
      guests: input.guests,
      rush: input.rush,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setRecentAction(`Walk-in ${newOrder.id} added${input.rush ? " • Rush" : ""}.`);
    setIsCreating(false);
  };

  const handleCloseSheet = () => {
    setIsCreating(false);
  };

  return (
    <PageSection
      title="Live Orders"
      description="Update kitchen status and print tickets as orders progress."
      action={
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
        >
          New walk-in order
        </button>
      }
    >
      <div className="space-y-4">
        {recentAction ? (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <span>{recentAction}</span>
            <button
              type="button"
              onClick={() => setRecentAction(null)}
              className="text-xs font-medium uppercase tracking-wide text-primary-600"
            >
              Dismiss
            </button>
          </div>
        ) : null}
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-medium text-slate-500">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className={header.key === "actions" ? "px-4 py-3 text-right" : "px-4 py-3"}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-600">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{order.id}</td>
                  <td className="px-4 py-3">{order.table}</td>
                  <td className="px-4 py-3">
                    <p>{order.items}</p>
                    {order.guests ? (
                      <p className="text-xs text-slate-400">Guests: {order.guests}</p>
                    ) : null}
                    {order.rush ? (
                      <span className="mt-1 inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-600">
                        Rush
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-600">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.time}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleAdvance(order.id)}
                        className="rounded-md border border-primary-100 px-3 py-1.5 text-sm font-medium text-primary-600 transition hover:border-primary-200 hover:bg-primary-50"
                      >
                        {order.status === "Served" ? "Completed" : "Advance"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrint(order)}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:border-primary-200 hover:text-primary-600"
                      >
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DataPlaceholder
          title="Kitchen display integration"
          description="Connect to websocket updates to refresh order statuses in real time."
          hint="Socket placeholder"
        />
      </div>

      {isCreating ? (
        <NewOrderSheet onClose={handleCloseSheet} onCreate={handleCreate} />
      ) : null}
    </PageSection>
  );
}

type NewOrderInput = {
  table: string;
  items: string;
  guests?: number;
  rush: boolean;
};

function NewOrderSheet({ onClose, onCreate }: { onClose: () => void; onCreate: (order: NewOrderInput) => void }) {
  const [table, setTable] = useState("T01");
  const [items, setItems] = useState("2x Signature Mocktail, 1x Wagyu Slider Flight");
  const [guests, setGuests] = useState<number | "">(2);
  const [rush, setRush] = useState(false);

  const isValid = items.trim().length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    onCreate({
      table,
      items: items.trim(),
      guests: guests === "" ? undefined : Number(guests),
      rush,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/70 p-4 md:items-center" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 rounded-3xl bg-white px-6 py-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Log Walk-in Order</h2>
            <p className="text-sm text-slate-500">Capture quick orders without POS sync and send straight to the kitchen.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Create ticket
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Table">
            <input
              value={table}
              onChange={(event) => setTable(event.target.value)}
              placeholder="T01"
              className={inputClassName}
            />
          </FormField>
          <FormField label="Guests" helperText="Optional">
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(event) => setGuests(event.target.value === "" ? "" : Number(event.target.value))}
              className={inputClassName}
              placeholder="2"
            />
          </FormField>
        </div>

        <FormField label="Items" helperText="Describe dishes and modifiers">
          <textarea
            value={items}
            onChange={(event) => setItems(event.target.value)}
            className={`${inputClassName} min-h-[120px]`}
            placeholder="1x Seared Scallops, 1x Gluten-free pasta"
          />
        </FormField>

        <FormField label="Rush order">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rush}
              onChange={(event) => setRush(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            />
            Prioritize for kitchen
          </label>
        </FormField>
      </form>
    </div>,
    document.body
  );
}

function generateWalkInId(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `WALK-${hours}${minutes}${seconds}`;
}

function FormField({ label, helperText, children }: { label: string; helperText?: string; children: React.ReactNode }) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm text-slate-600">
      <span className="font-medium text-slate-700">{label}</span>
      {children}
      {helperText ? <span className="text-xs text-slate-400">{helperText}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300";

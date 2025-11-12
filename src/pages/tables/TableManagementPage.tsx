import { type ReactNode, useMemo, useState } from "react";

import PageSection from "../../components/common/PageSection";
import { QRCodeSVG } from "qrcode.react";

type TableRecord = {
  id: string;
  status: "Available" | "Occupied" | "Reserved";
  waiter: string;
  section: string;
  seats: number;
  qrUrl: string;
};

const tables: TableRecord[] = [
  {
    id: "T01",
    status: "Occupied",
    waiter: "Alex",
    section: "Patio",
    seats: 4,
    qrUrl: "https://servesense.app/menu?table=T01",
  },
  {
    id: "T02",
    status: "Available",
    waiter: "Jamie",
    section: "Main",
    seats: 2,
    qrUrl: "https://servesense.app/menu?table=T02",
  },
  {
    id: "T03",
    status: "Reserved",
    waiter: "Priya",
    section: "Lounge",
    seats: 6,
    qrUrl: "https://servesense.app/menu?table=T03",
  },
  {
    id: "T04",
    status: "Occupied",
    waiter: "Jordan",
    section: "Main",
    seats: 4,
    qrUrl: "https://servesense.app/menu?table=T04",
  },
];

export default function TableManagementPage() {
  const [isCreating, setIsCreating] = useState(false);

  const occupancySummary = useMemo(() => {
    const total = tables.length;
    const available = tables.filter((table) => table.status === "Available").length;
    const reserved = tables.filter((table) => table.status === "Reserved").length;
    const occupied = tables.filter((table) => table.status === "Occupied").length;
    return { total, available, reserved, occupied };
  }, []);

  return (
    <div className="space-y-6">
      {isCreating ? (
        <AddTableForm onCancel={() => setIsCreating(false)} />
      ) : (
        <PageSection
          title="Tables & QR Codes"
          description="Manage table inventory, assignments, and scannable links for the digital menu."
          action={
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
            >
              Add Table
            </button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[2fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryCard label="Total tables" value={occupancySummary.total} accent="bg-primary-500" />
              <SummaryCard label="Available" value={occupancySummary.available} accent="bg-emerald-500" />
              <SummaryCard label="Reserved" value={occupancySummary.reserved} accent="bg-amber-500" />
              <SummaryCard label="Occupied" value={occupancySummary.occupied} accent="bg-rose-500" />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Check-in Tips</h3>
              <ul className="mt-3 space-y-2">
                <li>• QR assignments sync in real-time with the live menu.</li>
                <li>• Reprint cards when a table moves to a new section.</li>
                <li>• Attach NFC tags for hands-free scanning support.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tables.map((table) => (
              <TableCard key={table.id} table={table} />
            ))}
          </div>
        </PageSection>
      )}

      <PageSection
        title="QR Code Printing"
        description="Generate printable layouts with table codes and short links."
      >
        <QrPrintingPanel tables={tables} />
      </PageSection>
    </div>
  );
}

function TableCard({ table }: { table: TableRecord }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{table.id}</h3>
          <p className="text-xs text-slate-500">Section · {table.section}</p>
        </div>
        <span
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600"
        >
          {table.status}
        </span>
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>Seats: {table.seats}</span>
        <span>Assigned: {table.waiter}</span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
        <div className="h-16 w-16 overflow-hidden rounded-md bg-white p-1">
          <QRCodeSVG value={table.qrUrl} size={56} />
        </div>
        <div className="text-xs text-slate-500">
          <p className="font-medium text-slate-700">Menu QR</p>
          <p className="truncate text-[11px] text-slate-400">{table.qrUrl}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
          Preview QR
        </button>
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
          Assign Waiter
        </button>
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
          Duplicate
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${accent}`}>
          {value}
        </span>
        <span className="text-sm text-slate-500">tables</span>
      </div>
    </div>
  );
}

function AddTableForm({ onCancel }: { onCancel: () => void }) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Register New Table</h2>
          <p className="text-sm text-slate-500">
            Configure seating, section placement, and QR destination before publishing for guests.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Back to tables
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Save draft
          </button>
          <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            Create table
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <FormCard title="Table Details" description="Label, capacity, and default assignment.">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Table name" required>
                <input className={inputClassName} placeholder="e.g. T12" />
              </FormField>
              <FormField label="Seating capacity" required>
                <input className={inputClassName} type="number" min={1} placeholder="4" />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Dining section" required>
                <select className={inputClassName} defaultValue="">
                  <option value="" disabled>
                    Select section
                  </option>
                  <option>Main floor</option>
                  <option>Chef counter</option>
                  <option>Lounge</option>
                  <option>Patio</option>
                </select>
              </FormField>
              <FormField label="Assigned staff">
                <input className={inputClassName} placeholder="Start typing name" />
              </FormField>
            </div>

            <FormField label="Notes" helperText="Optional operations notes or accessibility requirements.">
              <textarea className={`${inputClassName} min-h-[112px]`} placeholder="Hosts prefer to seat families here." />
            </FormField>
          </FormCard>

          <FormCard title="QR Destination" description="Control the landing page and optional UTM tags.">
            <FormField label="Menu URL" required>
              <input className={inputClassName} defaultValue="https://servesense.app/menu" />
            </FormField>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Auto-apply table parameter" helperText="Appends ?table=T12 to help servers track orders.">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" defaultChecked />
                  <span className="text-sm text-slate-600">Enable tracking</span>
                </div>
              </FormField>
              <FormField label="Link preview">
                <input className={inputClassName} value="https://servesense.app/menu?table=T12" readOnly />
              </FormField>
            </div>
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="QR Preview" description="This is what guests scan at the table.">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <QRCodeSVG value="https://servesense.app/menu?table=T12" size={160} />
              </div>
              <div className="text-center text-sm text-slate-500">
                <p className="font-semibold text-slate-700">Table T12</p>
                <p>Scan for the digital menu</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" defaultChecked />
                  Include short link
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                  Add NFC pairing code
                </label>
              </div>
            </div>
          </FormCard>

          <FormCard title="Printing" description="Download the card or send to the front-of-house printer.">
            <div className="space-y-3">
              <FormField label="Card size">
                <select className={inputClassName}>
                  <option>4 x 6 in</option>
                  <option>5 x 7 in</option>
                  <option>Square coaster</option>
                </select>
              </FormField>
              <FormField label="Finish">
                <select className={inputClassName}>
                  <option>Matte cardstock</option>
                  <option>Glossy laminate</option>
                  <option>Tent fold</option>
                </select>
              </FormField>
              <div className="grid gap-2 sm:grid-cols-2">
                <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                  Download PNG
                </button>
                <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                  Export PDF
                </button>
              </div>
              <button
                className="w-full rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
                onClick={() => window.print()}
              >
                Print QR Card
              </button>
            </div>
          </FormCard>
        </div>
      </div>
    </section>
  );
}

function QrPrintingPanel({ tables }: { tables: TableRecord[] }) {
  const [selectedSize, setSelectedSize] = useState("4x6");
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeShortLink, setIncludeShortLink] = useState(true);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Sheet layout">
          <select
            className={inputClassName}
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            <option value="4x6">4 x 6 in cards</option>
            <option value="Letter">US Letter (3 per page)</option>
            <option value="A5">A5 folded tent</option>
          </select>
        </FormField>
        <FormField label="Include brand logo">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              checked={includeLogo}
              onChange={(event) => setIncludeLogo(event.target.checked)}
            />
            Show on print
          </label>
        </FormField>
        <FormField label="Include short link">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
              checked={includeShortLink}
              onChange={(event) => setIncludeShortLink(event.target.checked)}
            />
            Display tinyurl link
          </label>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tables.map((table) => (
          <div key={table.id} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Table number</p>
                <p className="text-lg font-semibold text-slate-900">{table.id}</p>
              </div>
              {includeLogo ? (
                <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  ServeSense
                </span>
              ) : null}
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <QRCodeSVG value={table.qrUrl} size={136} />
              </div>
              <p className="text-sm font-medium text-slate-700">Scan for menu & ordering</p>
              {includeShortLink ? (
                <p className="text-xs text-slate-500">{table.qrUrl.replace("https://", "")}</p>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Seats {table.seats}</span>
              <span>{selectedSize}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-600">
          Select the layout that matches your printer stock, then print or export the cards.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
            Download ZIP
          </button>
          <button
            className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
            onClick={() => window.print()}
          >
            Print Selected Layout
          </button>
        </div>
      </div>
    </div>
  );
}

type FormCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function FormCard({ title, description, children }: FormCardProps) {
  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
  helperText?: string;
};

function FormField({ label, children, required, helperText }: FormFieldProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-sm text-slate-600">
      <span className="font-medium text-slate-700">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      {children}
      {helperText ? <span className="text-xs text-slate-400">{helperText}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300";


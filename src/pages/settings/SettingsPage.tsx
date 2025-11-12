import PageSection from "../../components/common/PageSection";

const TAB_DEFINITIONS = [
  { id: "profile", label: "Profile" },
  { id: "payments", label: "Payments" },
  { id: "theme", label: "Theme" },
  { id: "notifications", label: "Notifications" },
  { id: "hours", label: "Hours" },
];

const BRANDING = {
  name: "ServeSense - Ember Room",
  address: "142 Market Street, San Francisco, CA",
  phone: "+1 (415) 555-0199",
  email: "hello@servesense.com",
  primaryColor: "#3B82F6",
  secondaryColor: "#F97316",
  logoUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=200&q=80",
};

const PAYMENT_PROVIDERS = [
  {
    id: "stripe",
    name: "Stripe",
    status: "Connected",
    lastSync: "2 minutes ago",
    depositSchedule: "Daily",
    fee: "2.9% + $0.30",
  },
  {
    id: "square",
    name: "Square Terminal",
    status: "Pending",
    lastSync: "Awaiting setup",
    depositSchedule: "Manual",
    fee: "2.6% + $0.10",
  },
  {
    id: "cash",
    name: "Cash Drawer",
    status: "Enabled",
    lastSync: "N/A",
    depositSchedule: "Daily close",
    fee: "—",
  },
];

const THEME_PRESETS = [
  { name: "Signature", primary: "#3B82F6", secondary: "#F97316", accent: "#22D3EE" },
  { name: "Midnight", primary: "#0F172A", secondary: "#CBD5F5", accent: "#38BDF8" },
  { name: "Terracotta", primary: "#D97706", secondary: "#FDE68A", accent: "#FCA5A5" },
];

const NOTIFICATION_RULES = [
  { channel: "Email", address: "orders@servesense.com", triggers: "New order, order ready", sla: "Send instantly" },
  { channel: "SMS", address: "+1 (415) 555-2210", triggers: "Guest arrival, rush order", sla: "Within 30 seconds" },
  { channel: "WhatsApp", address: "+1 (415) 555-4420", triggers: "Table ready updates", sla: "Within 1 minute" },
];

const OPERATING_HOURS = [
  { day: "Monday", open: "Closed", close: "Closed", note: "Deep clean + prep" },
  { day: "Tuesday", open: "4:00 PM", close: "11:00 PM", note: "Dinner service" },
  { day: "Wednesday", open: "4:00 PM", close: "11:00 PM", note: "" },
  { day: "Thursday", open: "4:00 PM", close: "11:00 PM", note: "Live acoustic duo" },
  { day: "Friday", open: "5:00 PM", close: "12:30 AM", note: "Tasting menu waitlist" },
  { day: "Saturday", open: "11:30 AM", close: "12:30 AM", note: "Brunch & dinner" },
  { day: "Sunday", open: "11:30 AM", close: "9:00 PM", note: "Family prix fixe" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageSection
        title="Restaurant Configuration"
        description="Maintain branding, taxes, payments, and communications."
      >
        <div className="flex flex-wrap gap-2">
          {TAB_DEFINITIONS.map((tab) => (
            <button
              key={tab.id}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </PageSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <PageSection title="Branding" description="Restaurant name, address, logo, and contact details.">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={BRANDING.logoUrl}
                alt="Restaurant logo"
                className="h-16 w-16 rounded-2xl object-cover shadow-sm"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">{BRANDING.name}</p>
                <p className="text-sm text-slate-500">{BRANDING.address}</p>
              </div>
            </div>

            <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <InfoRow label="Phone" value={BRANDING.phone} />
              <InfoRow label="Email" value={BRANDING.email} />
              <ColorSwatch label="Primary" value={BRANDING.primaryColor} />
              <ColorSwatch label="Secondary" value={BRANDING.secondaryColor} />
            </div>

            <button className="self-start rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              Edit branding
            </button>
          </div>
        </PageSection>

        <PageSection title="Payments" description="Configure Stripe, PayFast, and offline payment methods.">
          <div className="space-y-3">
            {PAYMENT_PROVIDERS.map((provider) => (
              <div key={provider.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{provider.name}</p>
                    <p className="text-xs text-slate-500">Last sync: {provider.lastSync}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      provider.status === "Connected"
                        ? "bg-emerald-50 text-emerald-600"
                        : provider.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {provider.status}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                  <span>Deposit: {provider.depositSchedule}</span>
                  <span>Processing fee: {provider.fee}</span>
                  <button className="self-start text-primary-600">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PageSection title="Theme" description="Accent colors, typography, and dark mode preferences.">
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Choose a preset or fine-tune brand colors.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {THEME_PRESETS.map((preset) => (
                <div key={preset.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{preset.name}</p>
                  <div className="mt-3 flex gap-2">
                    {[preset.primary, preset.secondary, preset.accent].map((color) => (
                      <span
                        key={color}
                        className="h-8 w-8 rounded-full border border-slate-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <button className="mt-4 w-full rounded-md border border-slate-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                    Apply preset
                  </button>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection title="Notifications" description="Configure email, SMS, and WhatsApp updates for orders.">
          <div className="space-y-3">
            {NOTIFICATION_RULES.map((rule) => (
              <div key={rule.channel} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">{rule.channel}</p>
                    <p className="text-xs text-slate-400">{rule.address}</p>
                  </div>
                  <button className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
                    Edit
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">Triggers: {rule.triggers}</p>
                <p className="text-xs text-slate-400">SLA: {rule.sla}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <PageSection title="Operating Hours" description="Current public hours and internal prep notes.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {OPERATING_HOURS.map((entry) => (
            <div key={entry.day} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{entry.day}</p>
                <span className="text-xs uppercase tracking-wide text-slate-400">{entry.open === "Closed" ? "Closed" : `${entry.open} – ${entry.close}`}</span>
              </div>
              {entry.note ? <p className="mt-2 text-xs text-slate-500">Note: {entry.note}</p> : null}
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm text-slate-700">{value}</p>
    </div>
  );
}

function ColorSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      <span className="h-6 w-6 rounded-md border border-slate-200" style={{ backgroundColor: value }} />
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  );
}


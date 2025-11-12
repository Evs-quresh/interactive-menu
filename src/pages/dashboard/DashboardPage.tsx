import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";
import StatCard from "../../components/common/StatCard";

const stats = [
  {
    title: "Orders Today",
    value: "128",
    helperText: "Goal: 200",
    trend: { label: "+", value: "14%", isPositive: true },
  },
  {
    title: "Orders This Week",
    value: "892",
    helperText: "vs. last week",
    trend: { label: "+", value: "9%", isPositive: true },
  },
  {
    title: "Active Tables",
    value: "18",
    helperText: "Capacity 32",
    trend: { label: "+", value: "3", isPositive: true },
  },
  {
    title: "Revenue (Month)",
    value: "$41,560",
    helperText: "Target $65k",
    trend: { label: "+", value: "6%", isPositive: true },
  },
];

const quickLinks = [
  { title: "Add Menu Item", description: "Launch a new dish or seasonal special.", actionLabel: "Create" },
  { title: "Add Table QR", description: "Generate a QR code for a new dining area.", actionLabel: "Generate" },
  { title: "Upload 3D Model", description: "Enhance menu items with immersive previews.", actionLabel: "Upload" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PageSection
          title="Orders by Category"
          description="Track live order volume split across categories."
          action={<button className="text-sm font-medium text-primary-600">View analytics</button>}
        >
          <DataPlaceholder
            title="Category chart pending"
            description="Connect to analytics endpoint to show real-time category trends."
            hint="Chart placeholder"
          />
        </PageSection>

        <PageSection
          title="Revenue Trend"
          description="Daily revenue with service charges and taxes."
          action={<button className="text-sm font-medium text-primary-600">Download CSV</button>}
        >
          <DataPlaceholder
            title="Revenue sparkline pending"
            description="Plug in the revenue timeline dataset once the API is ready."
            hint="Chart placeholder"
          />
        </PageSection>
      </div>

      <PageSection
        title="Pending Orders"
        description="Kitchen queue sorted by latest activity."
        action={<button className="text-sm font-medium text-primary-600">Open orders board</button>}
      >
        <DataPlaceholder
          title="Pending orders stream"
          description="Socket subscription will populate this table with live orders."
          hint="List placeholder"
        />
      </PageSection>

      <PageSection
        title="Quick Actions"
        description="High-impact workflows for the operations team."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => (
            <div
              key={link.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">{link.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{link.description}</p>
              </div>
              <button className="mt-4 w-fit rounded-md bg-primary-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-600">
                {link.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}


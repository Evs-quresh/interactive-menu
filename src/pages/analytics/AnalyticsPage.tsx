import { useMemo, useState } from "react";

import PageSection from "../../components/common/PageSection";
import StatCard from "../../components/common/StatCard";

type CategoryMetric = {
  label: string;
  percentage: number;
  delta: number;
  revenue: string;
};

type DishMetric = {
  id: string;
  name: string;
  revenue: string;
  orders: number;
  addOnAttachRate: number;
  category: string;
  image: string;
};

type PeakHourSlot = {
  hour: string;
  orders: number;
  occupancy: number;
};

type WasteMetric = {
  label: string;
  value: string;
  delta: number;
  target: string;
};

type OccupancyZone = {
  zone: string;
  occupancy: number;
  avgTurnoverMinutes: number;
  peakWindow: string;
};

const FILTERS = [
  { label: "Today", key: "today" },
  { label: "7 days", key: "week" },
  { label: "30 days", key: "month" },
  { label: "Quarter", key: "quarter" },
];

const CATEGORY_BREAKDOWN: CategoryMetric[] = [
  { label: "Chef tasting", percentage: 32, delta: 6.2, revenue: "$48.2k" },
  { label: "À la carte", percentage: 28, delta: -3.8, revenue: "$41.9k" },
  { label: "Desserts", percentage: 16, delta: 4.5, revenue: "$21.7k" },
  { label: "Zero proof", percentage: 12, delta: 1.4, revenue: "$12.1k" },
  { label: "Cocktails", percentage: 8, delta: -2.1, revenue: "$9.6k" },
  { label: "Retail add-ons", percentage: 4, delta: 0.9, revenue: "$4.8k" },
];

const TOP_DISHES: DishMetric[] = [
  {
    id: "dish-01",
    name: "Truffle Tagliatelle",
    revenue: "$18,430",
    orders: 612,
    addOnAttachRate: 46,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dish-02",
    name: "Garden Spritz Zero",
    revenue: "$12,980",
    orders: 486,
    addOnAttachRate: 58,
    category: "Zero proof",
    image: "https://images.unsplash.com/photo-1563371351-e53ebb744a1b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dish-03",
    name: "Wagyu Ember Burger",
    revenue: "$10,640",
    orders: 352,
    addOnAttachRate: 64,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dish-04",
    name: "Nitro Citrus Soufflé",
    revenue: "$9,280",
    orders: 308,
    addOnAttachRate: 52,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dish-05",
    name: "Chef Table Omakase",
    revenue: "$32,110",
    orders: 124,
    addOnAttachRate: 72,
    category: "Chef tasting",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=400&q=80",
  },
];

const PEAK_HOURS: PeakHourSlot[] = [
  { hour: "12 PM", orders: 42, occupancy: 64 },
  { hour: "1 PM", orders: 56, occupancy: 71 },
  { hour: "6 PM", orders: 78, occupancy: 92 },
  { hour: "7 PM", orders: 86, occupancy: 95 },
  { hour: "8 PM", orders: 74, occupancy: 88 },
  { hour: "9 PM", orders: 48, occupancy: 76 },
];

const WASTE_METRICS: WasteMetric[] = [
  { label: "Portion adjustments", value: "-18% waste", delta: 6.3, target: "Target -15%" },
  { label: "Compost diversion", value: "72% captured", delta: 2.1, target: "Target 70%" },
  { label: "Ingredient variance", value: "-9% variance", delta: -1.4, target: "Target -10%" },
];

const OCCUPANCY_ZONES: OccupancyZone[] = [
  { zone: "Main floor", occupancy: 87, avgTurnoverMinutes: 68, peakWindow: "6:30 - 8:30 PM" },
  { zone: "Chef counter", occupancy: 95, avgTurnoverMinutes: 92, peakWindow: "7:00 - 9:00 PM" },
  { zone: "Lounge", occupancy: 72, avgTurnoverMinutes: 54, peakWindow: "8:00 - 10:00 PM" },
];

const KPI_STATS = [
  {
    label: "Total revenue",
    value: "$136k",
    delta: "+12.4% vs last month",
    trend: "up",
  },
  {
    label: "Avg. check",
    value: "$112.38",
    delta: "+4.1% vs last month",
    trend: "up",
  },
  {
    label: "Digital menu scans",
    value: "8,942",
    delta: "+9.5% vs last month",
    trend: "up",
  },
  {
    label: "Wait time",
    value: "07m 32s",
    delta: "-1.3m vs last month",
    trend: "down",
  },
];

export default function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState("week");

  const highlightCategory = useMemo(
    () => CATEGORY_BREAKDOWN.reduce((prev, current) => (current.percentage > prev.percentage ? current : prev)),
    []
  );

  return (
    <div className="space-y-6">
      <PageSection
        title="Analytics & Reports"
        description="Monitor performance, table occupancy, and waste reduction."
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                  activeFilter === filter.key
                    ? "border-primary-200 bg-primary-50 text-primary-600"
                    : "border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Highlight · {highlightCategory.label} ({highlightCategory.percentage}% of revenue)
          </p>
        </div>
      </PageSection>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {KPI_STATS.map((kpi) => (
          <StatCard key={kpi.label} title={kpi.label} value={kpi.value} trend={kpi.delta} trendDirection={kpi.trend} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <PageSection title="Orders by Category" description="Identify trends in category performance.">
          <div className="space-y-4">
            {CATEGORY_BREAKDOWN.map((category) => (
              <div key={category.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="font-medium text-slate-800">{category.label}</span>
                  <span className="text-xs uppercase tracking-wide text-slate-400">{category.revenue}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary-500"
                    style={{ width: `${category.percentage}%` }}
                    aria-hidden
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{category.percentage}% of revenue</span>
                  <span className={category.delta >= 0 ? "text-emerald-500" : "text-rose-500"}>
                    {category.delta >= 0 ? "▲" : "▼"} {Math.abs(category.delta)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Top Selling Dishes" description="Rank dishes by revenue and frequency.">
          <div className="space-y-4">
            {TOP_DISHES.map((dish) => (
              <div key={dish.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <img src={dish.image} alt={dish.name} className="h-14 w-14 rounded-xl object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{dish.name}</p>
                  <p className="text-xs text-slate-400">{dish.category}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                    <span>{dish.revenue}</span>
                    <span>{dish.orders} orders</span>
                    <span className="text-primary-600">{dish.addOnAttachRate}% add-on attach</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <PageSection title="Peak Hours" description="Heatmap of order density per hour.">
          <div className="space-y-3 text-sm text-slate-600">
            {PEAK_HOURS.map((slot) => (
              <div key={slot.hour} className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{slot.hour}</span>
                <div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary-500" style={{ width: `${slot.orders}%` }} aria-hidden />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-slate-400">
                    <span>{slot.orders} orders</span>
                    <span>{slot.occupancy}% occupancy</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Waste Reduction" description="Track portion selections and sustainability metrics.">
          <div className="space-y-4">
            {WASTE_METRICS.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{metric.value}</p>
                <p className={`text-xs ${metric.delta >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {metric.delta >= 0 ? "▲" : "▼"} {Math.abs(metric.delta)}% vs target
                </p>
                <p className="mt-2 text-xs text-slate-500">Goal: {metric.target}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Table Occupancy" description="Utilization rate across restaurant zones.">
          <div className="space-y-4">
            {OCCUPANCY_ZONES.map((zone) => (
              <div key={zone.zone} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{zone.zone}</p>
                  <span className="text-xs uppercase tracking-wide text-primary-600">{zone.occupancy}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary-500"
                    style={{ width: `${zone.occupancy}%` }}
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">Avg turnover {zone.avgTurnoverMinutes} min</p>
                <p className="text-xs text-slate-400">Peak: {zone.peakWindow}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}


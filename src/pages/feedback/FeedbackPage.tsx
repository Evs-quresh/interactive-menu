import { useMemo, useState } from "react";

import PageSection from "../../components/common/PageSection";
import StatCard from "../../components/common/StatCard";

type FeedbackRecord = {
  id: string;
  table: string;
  date: string;
  ago: string;
  rating: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  guestName: string;
  dish: string;
  comment: string;
  tags: string[];
  resolved: boolean;
};

type ThemeHighlight = {
  label: string;
  mentionPercentage: number;
  change: number;
};

const FILTERS = ["All", "Positive", "Neutral", "Negative", "Last 7 days", "Last 30 days"];

const FEEDBACK_DATA: FeedbackRecord[] = [
  {
    id: "FB-2048",
    table: "T08",
    date: "2024-11-01",
    ago: "12 minutes ago",
    rating: 5,
    sentiment: "Positive",
    guestName: "Amelia R.",
    dish: "Truffle Tagliatelle",
    comment: "Incredible depth of flavor and beautiful plating. Loved the interactive AR pairing notes!",
    tags: ["Service", "AR menu", "Chef special"],
    resolved: true,
  },
  {
    id: "FB-2047",
    table: "T03",
    date: "2024-11-01",
    ago: "32 minutes ago",
    rating: 4,
    sentiment: "Positive",
    guestName: "Leo M.",
    dish: "Herbal Citrus Spritz",
    comment: "Refreshing and visually stunning. Would love an option with less sweetness.",
    tags: ["Zero proof", "Flavor"],
    resolved: false,
  },
  {
    id: "FB-2046",
    table: "T19",
    date: "2024-10-31",
    ago: "1 hour ago",
    rating: 3,
    sentiment: "Neutral",
    guestName: "Sofia L.",
    dish: "Wagyu Ember Burger",
    comment: "Great taste but bun arrived slightly cool. Staff responded quickly.",
    tags: ["Kitchen", "Temperature"],
    resolved: true,
  },
  {
    id: "FB-2045",
    table: "T12",
    date: "2024-10-31",
    ago: "2 hours ago",
    rating: 2,
    sentiment: "Negative",
    guestName: "Jonathan P.",
    dish: "Nitro Citrus Soufflé",
    comment: "Soufflé collapsed before arriving. Appreciate the comped dessert, but experience was disappointing.",
    tags: ["Desserts", "Operations"],
    resolved: false,
  },
  {
    id: "FB-2044",
    table: "T05",
    date: "2024-10-30",
    ago: "Yesterday",
    rating: 5,
    sentiment: "Positive",
    guestName: "Isabella K.",
    dish: "Chef Table Omakase",
    comment: "Chef interaction was unforgettable. The VR backstory for each course wowed our guests.",
    tags: ["Experiential", "Storytelling"],
    resolved: true,
  },
  {
    id: "FB-2043",
    table: "T21",
    date: "2024-10-30",
    ago: "Yesterday",
    rating: 4,
    sentiment: "Positive",
    guestName: "Miguel D.",
    dish: "Garden Spritz Zero",
    comment: "Loved the aroma release ritual. Slight delay on delivery but worth the wait.",
    tags: ["Bar", "Experience"],
    resolved: true,
  },
];

const THEME_HIGHLIGHTS: ThemeHighlight[] = [
  { label: "Service ritual", mentionPercentage: 38, change: 6.3 },
  { label: "AR / VR menus", mentionPercentage: 31, change: 4.8 },
  { label: "Kitchen timing", mentionPercentage: 16, change: -3.2 },
  { label: "Dessert presentation", mentionPercentage: 9, change: -1.1 },
];

const KPI_SUMMARY = [
  { label: "Average rating", value: "4.3", trend: "+0.2 vs last week", direction: "up" },
  { label: "Response rate", value: "94%", trend: "+3.0% vs last week", direction: "up" },
  { label: "Median resolution", value: "22m", trend: "-5m vs last week", direction: "down" },
];

export default function FeedbackPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFeedback = useMemo(() => {
    if (activeFilter === "All") return FEEDBACK_DATA;
    if (activeFilter === "Last 7 days") return FEEDBACK_DATA.filter((feedback) => feedback.date >= "2024-10-25");
    if (activeFilter === "Last 30 days") return FEEDBACK_DATA.filter((feedback) => feedback.date >= "2024-10-02");
    return FEEDBACK_DATA.filter((feedback) => feedback.sentiment === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <PageSection
        title="Customer Feedback"
        description="Review ratings, comments, and sentiment for every dish."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "border-primary-200 bg-primary-50 text-primary-600"
                    : "border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Showing {filteredFeedback.length} of {FEEDBACK_DATA.length} records
          </p>
        </div>
      </PageSection>

      <div className="grid gap-4 md:grid-cols-3">
        {KPI_SUMMARY.map((kpi) => (
          <StatCard key={kpi.label} title={kpi.label} value={kpi.value} trend={kpi.trend} trendDirection={kpi.direction} />
        ))}
      </div>

      <PageSection title="Ratings Overview" description="Average score per item and trending feedback themes.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Trending mentions (week-over-week change).</p>
            <div className="space-y-3">
              {THEME_HIGHLIGHTS.map((theme) => (
                <div key={theme.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{theme.label}</p>
                    <span className={`text-xs ${theme.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {theme.change >= 0 ? "▲" : "▼"} {Math.abs(theme.change)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary-500" style={{ width: `${theme.mentionPercentage}%` }} aria-hidden />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{theme.mentionPercentage}% of comments mention this theme.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-800">Current sentiment mix</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs text-slate-500">
              <SentimentBubble label="Positive" value="64%" color="bg-emerald-500" />
              <SentimentBubble label="Neutral" value="24%" color="bg-amber-500" />
              <SentimentBubble label="Negative" value="12%" color="bg-rose-500" />
            </div>
            <p className="mt-4 text-xs text-slate-500">Measured across 184 responses collected this week.</p>
          </div>
        </div>
      </PageSection>

      <PageSection title="Comments" description="Filterable list of customer comments with timestamps and table IDs.">
        <div className="space-y-4">
          {filteredFeedback.map((feedback) => (
            <div key={feedback.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {feedback.guestName}
                    <span className="ml-2 text-xs text-slate-400">• Table {feedback.table}</span>
                  </p>
                  <p className="text-xs text-slate-500">{feedback.dish}</p>
                </div>
                <div className="flex items-center gap-3">
                  <RatingStars rating={feedback.rating} />
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      feedback.sentiment === "Positive"
                        ? "bg-emerald-50 text-emerald-600"
                        : feedback.sentiment === "Negative"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {feedback.sentiment}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{feedback.comment}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex flex-wrap gap-2">
                  {feedback.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span>{feedback.ago}</span>
                  <button className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 transition hover:border-primary-200 hover:text-primary-600">
                    {feedback.resolved ? "Reopen" : "Mark resolved"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${star <= rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 2.7l1.76 3.56L15.7 7l-2.85 2.78.68 3.95L10 11.88l-3.53 1.85.68-3.95L4.3 7l3.94-.74L10 2.7z" />
        </svg>
      ))}
    </div>
  );
}

function SentimentBubble({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="space-y-2">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-sm font-semibold text-white ${color}`}>
        {value}
      </div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}


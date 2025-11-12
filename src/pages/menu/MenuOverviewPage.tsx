import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

const sections = [
  {
    title: "Category Management",
    description: "Organize starters, mains, desserts, beverages, and seasonal collections.",
    hint: "Create, edit, enable, or disable categories.",
  },
  {
    title: "Item Management",
    description: "Maintain descriptions, nutrition, pricing tiers, and availability.",
    hint: "Support for tags, add-ons, and multi-serving options.",
  },
  {
    title: "Serving Presets",
    description: "Define single, double, and family presentations with 3D assets.",
    hint: "Set expected grams or milliliters per portion.",
  },
  {
    title: "3D Preview",
    description: "Validate .glb and .gltf models inside the item workflow.",
    hint: "Rotate, zoom, and confirm texture quality before publishing.",
  },
];

export default function MenuOverviewPage() {
  return (
    <div className="space-y-6">
      <PageSection
        title="Menu Management Overview"
        description="Centralized workspace for curating interactive menu experiences."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{section.description}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-primary-600">{section.hint}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Workflows in Progress"
        description="Functional tables and forms will populate here as endpoints are wired."
      >
        <DataPlaceholder
          title="Menu tooling"
          description="This screen will host searchable tables, bulk actions, and preview panes for rich menu items."
          hint="Component placeholder"
        />
      </PageSection>
    </div>
  );
}


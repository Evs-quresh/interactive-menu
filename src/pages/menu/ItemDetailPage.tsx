import type { ReactNode } from "react";
import { useParams } from "react-router-dom";

import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

export default function ItemDetailPage() {
  const { itemId } = useParams();

  return (
    <div className="space-y-6">
      <PageSection
        title={`Item Builder: ${itemId ?? "New Item"}`}
        description="Assemble metadata, pricing, add-ons, and visual assets for this menu item."
        action={
          <div className="flex gap-2">
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              Save Draft
            </button>
            <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
              Publish
            </button>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card title="Details" description="Core content, tags, and nutrition.">
              <DataPlaceholder
                title="Details form"
                description="Hook into form schema with react-hook-form + zod for validation."
                hint="Form placeholder"
              />
            </Card>

            <Card title="Pricing" description="Single, double, and family pricing with currency support.">
              <DataPlaceholder
                title="Pricing matrix"
                description="Dynamically render price inputs per serving preset and sync to currency settings."
                hint="Form placeholder"
              />
            </Card>

            <Card title="Add-ons" description="Optional extras like sauces or toppings.">
              <DataPlaceholder
                title="Add-on list"
                description="Allow staff to define pricing, default selections, and availability windows."
                hint="List placeholder"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Availability" description="Control visibility and scheduling.">
              <DataPlaceholder
                title="Availability controls"
                description="Toggle active state and configure time-bound availability."
                hint="Toggle placeholder"
              />
            </Card>

            <Card title="3D Assets" description="Upload and preview serving-specific models.">
              <DataPlaceholder
                title="Model attachments"
                description="Link to central model library while allowing overrides per serving."
                hint="Uploader placeholder"
              />
            </Card>
          </div>
        </div>
      </PageSection>
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function Card({ title, description, children }: CardProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </div>
  );
}


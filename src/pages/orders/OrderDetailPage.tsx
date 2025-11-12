import type { ReactNode } from "react";
import { useParams } from "react-router-dom";

import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

export default function OrderDetailPage() {
  const { orderId } = useParams();

  return (
    <div className="space-y-6">
      <PageSection
        title={`Order Detail: ${orderId ?? "Unknown"}`}
        description="Review items, customer notes, and status history."
        action={
          <div className="flex gap-2">
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              Print receipt
            </button>
            <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
              Refund order
            </button>
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card title="Items" description="List of dishes, servings, and modifiers.">
              <DataPlaceholder
                title="Line items"
                description="Populate from order detail endpoint including add-ons and serving sizes."
                hint="Items placeholder"
              />
            </Card>

            <Card title="Customer Notes" description="Special instructions captured from the table QR experience.">
              <DataPlaceholder
                title="Notes thread"
                description="Display both customer and staff notes with timestamps."
                hint="Notes placeholder"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Timeline" description="Status progression from placed to completed.">
              <DataPlaceholder
                title="Timeline"
                description="Render chronological updates with assigned staff and timestamps."
                hint="Timeline placeholder"
              />
            </Card>

            <Card title="Payment" description="Amount, gratuity, and payment method.">
              <DataPlaceholder
                title="Payment summary"
                description="Show subtotal, service charge, tax, discounts, and tips."
                hint="Summary placeholder"
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


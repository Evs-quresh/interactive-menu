import { useState } from "react";

import PageSection from "../../components/common/PageSection";
import MenuItemForm from "./components/MenuItemForm";
import MenuItemTable, { type MenuItemRow } from "./components/MenuItemTable";

const filters = [
  "All",
  "Active",
  "Inactive",
  "Scheduled",
  "Spicy",
  "Vegan",
  "Chef Special",
  "Low Waste",
];

const menuItems: MenuItemRow[] = [
  {
    id: "MN-1042",
    name: "Smoked Truffle Risotto",
    category: "Main Course",
    servings: ["Single", "Double", "Family"],
    priceRange: "$26 - $92",
    tags: ["Chef Special", "Vegetarian"],
    availability: "active",
    lastUpdated: "2 hours ago",
  },
  {
    id: "MN-0988",
    name: "Charred Citrus Octopus",
    category: "Starters",
    servings: ["Single", "Share"],
    priceRange: "$18 - $34",
    tags: ["Spicy", "Low Waste"],
    availability: "scheduled",
    lastUpdated: "Scheduled: Nov 12",
  },
  {
    id: "MN-1120",
    name: "Heritage Grain Buddha Bowl",
    category: "Main Course",
    servings: ["Single", "Family"],
    priceRange: "$22 - $64",
    tags: ["Vegan", "Gluten Free"],
    availability: "active",
    lastUpdated: "Yesterday • 6:45 PM",
  },
  {
    id: "MN-0876",
    name: "Nitro Cold Brew Tonic",
    category: "Drinks",
    servings: ["Single"],
    priceRange: "$9",
    tags: ["Beverage", "Signature"],
    availability: "inactive",
    lastUpdated: "Hidden 3 days ago",
  },
  {
    id: "MN-1154",
    name: "Cocoa Ember Soufflé",
    category: "Desserts",
    servings: ["Single", "Double"],
    priceRange: "$14 - $24",
    tags: ["Chef Special"],
    availability: "active",
    lastUpdated: "32 minutes ago",
  },
];

export default function ItemManagementPage() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      {isCreating ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
            >
              Back to Menu List
            </button>
          </div>
          <MenuItemForm
            onCancel={() => setIsCreating(false)}
            cancelLabel="Back to Menu List"
          />
        </div>
      ) : (
        <PageSection
          title="Menu Items"
          description="Search, filter, and update every dish across categories."
          action={
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
            >
              New Menu Item
            </button>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
                >
                  {filter}
                </button>
              ))}
            </div>

            <MenuItemTable items={menuItems} />
          </div>
        </PageSection>
      )}
    </div>
  );
}


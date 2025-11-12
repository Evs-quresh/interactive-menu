import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

const sampleCategories = [
  { name: "Starters", items: 14, status: "Visible" },
  { name: "Main Course", items: 22, status: "Visible" },
  { name: "Desserts", items: 11, status: "Hidden" },
  { name: "Drinks", items: 18, status: "Visible" },
];

export default function CategoryManagementPage() {
  return (
    <div className="space-y-6">
      <PageSection
        title="Category Management"
        description="Create, sort, and toggle visibility for every menu category."
        action={
          <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            Add Category
          </button>
        }
      >
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-medium text-slate-500">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-600">
              {sampleCategories.map((category) => (
                <tr key={category.name}>
                  <td className="px-4 py-3 font-medium text-slate-900">{category.name}</td>
                  <td className="px-4 py-3">{category.items}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-600">
                      {category.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-sm font-medium text-primary-600">Edit</button>
                      <button className="text-sm font-medium text-slate-400">Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="Bulk Operations"
        description="Tag categories, adjust ordering, and control seasonal visibility."
      >
        <DataPlaceholder
          title="Bulk tooling"
          description="Connect this module to the CMS service to support drag-and-drop ordering and scheduled releases."
          hint="Table placeholder"
        />
      </PageSection>
    </div>
  );
}


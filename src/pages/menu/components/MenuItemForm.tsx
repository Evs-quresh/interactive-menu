import type { ReactNode } from "react";

type MenuItemFormProps = {
  heading?: string;
  helperText?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
};

export default function MenuItemForm({
  heading = "Create New Menu Item",
  helperText = "Draft the menu content, pricing tiers, add-ons, and 3D assets before publishing.",
  primaryActionLabel = "Save Item",
  secondaryActionLabel = "Save Draft",
  onCancel,
  cancelLabel = "Cancel",
}: MenuItemFormProps) {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{heading}</h3>
            <p className="mt-1 text-sm text-slate-500">{helperText}</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-transparent px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
              >
                {cancelLabel}
              </button>
            ) : null}
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              {secondaryActionLabel}
            </button>
            <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
              {primaryActionLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <FormCard title="Item Details" description="Information shown to diners in the menu experience.">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Item Name" required>
                <input className={inputClassName} placeholder="e.g. Smoked Truffle Risotto" />
              </FormField>
              <FormField label="Category" required>
                <select className={inputClassName}>
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Desserts</option>
                  <option>Drinks</option>
                </select>
              </FormField>
            </div>

            <FormField label="Description" helperText="Markdown supported. Keep it concise and appetizing.">
              <textarea className={`${inputClassName} min-h-[120px]`} placeholder="Describe the preparation, flavor notes, and plating." />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Featured Ingredients" helperText="Comma separated list.">
                <input className={inputClassName} placeholder="Black truffle, arborio rice, parmigiano" />
              </FormField>
              <FormField label="Calories / Nutrition">
                <input className={inputClassName} placeholder="480 kcal · 12g protein · 18g fat" />
              </FormField>
            </div>
          </FormCard>

          <FormCard title="Pricing & Servings" description="Configure serving presets, pricing tiers, and portion sizes.">
            <div className="grid gap-6">
              {servings.map((serving) => (
                <div key={serving.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{serving.name}</p>
                      <p className="text-xs text-slate-500">{serving.description}</p>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-primary-600">Preset</span>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <FormField label="Price" required>
                      <div className="flex items-center rounded-md border border-slate-200 bg-white">
                        <span className="px-3 text-sm text-slate-500">USD</span>
                        <input className="w-full rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none" placeholder={serving.price} />
                      </div>
                    </FormField>
                    <FormField label="Estimated Serving Size">
                      <input className={inputClassName} placeholder={serving.servingSize} />
                    </FormField>
                    <FormField label="3D Model">
                      <button className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 transition hover:border-primary-200 hover:text-primary-600">
                        Attach .glb
                      </button>
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          </FormCard>

          <FormCard title="Add-ons" description="Optional extras customers can choose per serving.">
            <div className="space-y-4">
              <AddOnRow name="Extra Parmesan" price="2.50" defaultSelected helperText="Popular" />
              <AddOnRow name="Black Truffle Shavings" price="6.00" />
              <AddOnRow name="Gluten-free Risotto Base" price="0.00" />
              <button className="text-sm font-medium text-primary-600">+ Add add-on</button>
            </div>
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Availability" description="Control when and where this dish is visible.">
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                Item visible in QR menu
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                Limit to dinner service
              </label>
              <FormField label="Tags" helperText="Displayed as quick badges to guide diners.">
                <input className={inputClassName} placeholder="Spicy, Chef Special" />
              </FormField>
              <FormField label="Allergens">
                <input className={inputClassName} placeholder="Dairy, shellfish" />
              </FormField>
            </div>
          </FormCard>

          <FormCard title="Media" description="Upload hero imagery, video loops, and 3D models.">
            <div className="space-y-4">
              <UploadTile label="Cover Image" helperText="JPG or PNG, min 1200px width." />
              <UploadTile label="Motion Clip" helperText="Optional 10s autoplay loop." />
              <UploadTile label="3D Hero Model" helperText="Connect to central 3D library or upload custom." />
            </div>
          </FormCard>

          <FormCard title="Insights" description="Surface operational context as items are updated.">
            <ul className="space-y-3 text-sm text-slate-500">
              <li>• Last updated by Jordan at 10:42 AM</li>
              <li>• Appears in 3 combo recommendations</li>
              <li>• Waste reduction impact: +18% single-serve selection</li>
            </ul>
          </FormCard>
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
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h4 className="text-base font-semibold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  children: ReactNode;
  helperText?: string;
  required?: boolean;
};

function FormField({ label, children, helperText, required }: FormFieldProps) {
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

type AddOnRowProps = {
  name: string;
  price: string;
  helperText?: string;
  defaultSelected?: boolean;
};

function AddOnRow({ name, price, helperText, defaultSelected }: AddOnRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">${price}</p>
        {helperText ? <p className="text-xs text-primary-500">{helperText}</p> : null}
      </div>
      <label className="flex items-center gap-2 text-xs text-slate-500">
        <input type="checkbox" defaultChecked={defaultSelected} className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
        Default on
      </label>
    </div>
  );
}

type UploadTileProps = {
  label: string;
  helperText?: string;
};

function UploadTile({ label, helperText }: UploadTileProps) {
  return (
    <button className="flex w-full flex-col items-start gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-left transition hover:border-primary-200 hover:text-primary-600">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      {helperText ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      <span className="text-xs uppercase tracking-wide text-slate-400">Click to upload</span>
    </button>
  );
}

const inputClassName = "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-300";

const servings = [
  {
    name: "Single Serve",
    description: "Individual plating, best for solo diners.",
    price: "26.00",
    servingSize: "320g",
  },
  {
    name: "Double Share",
    description: "Ideal for couples, includes two tasting bowls.",
    price: "48.00",
    servingSize: "600g",
  },
  {
    name: "Family Feast",
    description: "Serves 4 guests with shareable plating.",
    price: "92.00",
    servingSize: "1.2kg",
  },
];


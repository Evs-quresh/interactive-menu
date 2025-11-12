import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import "@google/model-viewer";

import PageSection from "../../components/common/PageSection";

type ModelAsset = {
  id: string;
  name: string;
  category: string;
  glbUrl: string;
  posterUrl: string;
  updatedAt: string;
  fileSize: string;
  polygonCount: string;
  itemName: string;
  itemImage: string;
  itemDescription: string;
  itemHighlights: string[];
};

const MODEL_ASSETS: ModelAsset[] = [
  {
    id: "mdl-astro",
    name: "Astronaut Dessert Dome",
    category: "Desserts",
    glbUrl:
      "https://res.cloudinary.com/doo17a9l2/image/upload/v1762872988/text-to-3d-model_3d_7_pxkl2k.glb",
    posterUrl:
      "https://res.cloudinary.com/doo17a9l2/image/upload/v1762940127/Screenshot_2025-11-12_143334_fzhp3e.png",
    updatedAt: "2 hours ago",
    fileSize: "9.2 MB",
    polygonCount: "64k",
    itemName: "Lunar Meringue Dome",
    itemImage:
      "https://res.cloudinary.com/doo17a9l2/image/upload/v1762940127/Screenshot_2025-11-12_143334_fzhp3e.png",
    itemDescription:
      "A theatrical dessert reveal featuring citrus meringue and liquid nitrogen fog. Guests can rotate the dome to see plating angles.",
    itemHighlights: [
      "Chef special",
      "Pairs with dry ice presentation",
      "Requires 4-inch platter",
    ],
  },
  // {
  //   id: "mdl-pasta",
  //   name: "Tagliatelle Plate",
  //   category: "Pasta",
  //   glbUrl:
  //     "https://res.cloudinary.com/doo17a9l2/image/upload/v1762872988/text-to-3d-model_3d_7_pxkl2k.glb",
  //   posterUrl:
  //     "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=640&q=80",
  //   updatedAt: "Yesterday",
  //   fileSize: "6.4 MB",
  //   polygonCount: "42k",
  //   itemName: "Truffle Tagliatelle",
  //   itemImage:
  //     "https://images.unsplash.com/photo-1514516345957-556c5fbf6155?auto=format&fit=crop&w=800&q=80",
  //   itemDescription:
  //     "Fresh pasta twirled with mascarpone cream and shaved black truffle. The 3D model helps guests appreciate the tableside toss.",
  //   itemHighlights: [
  //     "Shaved tableside",
  //     "Contains dairy",
  //     "Recommended wine pairing: Barolo",
  //   ],
  // },
  // {
  //   id: "mdl-mocktail",
  //   name: "Garden Spritz Glassware",
  //   category: "Beverages",
  //   glbUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
  //   posterUrl:
  //     "https://images.unsplash.com/photo-1563371351-e53ebb744a1b?auto=format&fit=crop&w=640&q=80",
  //   updatedAt: "Oct 12",
  //   fileSize: "4.1 MB",
  //   polygonCount: "25k",
  //   itemName: "Herbal Citrus Spritz",
  //   itemImage:
  //     "https://images.unsplash.com/photo-1514361892635-6e122620e748?auto=format&fit=crop&w=800&q=80",
  //   itemDescription:
  //     "Zero-proof spritz with charred grapefruit, rosemary smoke, and dehydrated citrus wheel. The 3D asset demonstrates garnish placement.",
  //   itemHighlights: ["Zero-proof", "Smoked rosemary", "Served on crushed ice"],
  // },
  // {
  //   id: "mdl-burger",
  //   name: "Stacked Wagyu Burger",
  //   category: "Burgers",
  //   glbUrl:
  //     "https://modelviewer.dev/shared-assets/models/ShopifyModels/Chair.glb",
  //   posterUrl:
  //     "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=640&q=80",
  //   updatedAt: "Sep 28",
  //   fileSize: "7.8 MB",
  //   polygonCount: "58k",
  //   itemName: "Wagyu Ember Burger",
  //   itemImage:
  //     "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80",
  //   itemDescription:
  //     "Double-stacked wagyu patties, ember-grilled onions, and aged cheddar. Customers view layers and presentation in 3D.",
  //   itemHighlights: ["Contains gluten", "Served medium", "Add truffle fries"],
  // },
];

const FILTERS = ["All", "Desserts", "Pasta", "Beverages", "Burgers"];

export default function ModelLibraryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedModel, setSelectedModel] = useState<ModelAsset | null>(null);

  const filteredModels = useMemo(() => {
    if (activeFilter === "All") return MODEL_ASSETS;
    return MODEL_ASSETS.filter((model) => model.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <PageSection
        title="3D Model Library"
        description="Centralize GLB, GLTF, and OBJ assets for immersive menu presentations."
        action={
          <div className="flex flex-wrap gap-2">
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              Import from Library
            </button>
            <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
              Upload Model
            </button>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition",
                activeFilter === filter
                  ? "border-primary-200 bg-primary-50 text-primary-600"
                  : "border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredModels.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => setSelectedModel(model)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={model.posterUrl}
                  alt={model.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {model.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                    Updated {model.updatedAt}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    {model.fileSize}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    {model.polygonCount} polys
                  </span>
                </div>
                <div className="mt-auto flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <img
                    src={model.itemImage}
                    alt={model.itemName}
                    className="h-12 w-12 rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="text-sm text-slate-600">
                    <p className="font-medium text-slate-800">
                      {model.itemName}
                    </p>
                    <p className="text-xs text-slate-500">
                      Tap to view 3D preview
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Model Assignments"
        description="Track which menu items reference each 3D asset and when they were last refreshed."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODEL_ASSETS.slice(0, 3).map((model) => (
            <div
              key={`assignment-${model.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={model.itemImage}
                  alt={model.itemName}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {model.itemName}
                  </p>
                  <p className="text-xs text-slate-500">
                    Viewer updated {model.updatedAt}
                  </p>
                </div>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-slate-500">
                {model.itemHighlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedModel(model)}
                className="mt-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
              >
                Preview model
              </button>
            </div>
          ))}
        </div>
      </PageSection>

      {selectedModel ? (
        <ModelPreviewModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      ) : null}
    </div>
  );
}

function ModelPreviewModal({
  model,
  onClose,
}: {
  model: ModelAsset;
  onClose: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${model.name} preview`}
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-5xl gap-6 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-500 transition hover:border-primary-200 hover:text-primary-600"
          aria-label="Close preview"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <model-viewer
            src={model.glbUrl}
            poster={model.posterUrl}
            alt={`${model.name} 3D model`}
            camera-controls
            auto-rotate
            shadow-intensity="0.8"
            exposure="0.9"
            interaction-prompt="auto"
            style={{ width: "100%", height: "420px" }}
          />
        </div>

        <div className="space-y-5">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
              Attached to menu item
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              {model.itemName}
            </h2>
            <p className="text-sm text-slate-500">{model.itemDescription}</p>
          </header>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:flex-row md:items-center">
            <img
              src={model.itemImage}
              alt={model.itemName}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div className="space-y-1 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Guest view includes:</p>
              <ul className="list-inside list-disc space-y-1 text-xs text-slate-500">
                {model.itemHighlights.map((highlight) => (
                  <li key={`${model.id}-highlight-${highlight}`}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <InfoPill label="File size" value={model.fileSize} />
            <InfoPill label="Polygon count" value={model.polygonCount} />
            <InfoPill label="Last updated" value={model.updatedAt} />
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
              Attach to another item
            </button>
            <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-primary-200 hover:text-primary-600">
              Download GLB
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="mt-1 text-slate-900">{value}</span>
    </div>
  );
}

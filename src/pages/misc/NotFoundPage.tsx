import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h2 className="text-3xl font-semibold text-slate-900">Page not found</h2>
      <p className="max-w-md text-sm text-slate-500">
        The page you are looking for may have been moved or removed. Choose a module from the navigation to continue.
      </p>
      <Link
        to="/dashboard"
        className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
      >
        Back to dashboard
      </Link>
    </div>
  );
}


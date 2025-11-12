import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { NAV_ITEMS } from "../../config/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentNav = useMemo(
    () => NAV_ITEMS.find((item) => location.pathname.startsWith(item.path)),
    [location.pathname]
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          items={NAV_ITEMS}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div className="flex flex-1 flex-col">
          <TopBar
            title={currentNav?.label ?? "Restaurant OS"}
            description={currentNav?.description}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            onToggleSidebarCollapse={() =>
              setIsSidebarCollapsed((prev) => !prev)
            }
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


import { Navigate, useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FeedbackPage from "./pages/feedback/FeedbackPage";
import ModelLibraryPage from "./pages/models/ModelLibraryPage";
import CategoryManagementPage from "./pages/menu/CategoryManagementPage";
import ItemDetailPage from "./pages/menu/ItemDetailPage";
import ItemManagementPage from "./pages/menu/ItemManagementPage";
import MenuOverviewPage from "./pages/menu/MenuOverviewPage";
import NotFoundPage from "./pages/misc/NotFoundPage";
import LiveOrdersPage from "./pages/orders/LiveOrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import OrderHistoryPage from "./pages/orders/OrderHistoryPage";
import OrdersLayout from "./pages/orders/OrdersLayout";
import SettingsPage from "./pages/settings/SettingsPage";
import StaffManagementPage from "./pages/staff/StaffManagementPage";
import TableManagementPage from "./pages/tables/TableManagementPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      {
        path: "menu",
        children: [
          { index: true, element: <Navigate to="/menu/items" replace /> },
          { path: "overview", element: <MenuOverviewPage /> },
          { path: "categories", element: <CategoryManagementPage /> },
          { path: "items", element: <ItemManagementPage /> },
          { path: "items/:itemId", element: <ItemDetailPage /> },
        ],
      },
      { path: "tables", element: <TableManagementPage /> },
      {
        path: "orders",
        element: <OrdersLayout />,
        children: [
          { index: true, element: <Navigate to="live" replace /> },
          { path: "live", element: <LiveOrdersPage /> },
          { path: "history", element: <OrderHistoryPage /> },
          { path: ":orderId", element: <OrderDetailPage /> },
        ],
      },
      { path: "models", element: <ModelLibraryPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "staff", element: <StaffManagementPage /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

export default function App() {
  const element = useRoutes(routes);
  return element;
}


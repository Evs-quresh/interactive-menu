export type NavItem = {
  label: string;
  path: string;
  icon: string;
  description?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "chart", description: "Overview and quick insights" },
  { label: "Menu", path: "/menu/items", icon: "menu", description: "Manage categories and items" },
  { label: "Tables & QR", path: "/tables", icon: "table", description: "Configure tables and QR codes" },
  { label: "Orders", path: "/orders/live", icon: "receipt", description: "Monitor live and historical orders" },
  { label: "3D Models", path: "/models", icon: "cube", description: "Library of 3D assets" },
  { label: "Analytics", path: "/analytics", icon: "analytics", description: "Reports and performance metrics" },
  { label: "Settings", path: "/settings", icon: "settings", description: "Restaurant configuration" },
  { label: "Staff", path: "/staff", icon: "users", description: "Role management" },
  { label: "Feedback", path: "/feedback", icon: "feedback", description: "Customer insights" },
];


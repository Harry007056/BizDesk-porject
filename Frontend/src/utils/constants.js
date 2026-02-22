export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const AUTH_STORAGE_KEY = "bizdesk_auth";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "staff", label: "Staff" },
  { id: "customers", label: "Customers" },
  { id: "services", label: "Services" },
  { id: "appointments", label: "Appointments" },
  { id: "subscription", label: "Subscription" },
];

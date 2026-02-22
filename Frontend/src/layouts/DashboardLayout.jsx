import { NAV_ITEMS } from "../utils/constants";

export default function DashboardLayout({
  activeTab,
  onTabChange,
  onRefresh,
  refreshing,
  title,
  user,
  business,
  onLogout,
  children,
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <aside className="grid gap-4 bg-gradient-to-b from-blue-950 to-blue-900 p-5 text-blue-100 lg:grid-rows-[auto_1fr_auto]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Workspace</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{business?.name}</h2>
          <p className="text-sm text-blue-200">{business?.slug}</p>
        </div>

        <nav className="grid content-start gap-2 md:grid-cols-3 lg:grid-cols-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                activeTab === item.id
                  ? "border-blue-100 bg-blue-100/20 text-white"
                  : "border-blue-200/30 bg-transparent text-blue-100 hover:bg-blue-100/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-blue-200/30 pt-3">
          <p className="text-sm text-white">{user?.name}</p>
          <p className="text-xs text-blue-200">{user?.role}</p>
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-2 text-sm font-semibold text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="space-y-4 p-5 lg:p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </header>
        {children}
      </main>
    </div>
  );
}

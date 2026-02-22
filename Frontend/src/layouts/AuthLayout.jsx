export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen gap-6 p-5 lg:grid-cols-[1fr_1.2fr] lg:p-8">
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 to-emerald-600 p-8 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
          Multi-Tenant SaaS
        </p>
        <h1 className="mt-2 text-5xl font-semibold">BizDesk</h1>
        <p className="mt-4 max-w-xl text-blue-50">
          Centralized operations for bookings, staff, customers, and
          subscriptions.
        </p>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:p-6">
        {children}
      </section>
    </div>
  );
}

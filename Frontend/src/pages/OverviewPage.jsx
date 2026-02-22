import StatCard from "../components/StatCard";

export default function OverviewPage({ overview }) {
  if (!overview) return null;

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Customers" value={overview.totals.customers} accent="bg-orange-400" />
        <StatCard label="Staff" value={overview.totals.staff} accent="bg-emerald-500" />
        <StatCard label="Services" value={overview.totals.services} accent="bg-blue-500" />
        <StatCard
          label="Appointments"
          value={overview.totals.appointments}
          accent="bg-amber-500"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Today Appointments"
          value={overview.todayAppointments}
          accent="bg-violet-500"
        />
        <StatCard
          label="Upcoming Appointments"
          value={overview.upcomingAppointments}
          accent="bg-pink-500"
        />
        <StatCard
          label="Monthly Revenue"
          value={overview.monthlyRevenue}
          accent="bg-cyan-500"
        />
      </div>
    </section>
  );
}

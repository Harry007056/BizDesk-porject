export default function StatCard({ label, value, accent = "bg-blue-500" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`mb-3 h-1.5 w-14 rounded-full ${accent}`} />
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-1 text-2xl font-semibold text-slate-800">{value}</h3>
    </div>
  );
}

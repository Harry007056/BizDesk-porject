import DataTable from "../components/DataTable";

const plans = ["starter", "growth", "scale", "enterprise"];

export default function SubscriptionPage({ subscription, onPlanChange }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Current Plan</h3>
        <p className="text-sm text-slate-500">
          Plan: <strong>{subscription?.plan || "-"}</strong> | Status:{" "}
          <strong>{subscription?.status || "-"}</strong> | Seats:{" "}
          <strong>{subscription?.seats || 0}</strong>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {plans.map((plan) => (
          <button
            key={plan}
            type="button"
            onClick={() => onPlanChange(plan)}
            className={`rounded-xl px-3 py-2 text-sm font-medium ${
              subscription?.plan === plan
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Switch to {plan}
          </button>
        ))}
      </div>

      <DataTable
        columns={["Feature", "Value"]}
        rows={[
          ["Max Staff", subscription?.features?.maxStaff ?? "-"],
          [
            "Max Appointments / Month",
            subscription?.features?.maxAppointmentsPerMonth ?? "-",
          ],
          [
            "Analytics Enabled",
            String(subscription?.features?.analyticsEnabled ?? false),
          ],
          [
            "Renewal Date",
            subscription?.renewalDate
              ? new Date(subscription.renewalDate).toLocaleDateString()
              : "-",
          ],
        ]}
      />
    </section>
  );
}

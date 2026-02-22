import DataTable from "../components/DataTable";
import FormField from "../components/FormField";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400";

export default function CustomersPage({ form, setForm, onCreate, customers }) {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[320px_1fr]">
      <form onSubmit={onCreate} className="grid content-start gap-3">
        <h3 className="text-lg font-semibold text-slate-800">Add Customer</h3>
        <FormField label="Name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </FormField>
        <FormField label="Email">
          <input
            className={inputClass}
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
        </FormField>
        <FormField label="Phone">
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </FormField>
        <FormField label="Notes">
          <textarea
            className={inputClass}
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          />
        </FormField>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Customer
        </button>
      </form>

      <DataTable
        columns={["Name", "Email", "Phone", "Visits"]}
        rows={customers.map((item) => [
          item.name,
          item.email || "-",
          item.phone || "-",
          item.totalVisits ?? 0,
        ])}
      />
    </section>
  );
}

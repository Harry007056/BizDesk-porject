import DataTable from "../components/DataTable";
import FormField from "../components/FormField";
import { formatDateTime } from "../utils/format";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400";

export default function AppointmentsPage({
  form,
  setForm,
  onCreate,
  appointments,
  customers,
  services,
  staff,
}) {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[320px_1fr]">
      <form onSubmit={onCreate} className="grid content-start gap-3">
        <h3 className="text-lg font-semibold text-slate-800">Schedule Appointment</h3>

        <FormField label="Service">
          <select
            className={inputClass}
            value={form.serviceId}
            onChange={(e) => setForm((prev) => ({ ...prev, serviceId: e.target.value }))}
            required
          >
            <option value="">Select service</option>
            {services.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Customer">
          <select
            className={inputClass}
            value={form.customerId}
            onChange={(e) => setForm((prev) => ({ ...prev, customerId: e.target.value }))}
            required
          >
            <option value="">Select customer</option>
            {customers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Staff">
          <select
            className={inputClass}
            value={form.staffId}
            onChange={(e) => setForm((prev) => ({ ...prev, staffId: e.target.value }))}
            required
          >
            <option value="">Select staff</option>
            {staff.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} ({item.role})
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Start Time">
          <input
            className={inputClass}
            type="datetime-local"
            value={form.startAt}
            onChange={(e) => setForm((prev) => ({ ...prev, startAt: e.target.value }))}
            required
          />
        </FormField>

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Appointment
        </button>
      </form>

      <DataTable
        columns={["Customer", "Service", "Staff", "Start", "Status"]}
        rows={appointments.map((item) => [
          item.customer?.name || "-",
          item.service?.name || "-",
          item.staff?.name || "-",
          formatDateTime(item.startAt),
          item.status,
        ])}
      />
    </section>
  );
}

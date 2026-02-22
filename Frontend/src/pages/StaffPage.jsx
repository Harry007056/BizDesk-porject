import DataTable from "../components/DataTable";
import FormField from "../components/FormField";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400";

export default function StaffPage({ form, setForm, onCreate, staff }) {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[320px_1fr]">
      <form onSubmit={onCreate} className="grid content-start gap-3">
        <h3 className="text-lg font-semibold text-slate-800">Add Staff</h3>
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
            required
          />
        </FormField>
        <FormField label="Password">
          <input
            className={inputClass}
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
        </FormField>
        <FormField label="Phone">
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </FormField>
        <FormField label="Role">
          <select
            className={inputClass}
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Staff
        </button>
      </form>

      <DataTable
        columns={["Name", "Email", "Role", "Phone"]}
        rows={staff.map((item) => [item.name, item.email, item.role, item.phone || "-"])}
      />
    </section>
  );
}

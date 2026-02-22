import DataTable from "../components/DataTable";
import FormField from "../components/FormField";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400";

export default function ServicesPage({ form, setForm, onCreate, services }) {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[320px_1fr]">
      <form onSubmit={onCreate} className="grid content-start gap-3">
        <h3 className="text-lg font-semibold text-slate-800">Add Service</h3>
        <FormField label="Name">
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </FormField>
        <FormField label="Category">
          <input
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          />
        </FormField>
        <FormField label="Duration (min)">
          <input
            className={inputClass}
            type="number"
            value={form.durationMin}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, durationMin: Number(e.target.value) }))
            }
            required
          />
        </FormField>
        <FormField label="Price">
          <input
            className={inputClass}
            type="number"
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
            required
          />
        </FormField>
        <FormField label="Description">
          <textarea
            className={inputClass}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
        </FormField>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Service
        </button>
      </form>

      <DataTable
        columns={["Name", "Category", "Duration", "Price"]}
        rows={services.map((item) => [
          item.name,
          item.category,
          `${item.durationMin} min`,
          item.price,
        ])}
      />
    </section>
  );
}

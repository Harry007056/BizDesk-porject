export default function FormField({ label, children }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-slate-500">{label}</span>
      {children}
    </label>
  );
}

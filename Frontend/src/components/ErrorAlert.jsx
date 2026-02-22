export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
      {message}
    </p>
  );
}

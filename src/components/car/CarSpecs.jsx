export default function CarSpecs({ specs }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">{spec.label}</p>
          <p className="mt-2 text-lg font-semibold text-text-primary">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}

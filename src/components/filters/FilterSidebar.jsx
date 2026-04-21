import { FilterX } from 'lucide-react';

const fieldClass =
  'h-12 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-text-primary outline-none transition focus:border-brand';

function translateFuel(fuel) {
  const map = {
    Diesel: 'Diésel',
    Petrol: 'Gasolina',
    Hybrid: 'Híbrido',
    Electric: 'Eléctrico',
  };

  return map[fuel] || fuel;
}

export default function FilterSidebar({ filters, setFilters, onReset, brands, fuels, years }) {
  return (
    <aside className="glass rounded-3xl p-5 lg:sticky lg:top-24">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">Filtros</p>
          <h2 className="mt-1 text-xl font-bold text-text-primary">Refina el inventario</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-text-primary transition hover:bg-white/10"
        >
          <FilterX className="h-4 w-4" />
          Limpiar
        </button>
      </div>

      <div className="space-y-5">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Precio máximo</span>
          <input
            type="range"
            min="20000"
            max="60000"
            step="1000"
            value={filters.maxPrice}
            onChange={(event) => setFilters((current) => ({ ...current, maxPrice: Number(event.target.value) }))}
            className="accent-brand"
          />
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>€20k</span>
            <span className="font-semibold text-text-primary">Hasta €{filters.maxPrice.toLocaleString('es-ES')}</span>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Marca</span>
          <select value={filters.brand} onChange={(event) => setFilters((current) => ({ ...current, brand: event.target.value }))} className={fieldClass}>
            <option value="">Todas las marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Combustible</span>
          <select value={filters.fuel} onChange={(event) => setFilters((current) => ({ ...current, fuel: event.target.value }))} className={fieldClass}>
            <option value="">Todos los combustibles</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {translateFuel(fuel)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Año</span>
          <select value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: event.target.value }))} className={fieldClass}>
            <option value="">Cualquier año</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-3xl border border-brand/20 bg-brand/10 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">Consejo</p>
        <p className="mt-2 text-sm leading-6 text-text-primary">
          Afilando por marca y combustible encontrarás antes el coche ideal; después abre la ficha para ver fotos y especificaciones.
        </p>
      </div>
    </aside>
  );
}

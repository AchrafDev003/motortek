import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import { useInventory } from '../../context/InventoryContext';

export default function SearchBar({ compact = false, className = '' }) {
  const navigate = useNavigate();
  const { brands, years } = useInventory();
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('50000');

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (year) params.set('year', year);
    if (price) params.set('price', price);
    navigate(`/catalog?${params.toString()}`);
  };

  return (
    <GlassCard className={`p-4 ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={`grid gap-3 ${compact ? 'md:grid-cols-[1.2fr_0.8fr_0.8fr_auto]' : 'lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]'}`}
      >
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Marca</span>
          <select
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-text-primary outline-none transition focus:border-brand"
          >
            <option value="">Todas las marcas</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Precio máximo</span>
          <select
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-text-primary outline-none transition focus:border-brand"
          >
            <option value="20000">Hasta 20.000 €</option>
            <option value="30000">Hasta 30.000 €</option>
            <option value="40000">Hasta 40.000 €</option>
            <option value="50000">Hasta 50.000 €</option>
            <option value="100000">Todos los presupuestos</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">Año</span>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-text-primary outline-none transition focus:border-brand"
          >
            <option value="">Cualquier año</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit" className="h-12 px-6">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
      </form>
    </GlassCard>
  );
}

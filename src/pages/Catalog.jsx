import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import CarCard from '../components/car/CarCard';
import FilterSidebar from '../components/filters/FilterSidebar';
import GlassCard from '../components/ui/GlassCard';
import { useInventory } from '../context/InventoryContext';

export default function Catalog() {
  const { cars, brands, fuels, years } = useInventory();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    maxPrice: Number(searchParams.get('price') || 60000),
    brand: searchParams.get('brand') || '',
    fuel: searchParams.get('fuel') || '',
    year: searchParams.get('year') || '',
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesPrice = car.price <= filters.maxPrice;
      const matchesBrand = filters.brand ? car.brand === filters.brand : true;
      const matchesFuel = filters.fuel ? car.fuel === filters.fuel : true;
      const matchesYear = filters.year ? car.year === Number(filters.year) : true;
      return matchesPrice && matchesBrand && matchesFuel && matchesYear;
    });
  }, [cars, filters]);

  const resetFilters = () =>
    setFilters({
      maxPrice: 60000,
      brand: '',
      fuel: '',
      year: '',
    });

  return (
    <Container className="py-10 sm:py-14">
      <Reveal>
        <SectionHeading
          eyebrow="Catálogo"
          title="Explora coches de ocasión premium"
          description="Refina el inventario con filtros limpios y navega por los anuncios en un diseño responsive y de alto contraste."
        />
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[340px_1fr]">
        <Reveal>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            brands={brands}
            fuels={fuels}
            years={years}
          />
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">Inventario</p>
                <p className="mt-1 text-lg font-bold text-text-primary">
                  {filteredCars.length} coche{filteredCars.length === 1 ? '' : 's'} disponible{filteredCars.length === 1 ? '' : 's'}
                </p>
              </div>
              <p className="text-sm text-text-secondary">
                Los filtros se actualizan con suavidad para mantener la experiencia rápida y legible.
              </p>
            </GlassCard>
          </Reveal>

          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car, index) => (
              <Reveal key={car.id} delay={index * 0.025}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </motion.div>

          {filteredCars.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <h3 className="text-2xl font-bold text-text-primary">No hay coches que coincidan con esos filtros.</h3>
              <p className="mt-3 text-sm text-text-secondary">Prueba a ampliar el rango de precio o a limpiar marca y combustible.</p>
            </GlassCard>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

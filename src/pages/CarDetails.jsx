import { ArrowLeft, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import GlassCard from '../components/ui/GlassCard';
import CarGallery from '../components/car/CarGallery';
import CarSpecs from '../components/car/CarSpecs';
import { useInventory } from '../context/InventoryContext';

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function formatKm(km) {
  return new Intl.NumberFormat('es-ES').format(km);
}

function translateFuel(fuel) {
  const map = {
    Diesel: 'Diésel',
    Petrol: 'Gasolina',
    Hybrid: 'Híbrido',
    Electric: 'Eléctrico',
  };

  return map[fuel] || fuel;
}

function translateTransmission(transmission) {
  const map = {
    Automatic: 'Automático',
    Manual: 'Manual',
  };

  return map[transmission] || transmission;
}

function translateBody(body) {
  const map = {
    SUV: 'SUV',
    Estate: 'Familiar',
    Sedan: 'Berlina',
  };

  return map[body] || body;
}

export default function CarDetails() {
  const { id } = useParams();
  const { findCarById, featuredCars } = useInventory();
  const car = findCarById(id);

  const specs = useMemo(() => {
    if (!car) return [];
    return [
      { label: 'Año', value: car.year },
      { label: 'Kilometraje', value: `${formatKm(car.km)} km` },
      { label: 'Combustible', value: translateFuel(car.fuel) },
      { label: 'Cambio', value: translateTransmission(car.transmission) },
      { label: 'Tipo de carrocería', value: translateBody(car.body) },
      { label: 'Ciudad', value: car.city },
    ];
  }, [car]);

  if (!car) {
    return (
      <Container className="py-16">
        <GlassCard className="p-10 text-center">
          <h1 className="text-3xl font-bold text-text-primary">Coche no encontrado</h1>
          <p className="mt-3 text-sm text-text-secondary">Este anuncio puede no estar disponible. Explora el inventario activo.</p>
          <Button as="link" to="/catalog" className="mt-6">
            Volver al catálogo
          </Button>
        </GlassCard>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-12">
      <Reveal>
        <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition hover:text-text-primary">
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
      </Reveal>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="space-y-8">
            <CarGallery images={car.gallery} alt={`${car.brand} ${car.model}`} />
            <GlassCard className="p-6">
              <SectionHeading eyebrow="Resumen" title={`${car.brand} ${car.model}`} description={car.description} />
              <div className="mt-6 flex flex-wrap gap-3">
                {car.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-text-primary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    {feature}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">{car.brand}</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-text-primary">{car.model}</h1>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-text-secondary">Precio de salida</p>
                  <p className="text-4xl font-bold text-brand">{formatPrice(car.price)}</p>
                </div>
                <div className="rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.22em] text-brand">Estado</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">Disponible ahora</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button className="w-full">
                  <PhoneCall className="h-4 w-4" />
                  Contactar
                </Button>
                <Button variant="secondary" className="w-full">
                  Reservar
                </Button>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-brand" />
                  <p className="text-sm font-semibold text-text-primary">Revisado y preparado para entrega</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Presentación premium, especificaciones transparentes y seguimiento rápido por parte del equipo del concesionario.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-text-primary">Especificaciones</h2>
              <p className="mt-2 text-sm text-text-secondary">Información clave del coche en una rejilla limpia, estilo ficha de producto.</p>
              <div className="mt-5">
                <CarSpecs specs={specs} />
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.14}>
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-text-primary">Datos rápidos</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Matriculación</span>
                  <span className="font-semibold text-text-primary">{car.year}</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Kilometraje</span>
                  <span className="font-semibold text-text-primary">{formatKm(car.km)} km</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Combustible</span>
                  <span className="font-semibold text-text-primary">{translateFuel(car.fuel)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Cambio</span>
                  <span className="font-semibold text-text-primary">{translateTransmission(car.transmission)}</span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>

      <section className="pb-8 pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Más inventario"
            title="Otros coches que podrían gustarte"
            description="Algunos vehículos más destacados del mismo inventario premium."
          />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCars
            .filter((item) => item.id !== car.id)
            .slice(0, 3)
            .map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <Link to={`/cars/${item.id}`}>
                  <GlassCard className="overflow-hidden">
                    <img src={item.image} alt={item.model} className="h-48 w-full object-cover" loading="lazy" />
                    <div className="p-5">
                      <p className="text-sm font-semibold text-brand">{formatPrice(item.price)}</p>
                      <h3 className="mt-1 text-lg font-bold text-text-primary">
                        {item.brand} {item.model}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {item.year} • {formatKm(item.km)} km
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>
    </Container>
  );
}

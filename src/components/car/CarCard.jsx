import { CalendarDays, Fuel, MapPin, Milestone, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';

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

function formatFuel(fuel) {
  const map = {
    Diesel: 'Diésel',
    Petrol: 'Gasolina',
    Hybrid: 'Híbrido',
    Electric: 'Eléctrico',
  };

  return map[fuel] || fuel;
}

function formatTransmission(transmission) {
  const map = {
    Automatic: 'Automático',
    Manual: 'Manual',
  };

  return map[transmission] || transmission;
}

export default function CarCard({ car, className = '' }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      <GlassCard className="group overflow-hidden">
        <Link to={`/cars/${car.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/22 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-text-primary backdrop-blur-md">
              {car.city}
            </div>
            <div className="absolute bottom-4 left-4 rounded-2xl border border-brand/20 bg-brand/10 px-3 py-2 text-sm font-bold text-brand backdrop-blur-md">
              {formatPrice(car.price)}
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-secondary">{car.brand}</p>
              <h3 className="mt-1 text-xl font-bold text-text-primary">{car.model}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-text-secondary">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <CalendarDays className="h-4 w-4 text-brand" />
                {car.year}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <Milestone className="h-4 w-4 text-brand" />
                {formatKm(car.km)} km
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <Fuel className="h-4 w-4 text-brand" />
                {formatFuel(car.fuel)}
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <MapPin className="h-4 w-4 text-brand" />
                {car.city}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-sm font-semibold text-text-primary">
              <span className="flex items-center gap-2 text-text-secondary">
                Ver ficha <MoveRight className="h-4 w-4" />
              </span>
              <span className="text-brand">{formatTransmission(car.transmission)}</span>
            </div>
          </div>
        </Link>
      </GlassCard>
    </motion.article>
  );
}

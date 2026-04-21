import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Fuel, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

function translateFuel(fuel) {
  const map = {
    Diesel: 'Diesel',
    Petrol: 'Gasolina',
    Hybrid: 'Hibrido',
    Electric: 'Electrico',
  };

  return map[fuel] || fuel;
}

function translateTransmission(transmission) {
  const map = {
    Automatic: 'Automatico',
    Manual: 'Manual',
  };

  return map[transmission] || transmission;
}

function getVisibleRadius(width) {
  if (width < 640) return 0;
  if (width < 1024) return 1;
  return 2;
}

function getOffset(index, active, length) {
  const raw = index - active;
  const wrapped = ((raw % length) + length) % length;
  return wrapped > length / 2 ? wrapped - length : wrapped;
}

export default function ImmersiveCarousel({ cars = [], autoplay = true }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );

  const goNext = () => {
    if (!cars.length) return;
    setActive((current) => (current + 1) % cars.length);
  };

  const goPrev = () => {
    if (!cars.length) return;
    setActive((current) => (current - 1 + cars.length) % cars.length);
  };

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!autoplay || isPaused || cars.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % cars.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [autoplay, isPaused, cars.length]);

  const visibleRadius = useMemo(() => getVisibleRadius(viewportWidth), [viewportWidth]);

  const visibleCars = useMemo(() => {
    return cars
      .map((car, index) => ({
        car,
        index,
        offset: getOffset(index, active, cars.length),
      }))
      .filter((item) => Math.abs(item.offset) <= visibleRadius);
  }, [cars, active, visibleRadius]);

  const handleDragEnd = (_, info) => {
    const threshold = 70;
    if (info.offset.x < -threshold) goNext();
    if (info.offset.x > threshold) goPrev();
  };

  const handleWheel = (event) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 18) return;

    event.preventDefault();
    if (delta > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  if (!cars.length) return null;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 p-4 shadow-glass">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.55),_transparent_45%)]" />

      <div className="relative flex items-center justify-between gap-4 px-2 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">Seleccion destacada</p>
          <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">Carrusel inmersivo</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            Desliza, usa los botones o la rueda para explorar los vehiculos con una sensacion de profundidad premium.
          </p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-primary transition hover:bg-white/10"
            aria-label="Vehiculo anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-primary transition hover:bg-white/10"
            aria-label="Vehiculo siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <motion.div
        className="relative mx-auto h-[470px] w-full overflow-visible sm:h-[520px] lg:h-[580px]"
        style={{ perspective: '1800px', touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={(event, info) => {
          setIsPaused(false);
          handleDragEnd(event, info);
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {visibleCars.map(({ car, index, offset }) => {
            const isActive = offset === 0;
            const depth = Math.abs(offset);
            const translateX = offset * (viewportWidth < 640 ? 0 : viewportWidth < 1024 ? 170 : 220);
            const scale = isActive ? 1 : viewportWidth < 640 ? 0.92 : 1 - depth * 0.11;
            const rotateY = offset * -16;
            const opacity = isActive ? 1 : viewportWidth < 640 ? 0.95 : Math.max(0.34, 0.88 - depth * 0.22);
            const zIndex = 100 - depth;

            return (
              <motion.article
                key={car.id}
                className="absolute left-1/2 top-1/2 w-[84vw] max-w-[370px] -translate-x-1/2 -translate-y-1/2 sm:w-[300px] lg:w-[325px]"
                animate={{
                  x: translateX,
                  scale,
                  rotateY,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 20,
                  mass: 0.9,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  filter: isActive ? 'drop-shadow(0 24px 42px rgba(34,197,94,0.16))' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isActive) {
                      navigate(`/cars/${car.id}`);
                    } else {
                      setActive(index);
                    }
                  }}
                  className="group block w-full text-left"
                  aria-label={`${car.brand} ${car.model}`}
                >
                  <GlassCard
                    className={`overflow-hidden border transition ${
                      isActive ? 'border-brand/40 shadow-[0_0_0_1px_rgba(34,197,94,0.25)]' : 'border-white/10'
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-text-primary backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-brand" />
                        {isActive ? 'Activo' : 'Explorar'}
                      </div>
                      <div className="absolute right-4 top-4 rounded-2xl border border-brand/20 bg-brand/10 px-3 py-2 text-sm font-bold text-brand backdrop-blur-md">
                        {formatPrice(car.price)}
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-text-secondary">{car.brand}</p>
                        <h3 className="mt-1 text-2xl font-bold tracking-tight text-text-primary">{car.model}</h3>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary sm:text-sm">
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <CalendarDays className="h-4 w-4 text-brand" />
                          {car.year}
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <Gauge className="h-4 w-4 text-brand" />
                          {formatKm(car.km)} km
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <Fuel className="h-4 w-4 text-brand" />
                          {translateFuel(car.fuel)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Cambio</p>
                          <p className="text-sm font-semibold text-text-primary">{translateTransmission(car.transmission)}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-brand" />
                      </div>
                    </div>
                  </GlassCard>
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-4 flex items-center justify-center gap-2 pb-1">
        {cars.map((car, index) => (
          <button
            key={car.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-8 bg-brand' : 'w-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Ir al vehiculo ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

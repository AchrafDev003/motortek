import { CarFront, Gauge, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import StatPill from '../components/ui/StatPill';
import SearchBar from '../components/filters/SearchBar';
import GlassCard from '../components/ui/GlassCard';
import { useInventory } from '../context/InventoryContext';
import ImmersiveCarousel from '../components/car/ImmersiveCarousel';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Historial verificado',
    description: 'Informes de estado transparentes, historial de mantenimiento y selección cuidadosa para comprar con confianza.',
  },
  {
    icon: Sparkles,
    title: 'Presentación premium',
    description: 'Cada anuncio se presenta con una experiencia de compra limpia, profesional y cuidada al detalle.',
  },
  {
    icon: Users,
    title: 'Atención humana',
    description: 'Compra con apoyo directo de un equipo que conoce el inventario y puede asesorarte en detalle.',
  },
  {
    icon: Gauge,
    title: 'Decisiones rápidas',
    description: 'Fichas claras, imágenes potentes y filtros sencillos para moverte con rapidez y seguridad.',
  },
];

export default function Home() {
  const { featuredCars } = useInventory();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1800&q=80"
            alt="Premium dealership hero"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/70 to-canvas" />
        </div>

        <Container className="relative pb-20 pt-20 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary backdrop-blur-md">
                  <CarFront className="h-4 w-4 text-brand" />
                  Coches premium de ocasión en Madrid, Barcelona y otras ciudades
                </div>
                <div className="space-y-5">
                  <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-text-primary text-balance sm:text-6xl lg:text-7xl">
                    Una experiencia de concesionario moderna para compradores que esperan más.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                    Explora coches de ocasión cuidadosamente seleccionados en España con una interfaz rápida, premium y fiable desde el primer clic.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button as="link" to="/catalog">
                    Ver inventario
                  </Button>
                  <Button as="link" to="/catalog" variant="secondary">
                    Ver destacados
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill label="Coches revisados" value="120+" />
                  <StatPill label="Respuesta media" value="< 10 min" />
                  <StatPill label="Ubicaciones" value="Toda España" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="lg:pl-8">
                <div className="glass-strong rounded-[2rem] p-4 shadow-glass">
                  <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/50 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Búsqueda inteligente</p>
                    <p className="mt-2 text-xl font-bold text-text-primary">Encuentra el coche adecuado en segundos</p>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      Filtra por marca, presupuesto y año, y entra después en un catálogo de alto nivel.
                    </p>
                    <div className="mt-5">
                      <SearchBar compact />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="-mt-8 pb-20" id="featured">
        <Container>
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Destacados"
                title="Selección principal del inventario"
                description="Una selección cuidada de coches premium de ocasión con gran valor, historial limpio y una presentación impecable."
              />
              <Button as="link" to="/catalog" variant="secondary">
                Ver todo el inventario
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <ImmersiveCarousel cars={featuredCars} />
          </Reveal>
        </Container>
      </section>

      <section className="pb-20" id="benefits">
        <Container>
          <Reveal>
            <div className="mb-10">
              <SectionHeading
                eyebrow="Por qué MotorTek"
                title="Un proceso de compra construido sobre la confianza"
                description="Todo está pensado para reducir fricción: búsqueda rápida, precios claros y un sistema visual premium pero sin exceso."
              />
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal key={benefit.title} delay={index * 0.05}>
                  <GlassCard className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-text-primary">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{benefit.description}</p>
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20" id="location">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <GlassCard className="relative overflow-hidden p-0">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
                <div className="grid min-h-[420px] place-items-center p-8">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50">
                    <div className="absolute inset-0">
                      <div className="absolute left-[18%] top-[18%] h-24 w-44 rounded-full bg-brand/15 blur-3xl" />
                      <div className="absolute right-[15%] top-[34%] h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                      <div className="absolute bottom-[20%] left-[32%] h-28 w-56 rounded-full bg-slate-500/15 blur-3xl" />
                    </div>
                    <div className="relative h-full p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">Vista de ubicación</p>
                      <h3 className="mt-3 text-3xl font-bold text-text-primary">Showroom de Madrid</h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-text-secondary">
                        Experiencia de mapa de referencia con un tratamiento visual premium y una llamada clara a la ubicación del concesionario.
                      </p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Dirección</p>
                          <p className="mt-2 text-sm font-semibold text-text-primary">Calle Serrano 147, Madrid</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Horario</p>
                          <p className="mt-2 text-sm font-semibold text-text-primary">Lun-Sáb, 09:00-20:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">Visítanos</p>
                  <h3 className="mt-3 text-3xl font-bold text-text-primary">Una experiencia en showroom que también se siente premium en persona.</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
                    Acceso céntrico, rotación cuidada de stock y un equipo preparado para ayudarte con pruebas, financiación y entrega.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill label="Teléfono" value="+34 910 112 338" />
                  <StatPill label="Correo" value="hello@motortek.es" />
                  <StatPill label="Disponibilidad" value="Visitas diarias" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

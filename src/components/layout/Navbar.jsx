import { Menu, Search, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useScrolled from '../../hooks/useScrolled';
import Button from '../ui/Button';
import Container from '../ui/Container';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`;

export default function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'glass-strong border-white/10' : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-slate-950 shadow-glass">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-text-secondary">MotorTek</p>
            <p className="text-xs text-text-secondary">Coches premium de ocasion en Espana</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/catalog" className={navLinkClass}>
            Catalogo
          </NavLink>
          <a href="#benefits" className="text-sm font-medium text-text-secondary transition hover:text-text-primary">
            Por que MotorTek
          </a>
          <a href="#location" className="text-sm font-medium text-text-secondary transition hover:text-text-primary">
            Ubicacion
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button as="link" to="/catalog" variant="secondary" className="px-4 py-2.5">
            <Search className="h-4 w-4" />
            Buscar inventario
          </Button>
          <Button as="link" to="/catalog" className="px-4 py-2.5">
            Reservar visita
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-primary md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-canvas/95 px-4 py-6 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/catalog" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Catalogo
            </NavLink>
            <a href="#benefits" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Por que MotorTek
            </a>
            <a href="#location" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Ubicacion
            </a>
            <div className="mt-2 flex flex-col gap-3">
              <Button as="link" to="/catalog" variant="secondary" className="w-full" onClick={() => setMobileOpen(false)}>
                <Search className="h-4 w-4" />
                Buscar inventario
              </Button>
              <Button as="link" to="/catalog" className="w-full" onClick={() => setMobileOpen(false)}>
                Reservar visita
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

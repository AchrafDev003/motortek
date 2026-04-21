import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/30">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Badge>MotorTek</Badge>
            <h3 className="mt-4 text-2xl font-bold text-text-primary">Una forma mejor de comprar un coche de ocasión en España.</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary">
              Inventario premium, precios transparentes y una experiencia de compra limpia que ayuda a decidir con confianza.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-secondary">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                Calle Serrano 147, Madrid
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                +34 910 112 338
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                hello@motortek.es
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-secondary">Síguenos</p>
            <div className="mt-4 flex gap-3">
              <Link
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-primary transition hover:bg-white/10"
                to="/"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-primary transition hover:bg-white/10"
                to="/"
              >
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-text-secondary md:flex-row md:items-center md:justify-between">
          <p>© 2026 MotorTek. Todos los derechos reservados.</p>
          <p>Diseñado para una experiencia premium de concesionario.</p>
        </div>
      </Container>
    </footer>
  );
}

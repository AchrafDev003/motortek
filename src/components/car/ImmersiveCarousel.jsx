import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CleanCarousel({ cars = [] }) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  if (!cars.length) return null;

  const next = () => setActive((i) => (i + 1) % cars.length);
  const prev = () => setActive((i) => (i - 1 + cars.length) % cars.length);

  return (
    <section className="py-10">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Coches destacados
        </h2>

        <div className="flex gap-2">
          <button onClick={prev} className="px-3 py-2 bg-white/10 rounded-lg">‹</button>
          <button onClick={next} className="px-3 py-2 bg-white/10 rounded-lg">›</button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${active * 260}px` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {cars.map((car, index) => {
            const isActive = index === active;

            return (
              <motion.div
                key={car.id}
                className="min-w-[240px]"
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <div
                  onClick={() => navigate(`/cars/${car.id}`)}
                  className="cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10"
                >
                  {/* IMAGE */}
                  <div className="h-36 overflow-hidden">
                    <img
                      src={car.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold">
                      {car.brand} {car.model}
                    </h3>

                    <p className="text-green-400 font-bold mt-1">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      }).format(car.price)}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {car.year} • {car.km} km
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
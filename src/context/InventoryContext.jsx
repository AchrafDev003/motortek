import { createContext, useContext, useMemo } from 'react';
import { cars } from '../data/cars';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const value = useMemo(() => {
    const brands = [...new Set(cars.map((car) => car.brand))].sort();
    const fuels = [...new Set(cars.map((car) => car.fuel))].sort();
    const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);

    return {
      cars,
      featuredCars: cars.slice(0, 6),
      brands,
      fuels,
      years,
      findCarById: (id) => cars.find((car) => car.id === id),
    };
  }, []);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
}

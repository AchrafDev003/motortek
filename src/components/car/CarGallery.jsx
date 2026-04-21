import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function CarGallery({ images, alt }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % images.length);
  const prev = () => setIndex((current) => (current - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={alt}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur-md transition hover:bg-slate-950"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur-md transition hover:bg-slate-950"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, imageIndex) => (
          <button
            type="button"
            key={image}
            onClick={() => setIndex(imageIndex)}
            className={`overflow-hidden rounded-2xl border transition ${
              index === imageIndex ? 'border-brand ring-2 ring-brand/30' : 'border-white/10'
            }`}
          >
            <img src={image} alt={`${alt} thumbnail ${imageIndex + 1}`} className="h-24 w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-brand text-slate-950 hover:bg-brand-hover shadow-[0_12px_40px_rgba(34,197,94,0.24)]',
  secondary: 'bg-slate-900/40 text-text-primary hover:bg-slate-800/60 border border-white/10',
  ghost: 'bg-transparent text-text-primary hover:bg-white/5 border border-transparent',
};

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  to,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold tracking-tight transition duration-200 ${variants[variant]} ${className}`;

  const content = (
    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      {children}
    </motion.span>
  );

  if (as === 'link' || to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-text-secondary">{description}</p> : null}
    </div>
  );
}

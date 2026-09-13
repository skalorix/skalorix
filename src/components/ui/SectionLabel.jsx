export default function SectionLabel({ text, children, dark = false }) {
  return (
    <div className="section-label">
      <div className="section-label__line" />
      <span className={`section-label__text ${dark ? 'label--ochre' : ''}`}>
        {children || text}
      </span>
    </div>
  );
}

import { useContext } from 'react';
import { SlideMetaContext } from '../slide-meta.js';
import { joinCx } from './anim.js';

/**
 * <SlideFrame eyebrow="Math Lens 1" title="Relational Algebra & Set Theory">
 *   ...
 * </SlideFrame>
 *
 * Shared chrome for every content slide: eyebrow + title + accent rule + page
 * footer. Use the `dark` prop for the cover/closing slides.
 */
export function SlideFrame({
  eyebrow,
  title,
  subtitle,
  ruleColor,
  dark,
  className,
  footerLeft,
  children,
}) {
  const meta = useContext(SlideMetaContext);
  return (
    <section className={joinCx('slide', dark && 'slide--dark', className)}>
      {eyebrow && <div className="slide__eyebrow">{eyebrow}</div>}
      {title && <h1 className="slide__title">{title}</h1>}
      {subtitle && <p className="slide__subtitle">{subtitle}</p>}
      {title && (
        <div
          className="slide__rule"
          style={ruleColor ? { background: ruleColor } : undefined}
        />
      )}
      <div className="slide__body">{children}</div>
      <div className="slide__footer">
        <span>{footerLeft ?? 'Omar Elfouly — Practical Internship · Google Perfetto'}</span>
        <span>
          <span className="slide__pagenum">{meta.num}</span>
          <span style={{ opacity: 0.5, margin: '0 6px' }}>/</span>
          <span>{meta.total}</span>
        </span>
      </div>
    </section>
  );
}

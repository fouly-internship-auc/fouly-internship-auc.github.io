import { animProps, joinCx } from './anim.js';

/**
 * <Animated as="div" animate="ease" delay={120}>...</Animated>
 *
 * Wraps children in an element with the shared animation classes; the parent
 * slide controls when the animation runs via `data-deck-active`.
 */
export function Animated({
  as: Tag = 'div',
  animate = 'fade',
  delay,
  className,
  style,
  children,
  ...rest
}) {
  const a = animProps(animate, delay);
  return (
    <Tag
      className={joinCx(a.className, className)}
      style={{ ...a.style, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

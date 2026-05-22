/**
 * Shared helper for slide layout components that accept `animate` and `delay`
 * props — mirrors the API in kws-soc-deck so authoring patterns transfer.
 *
 *   animate: 'fade' | 'ease' | 'up' | 'pop' | true | false   (default 'fade')
 *   delay:   number (ms)
 */
export function animProps(animate, delay) {
  if (animate === false || animate == null) {
    return { className: '', style: undefined };
  }
  const effect = animate === true ? 'fade' : animate;
  return {
    className: `anim anim-${effect}`,
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  };
}

export function joinCx(...parts) {
  return parts.filter(Boolean).join(' ');
}

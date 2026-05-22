import { useEffect, useRef, useState } from 'react';

const DESIGN_W = 1920;
const DESIGN_H = 1080;
const OVERLAY_HIDE_MS = 1600;

/**
 * Lean DeckStage — stacked slides, keyboard navigation (←/→, space, PgUp/PgDn,
 * Home/End, R), scale-to-viewport, and one-page-per-slide print support.
 * Modelled on the kws-soc-deck pattern but trimmed to the essentials this
 * deliverable needs.
 */
export function DeckStage({ children }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayTimer = useRef(null);
  const [index, setIndex] = useState(() => {
    const hash = (location.hash || '').replace('#', '');
    const n = parseInt(hash, 10);
    return Number.isFinite(n) && n >= 1 ? n - 1 : 0;
  });
  const [overlayVisible, setOverlayVisible] = useState(false);

  const slides = Array.isArray(children) ? children : [children];
  const total = slides.length;

  // Scale the 1920×1080 canvas to fit the viewport.
  useEffect(() => {
    function fit() {
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const scale = Math.min(sw / DESIGN_W, sh / DESIGN_H);
      canvas.style.transform = `scale(${scale})`;
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Keyboard navigation.
  useEffect(() => {
    function onKey(e) {
      const k = e.key;
      let next = null;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') next = Math.min(total - 1, index + 1);
      else if (k === 'ArrowLeft' || k === 'PageUp') next = Math.max(0, index - 1);
      else if (k === 'Home') next = 0;
      else if (k === 'End') next = total - 1;
      else if (k === 'r' || k === 'R') next = 0;
      else if (/^[1-9]$/.test(k)) next = Math.min(total - 1, parseInt(k, 10) - 1);
      if (next != null && next !== index) {
        e.preventDefault();
        setIndex(next);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, total]);

  // Update URL hash so reload + presenter window land on the same slide.
  useEffect(() => {
    history.replaceState(null, '', `#${index + 1}`);
  }, [index]);

  // Show the slide-count overlay briefly after each navigation.
  useEffect(() => {
    setOverlayVisible(true);
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => setOverlayVisible(false), OVERLAY_HIDE_MS);
    return () => overlayTimer.current && clearTimeout(overlayTimer.current);
  }, [index]);

  // Mouse-move briefly shows the overlay too.
  useEffect(() => {
    function onMove() {
      setOverlayVisible(true);
      if (overlayTimer.current) clearTimeout(overlayTimer.current);
      overlayTimer.current = setTimeout(() => setOverlayVisible(false), OVERLAY_HIDE_MS);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="deck-stage" ref={stageRef}>
      <div className="deck-stage__canvas" ref={canvasRef}>
        {slides.map((child, i) => (
          <SlideHost key={i} active={i === index}>
            {child}
          </SlideHost>
        ))}
      </div>
      <div className="deck-stage__overlay" data-visible={overlayVisible || undefined}>
        {index + 1} / {total}
        <span style={{ opacity: 0.55, marginLeft: 12 }}>
          ← → · space · R · 1–9
        </span>
      </div>
    </div>
  );
}

// Tiny wrapper so each child gets the right data attribute without authors
// having to remember to set it. We clone the element and inject the prop.
import { cloneElement, isValidElement } from 'react';
function SlideHost({ active, children }) {
  if (!isValidElement(children)) return children;
  const existing = children.props.className || '';
  return cloneElement(children, {
    className: existing,
    'data-deck-active': active ? '' : undefined,
  });
}

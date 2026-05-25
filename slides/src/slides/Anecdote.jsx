import { Animated } from '../components/Animated.jsx';
import { SlideFrame } from '../components/SlideFrame.jsx';

/**
 * Anecdote — the Saturday morning that pulled three people out of their
 * weekends in the same fifteen-minute window.
 */
export default function Anecdote() {
  return (
    <SlideFrame
      eyebrow="Section 7 · An anecdote"
      title="The night three minutes meant three people"
      subtitle="A late Friday night in London, a cross-team breakage, and a one-minute reply."
      ruleColor="var(--color-warm)"
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8,
      }}>
        {/* Joe at Chrome */}
        <Animated as="div" animate="up" delay={150}
          style={{
            display: 'grid',
            gridTemplateColumns: '170px 110px 1fr',
            gap: 22, alignItems: 'center',
          }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 20,
            color: 'var(--color-ink-muted)',
            fontVariantNumeric: 'tabular-nums', textAlign: 'right',
          }}>
            Fri 23:40
            <div style={{ fontSize: 14, color: 'var(--color-ink-faint)' }}>
              London BST
            </div>
          </div>
          <div className="label-chip" style={{
            justifySelf: 'start', fontSize: 16, background: '#e8f5e9',
            color: 'var(--color-good)', fontWeight: 700,
          }}>
            Joe · Chrome
          </div>
          <div style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-rule)',
            borderRadius: 14, padding: '14px 22px',
            fontSize: 19, lineHeight: 1.4,
          }}>
            &ldquo;The Chrome diff tests are currently broken because of this.
            Chrome builds with <span className="mono">enable_perfetto_etm_importer = false</span>
            and the stdlib now includes <span className="mono">etm.sql</span> unconditionally.&rdquo;
          </div>
        </Animated>

        {/* gap */}
        <Animated as="div" animate="pop" delay={400}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, marginLeft: 200,
            color: 'var(--color-warm)',
          }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontWeight: 700,
            fontSize: 48, letterSpacing: '-0.01em', lineHeight: 1,
          }}>
            +1 min
          </div>
        </Animated>

        {/* Lalit */}
        <Animated as="div" animate="up" delay={650}
          style={{
            display: 'grid',
            gridTemplateColumns: '170px 110px 1fr',
            gap: 22, alignItems: 'center',
          }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 20,
            color: 'var(--color-ink-muted)',
            fontVariantNumeric: 'tabular-nums', textAlign: 'right',
          }}>
            Fri 23:41
            <div style={{ fontSize: 14, color: 'var(--color-ink-faint)' }}>
              London BST
            </div>
          </div>
          <div className="label-chip" style={{
            justifySelf: 'start', fontSize: 16,
            background: 'var(--color-warm-soft)',
            color: 'var(--color-warm)', fontWeight: 700,
          }}>
            Lalit
          </div>
          <div style={{
            background: 'var(--color-warm-soft)',
            border: '1px solid var(--color-warm)',
            borderRadius: 14, padding: '14px 22px',
            fontSize: 19, lineHeight: 1.4,
          }}>
            &ldquo;This won&rsquo;t break non-GN builds. It&rsquo;s WAI that
            those builds don&rsquo;t have etm code.&rdquo;
          </div>
        </Animated>

        {/* Omar — Saturday 00:29 */}
        <Animated as="div" animate="up" delay={950}
          style={{
            display: 'grid',
            gridTemplateColumns: '170px 110px 1fr',
            gap: 22, alignItems: 'center',
          }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 20,
            color: 'var(--color-warm)',
            fontVariantNumeric: 'tabular-nums', textAlign: 'right',
          }}>
            Sat 00:29
            <div style={{ fontSize: 14, color: 'var(--color-ink-faint)' }}>
              London BST
            </div>
          </div>
          <div className="label-chip" style={{
            justifySelf: 'start', fontSize: 16, background: 'var(--color-accent-soft)',
            color: 'var(--color-accent)', fontWeight: 700,
          }}>
            me
          </div>
          <div style={{
            background: 'var(--color-bg-elevated)',
            border: '2px dashed var(--color-warm)',
            borderRadius: 14, padding: '14px 22px',
            fontSize: 19, lineHeight: 1.4,
            color: 'var(--color-ink-muted)', fontStyle: 'italic',
          }}>
            (pushed commit <span className="mono"
              style={{ fontStyle: 'normal' }}>tp: etm: temp mem hack for zips</span> on PR #2500;
            commented on the diff-test PR at 00:45.)
          </div>
        </Animated>
      </div>

      <Animated as="div" animate="fade" delay={1300}
        className="callout callout--warm" style={{ marginTop: 22 }}>
        <strong>Half-eleven on a Friday night in London.</strong> Three people in
        two different repos, one downstream breakage in a sister product, a
        one-minute clarification.
      </Animated>
    </SlideFrame>
  );
}

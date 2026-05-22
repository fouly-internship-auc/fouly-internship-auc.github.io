import { createRoot } from 'react-dom/client';
import './styles.css';
import { DeckStage } from './deck-stage.jsx';
import { slideComponents, slideMeta } from './slides/index.js';
import { SlideMetaContext } from './slide-meta.js';

function Deck() {
  const total = slideComponents.length;
  return (
    <DeckStage>
      {slideComponents.map((Slide, i) => (
        <SlideMetaContext.Provider
          key={i}
          value={{ num: i + 1, total, slide: slideMeta[i] }}
        >
          <Slide />
        </SlideMetaContext.Provider>
      ))}
    </DeckStage>
  );
}

createRoot(document.getElementById('root')).render(<Deck />);

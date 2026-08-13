import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import GameArea from '../components/game/GameArea';
import { saveGameResult } from '../utils/gameStats';
import { wordList } from '../data/wordlist';

export default function Home() {
  const location = useLocation();
  const [shuffleKey, setShuffleKey] = useState(0);

  // Parse mode from URL query string (e.g. ?mode=30)
  const queryParams = new URLSearchParams(location.search);
  const modeParam = queryParams.get('mode');

  // Default to 60s
  let initialTime = 60;
  if (modeParam === '30' || modeParam === '120') {
    initialTime = parseInt(modeParam, 10);
  }

  // Shuffle wordList and take 100 words - reshuffles when the mode changes
  // or when the restart/shuffle button is pressed (shuffleKey increments)
  const words = useMemo(() => {
    const shuffled = [...wordList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialTime and shuffleKey intentionally trigger a fresh shuffle
  }, [initialTime, shuffleKey]);

  const handleGameEnd = (wpm: number, accuracy: number, totalChars: number, correctChars: number, time: number) => {
    saveGameResult(time, {
      wpm,
      accuracy,
      time,
      correctChars,
      totalChars
    });
  };

  return (
    <main>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
          Ward<span style={{ color: 'var(--accent)' }}>Writer</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Offizieller Schreibtrainer</p>
      </header>
      
      <GameArea 
        words={words} 
        initialTime={initialTime} 
        onGameEnd={handleGameEnd} 
        onRestart={() => setShuffleKey(k => k + 1)}
      />
    </main>
  );
}

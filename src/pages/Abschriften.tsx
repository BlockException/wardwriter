import { useState, useEffect, useMemo, useCallback } from 'react';
import GameArea from '../components/game/GameArea';
import { saveGameResult } from '../utils/gameStats';

interface Article {
  title: string;
  text: string;
}

export default function Abschriften() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const pickRandomArticle = useCallback((pool: Article[]) => {
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentArticle(pool[randomIndex]);
  }, []);

  useEffect(() => {
    fetch('/data/articles.json')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(data);
        pickRandomArticle(data);
      })
      .catch(err => console.error("Failed to load articles:", err));
  }, [pickRandomArticle]);

  const words = useMemo(() => {
    if (!currentArticle) return [];
    // Collapse any stray newlines/whitespace so words never glue together (e.g. "satz.Nächster").
    return currentArticle.text.replace(/\s+/g, ' ').trim().split(' ');
  }, [currentArticle]);

  if (!currentArticle) {
    return (
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading">Artikel wird geladen...</div>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>Ward<span style={{ color: 'var(--accent)' }}>Writer</span></h1>
        <p>Abschriften Modus</p>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1.25rem',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem'
        }}>
          <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>Artikel:</span>
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{currentArticle.title}</span>
        </div>
      </div>
      
      <GameArea
        words={words}
        initialTime={600}
        onGameEnd={(wpm, accuracy, totalChars, correctChars, time) => {
          saveGameResult(time, { wpm, accuracy, time, correctChars, totalChars });
        }}
        onRestart={() => pickRandomArticle(articles)}
      />
    </main>
  );
}

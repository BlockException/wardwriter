import { useEffect, useState } from 'react';
import { loadBestTimes, loadGameHistory, formatDate } from '../utils/gameStats';
import type { GameResult } from '../utils/gameStats';
import styles from './Stats.module.css';

const timeLabels: Record<string, string> = {
  '30': 'Sprint (30s)',
  '60': 'Standard (60s)',
  '120': 'Ausdauer (120s)',
  '600': 'Abschrift (10min)',
};

function modeLabel(time: number): string {
  return timeLabels[String(time)] || `${time} Sekunden`;
}

export default function Stats() {
  const [history, setHistory] = useState<GameResult[]>([]);
  const [bestTimes, setBestTimes] = useState(loadBestTimes());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setHistory(loadGameHistory());
    setBestTimes(loadBestTimes());
    setIsReady(true);
  }, []);

  const resetStats = () => {
    if (window.confirm('Möchtest du wirklich alle Statistiken löschen?')) {
      localStorage.removeItem('wardwriter-wpm-history');
      localStorage.removeItem('wardwriter-best-times');
      window.location.reload();
    }
  };

  const totalGames = history.length;
  const hasData = isReady && totalGames > 0;

  const avgWpm = hasData ? Math.round(history.reduce((sum, r) => sum + r.wpm, 0) / totalGames) : 0;
  const avgAccuracy = hasData ? Math.round(history.reduce((sum, r) => sum + r.accuracy, 0) / totalGames) : 0;
  const totalCorrectChars = history.reduce((sum, r) => sum + (r.correctChars || 0), 0);
  const bestWpm = hasData ? Math.max(...history.map(r => r.wpm)) : 0;
  const bestWpmGame = hasData ? history.find(r => r.wpm === bestWpm) : undefined;
  const bestAccuracy = hasData ? Math.max(...history.map(r => r.accuracy)) : 0;
  const bestAccuracyGame = hasData ? history.find(r => r.accuracy === bestAccuracy) : undefined;

  const recentHistory = [...history].slice(-8).reverse();
  const modeKeys = Object.keys(bestTimes)
    .filter(key => bestTimes[key] && bestTimes[key].wpm > 0)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  return (
    <main>
      <header>
        <h1>Ward<span style={{ color: 'var(--accent)' }}>Writer</span></h1>
        <p>Dein Dashboard</p>
      </header>

      <div className={styles.statsContent}>
        <h2 className={styles.title}>Deine Schreibtrainer-Statistiken</h2>

        {!hasData ? (
          <p className={styles.emptyState}>
            {isReady ? 'Noch keine Spiele gespeichert. Spiele ein paar Runden!' : 'Lade Statistiken…'}
          </p>
        ) : (
          <>
            <div className={styles.topGrid}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Gesamtspiele</span>
                <span className={styles.statValue}>{totalGames}</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Durchschn. WPM</span>
                <span className={styles.statValue}>{avgWpm}</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Durchschn. Genauigkeit</span>
                <span className={styles.statValue}>{avgAccuracy}%</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Richtige Zeichen</span>
                <span className={styles.statValue}>{totalCorrectChars}</span>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              Beste Leistungen
            </h3>
            <div className={styles.bestGrid}>
              {bestWpmGame && (
                <div className={styles.bestCard}>
                  <div className={styles.bestLabel}>Beste WPM</div>
                  <div className={styles.bestValue} style={{ color: 'var(--accent)' }}>{bestWpm}</div>
                  <div className={styles.bestDate}>{formatDate(bestWpmGame.date)}</div>
                  <div className={styles.bestSub} style={{ color: 'var(--success-color)' }}>{bestWpmGame.accuracy}% Genauigkeit</div>
                </div>
              )}
              {bestAccuracyGame && (
                <div className={styles.bestCard}>
                  <div className={styles.bestLabel}>Beste Genauigkeit</div>
                  <div className={styles.bestValue} style={{ color: 'var(--success-color)' }}>{bestAccuracy}%</div>
                  <div className={styles.bestDate}>{formatDate(bestAccuracyGame.date)}</div>
                  <div className={styles.bestSub} style={{ color: 'var(--accent)' }}>{bestAccuracyGame.wpm} WPM</div>
                </div>
              )}
            </div>

            {modeKeys.length > 0 && (
              <>
                <h3 className={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 7.5 19.79"/><polyline points="16.5 4.21 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  Beste Zeiten pro Modus
                </h3>
                <div className={styles.modeList}>
                  {modeKeys.map(key => {
                    const data = bestTimes[key];
                    return (
                      <div key={key} className={styles.modeRow}>
                        <span className={styles.modeName}>{modeLabel(parseInt(key, 10))}</span>
                        <div className={styles.modeStats}>
                          <div className={styles.modeWpm}>{data.wpm} WPM</div>
                          <div className={styles.modeAcc}>{data.accuracy}% Genauigkeit</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              Letzte Spiele
            </h3>
            <div className={styles.recentList}>
              {recentHistory.map((result, idx) => (
                <div key={idx} className={styles.recentRow}>
                  <div>
                    <div className={styles.recentDate}>{formatDate(result.date)}</div>
                    <div className={styles.recentMode}>{modeLabel(result.time)}</div>
                  </div>
                  <div className={styles.recentRight}>
                    <div className={styles.recentWpm}>{result.wpm} WPM</div>
                    <div
                      className={styles.recentAcc}
                      style={{ color: result.accuracy >= 90 ? 'var(--success-color)' : result.accuracy >= 70 ? 'var(--accent)' : 'var(--error-color)' }}
                    >
                      {result.accuracy}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <button className={styles.resetBtn} onClick={resetStats}>
          Statistiken zurücksetzen
        </button>
      </div>
    </main>
  );
}

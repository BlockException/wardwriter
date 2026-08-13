import styles from './ResultsModal.module.css';

interface ResultsModalProps {
  wpm: number;
  accuracy: number;
  totalChars: number;
  onRestart: () => void;
}

export default function ResultsModal({ wpm, accuracy, totalChars, onRestart }: ResultsModalProps) {
  return (
    <section className={styles.resultsModal}>
      <div className={styles.modalContent}>
        <div className={styles.resultStats}>
          <div className={styles.resultStat}>
            <svg className={styles.resultStatIcon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            <div className={styles.resultStatNumber}>{wpm}</div>
            <div className={styles.resultStatName}>WPM</div>
          </div>
          <div className={styles.resultStat}>
            <svg className={styles.resultStatIcon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div className={styles.resultStatNumber}>{accuracy}%</div>
            <div className={styles.resultStatName}>Richtige</div>
          </div>
          <div className={styles.resultStat}>
            <svg className={styles.resultStatIcon} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
            <div className={styles.resultStatNumber}>{totalChars}</div>
            <div className={styles.resultStatName}>Anschläge</div>
          </div>
        </div>
        <button onClick={onRestart} className={styles.primaryBtn}>Nochmal versuchen</button>
      </div>
    </section>
  );
}

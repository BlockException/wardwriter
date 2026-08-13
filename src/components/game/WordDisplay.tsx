import { useEffect, useRef } from 'react';
import styles from './WordDisplay.module.css';

interface WordDisplayProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  wordStatuses?: ('correct' | 'incorrect' | 'pending')[];
  typedWords?: string[];
}

export default function WordDisplay({ words, currentWordIndex, currentInput, wordStatuses = [], typedWords = [] }: WordDisplayProps) {
  const displayRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (displayRef.current && currentWordRef.current) {
      const container = displayRef.current;
      const activeWord = currentWordRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const activeWordRect = activeWord.getBoundingClientRect();
      
      if (activeWordRect.bottom > containerRect.bottom || activeWordRect.top < containerRect.top) {
        container.scrollTop += activeWordRect.top - containerRect.top - (containerRect.height / 2);
      }
    }
  }, [currentWordIndex]);

  // Make sure we scroll to top on reset (when currentWordIndex is 0)
  useEffect(() => {
    if (currentWordIndex === 0 && displayRef.current) {
        displayRef.current.scrollTop = 0;
    }
  }, [currentWordIndex, words]);

  return (
    <div className={styles.wordDisplay} ref={displayRef}>
      {words.map((word, wordIdx) => {
        const isCurrent = wordIdx === currentWordIndex;
        const isCompleted = wordIdx < currentWordIndex;
        let wordStatusClass = '';

        if (isCompleted) {
          // Use stored word status to determine if correct or incorrect
          const status = wordStatuses[wordIdx];
          if (status === 'correct') {
            wordStatusClass = styles.correctWord;
          } else if (status === 'incorrect') {
            wordStatusClass = styles.incorrectWord;
          }
        }

        // What the user actually typed for this word: live input for the
        // current word, the stored value for an already-submitted word.
        const typed = isCurrent ? currentInput : (isCompleted ? (typedWords[wordIdx] ?? '') : '');

        return (
          <div 
            key={wordIdx} 
            ref={isCurrent ? currentWordRef : null}
            className={`${styles.word} ${isCurrent ? styles.currentWord : ''} ${wordStatusClass}`}
          >
            {word.split('').map((char, charIdx) => {
              let charClass = styles.char;
              // Only the specific mistyped character is marked incorrect -
              // untyped trailing characters simply inherit the word's color.
              if (charIdx < typed.length) {
                charClass += ' ' + (char === typed[charIdx] ? styles.correctChar : styles.incorrectChar);
              }
              return <span key={charIdx} className={charClass}>{char}</span>;
            })}
            {typed.length > word.length && (
              typed.slice(word.length).split('').map((char, charIdx) => (
                <span key={`extra-${charIdx}`} className={`${styles.char} ${styles.incorrectChar} ${styles.extraChar}`}>
                  {char}
                </span>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import styles from './GameArea.module.css';
import WordDisplay from './WordDisplay';
import StatCard from '../ui/StatCard';
import ResultsModal from './ResultsModal';
import { useTypingGame } from '../../hooks/useTypingGame';

interface GameAreaProps {
  words: string[];
  initialTime: number;
  onGameEnd?: (wpm: number, accuracy: number, totalChars: number, correctChars: number, time: number) => void;
  onRestart?: () => void;
}

export default function GameArea({ words, initialTime, onGameEnd, onRestart }: GameAreaProps) {
  const { state, setState, startGame, resetGame, initialTimeRef } = useTypingGame(initialTime);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevWordsRef = useRef(words);
  const prevTimeRef = useRef(initialTime);
  const endReportedRef = useRef(false);
  
  const isFinished = !state.isPlaying && state.totalCharsTyped > 0 && (state.timeLeft === 0 || state.currentWordIndex >= words.length);

  // Sync initialTimeRef when prop changes
  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime, initialTimeRef]);

  // Reset game only when initialTime or words *actually* change
  useEffect(() => {
    const timeChanged = prevTimeRef.current !== initialTime;
    const wordsChanged = prevWordsRef.current !== words;
    
    if (timeChanged || wordsChanged) {
      prevTimeRef.current = initialTime;
      prevWordsRef.current = words;
      
      // Only reset if we have actual words to display
      if (words.length > 0) {
        resetGame();
        endReportedRef.current = false;
      }
    }
  }, [initialTime, words, resetGame]);

  useEffect(() => {
    if (isFinished && onGameEnd && !endReportedRef.current) {
      endReportedRef.current = true;
      onGameEnd(state.wpm, state.accuracy, state.totalCharsTyped, state.totalCorrectChars, initialTime);
    }
  }, [isFinished, onGameEnd, state.wpm, state.accuracy, state.totalCharsTyped, state.totalCorrectChars, initialTime]);

  const handleRestart = () => {
    resetGame();
    endReportedRef.current = false;
    onRestart?.();
    inputRef.current?.focus();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Don't process input if there are no words
    if (words.length === 0) return;
    
    if (!state.isPlaying && value.length === 1 && !isFinished) {
      startGame();
    }

    // Handle space - word submission
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const actualWord = words[state.currentWordIndex];
      
      // Safety check: don't go past the end of words
      if (!actualWord) {
        // Still clear the input so the trailing space doesn't get stuck
        setState(prev => ({ ...prev, currentInput: '' }));
        return;
      }
      
      const isCorrectWord = typedWord === actualWord;
      const missingChars = Math.max(0, actualWord.length - typedWord.length);
      const newWordStatuses = [...state.wordStatuses];
      newWordStatuses[state.currentWordIndex] = isCorrectWord ? 'correct' : 'incorrect';
      const newTypedWords = [...state.typedWords];
      newTypedWords[state.currentWordIndex] = typedWord;
      const spaceChars = isCorrectWord ? { correct: 1, total: 1 } : { correct: 0, total: 1 };

      setState(prev => ({
        ...prev,
        currentInput: '',
        currentWordIndex: prev.currentWordIndex + 1,
        totalCorrectChars: prev.totalCorrectChars + spaceChars.correct,
        totalIncorrectChars: prev.totalIncorrectChars + missingChars + (spaceChars.total - spaceChars.correct),
        totalCharsTyped: prev.totalCharsTyped + missingChars + spaceChars.total,
        wordStatuses: newWordStatuses,
        typedWords: newTypedWords,
      }));
      return;
    } else {
      const actualWord = words[state.currentWordIndex];

      // Never allow typing more characters than the target word has -
      // once the word length is reached, further keys are ignored until space.
      if (actualWord && value.length > actualWord.length) {
        return;
      }

      // Regular character input - track each character as typed
      const previousLength = state.currentInput.length;
      const currentLength = value.length;
      
      // If text was added
      if (currentLength > previousLength) {
        if (!actualWord) {
          setState(prev => ({ ...prev, currentInput: value }));
          return;
        }
        
        // New character index (0-based)
        const newCharIndex = currentLength - 1;
        let newCorrect = 0;
        let newIncorrect = 0;
        
        if (value[newCharIndex] === actualWord[newCharIndex]) {
          newCorrect++;
        } else {
          newIncorrect++;
        }
        
        setState(prev => ({
          ...prev,
          currentInput: value,
          totalCorrectChars: prev.totalCorrectChars + newCorrect,
          totalIncorrectChars: prev.totalIncorrectChars + newIncorrect,
          totalCharsTyped: prev.totalCharsTyped + 1
        }));
      } else {
        // Text was removed (backspace) - just update input, don't recount
        setState(prev => ({ ...prev, currentInput: value }));
      }
    }
  };

  // Don't render game UI if we have no words yet
  if (words.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', color: 'var(--text-muted)' }}>
        Lade Wörter...
      </div>
    );
  }

  return (
    <>
      <div className={styles.statsContainer}>
        <StatCard label="Zeit" value={`${state.timeLeft}s`} isMain={true} />
        <StatCard label="WPM" value={state.wpm} isHidden={!isFinished} />
        <StatCard label="Genauigkeit" value={`${state.accuracy}%`} isHidden={!isFinished} />
      </div>

      <WordDisplay 
        words={words} 
        currentWordIndex={state.currentWordIndex} 
        currentInput={state.currentInput}
        wordStatuses={state.wordStatuses}
        typedWords={state.typedWords}
      />

      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          className={styles.wordInput}
          value={state.currentInput}
          onChange={handleInput}
          autoComplete="off"
          spellCheck="false"
          autoFocus
          placeholder="Fange an zu tippen..."
          disabled={isFinished}
        />
        <button className={styles.restartBtn} onClick={handleRestart} title="Neu mischen">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        </button>
      </div>

      {isFinished && (
        <ResultsModal 
          wpm={state.wpm} 
          accuracy={state.accuracy} 
          totalChars={state.totalCharsTyped} 
          onRestart={handleRestart} 
        />
      )}
    </>
  );
}

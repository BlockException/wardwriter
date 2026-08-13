import { useState, useEffect, useCallback, useRef } from 'react';

export type GameMode = '30' | '60' | '120' | 'transcription';
export type WordStatus = 'pending' | 'correct' | 'incorrect';

interface GameState {
  isPlaying: boolean;
  timeLeft: number;
  wpm: number;
  accuracy: number;
  totalCorrectChars: number;
  totalIncorrectChars: number;
  totalCharsTyped: number;
  currentInput: string;
  currentWordIndex: number;
  wordStatuses: WordStatus[]; // Track which words are correct/incorrect
  typedWords: string[]; // What the user actually typed for each completed word
}

export function useTypingGame(initialTime: number) {
  const [state, setState] = useState<GameState>({
    isPlaying: false,
    timeLeft: initialTime,
    wpm: 0,
    accuracy: 100,
    totalCorrectChars: 0,
    totalIncorrectChars: 0,
    totalCharsTyped: 0,
    currentInput: '',
    currentWordIndex: 0,
    wordStatuses: [],
    typedWords: [],
  });

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const initialTimeRef = useRef(initialTime);

  // Keep ref in sync
  useEffect(() => {
    initialTimeRef.current = initialTime;
  }, [initialTime]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    // Use functional setState to avoid stale closure on state.isPlaying
    setState(prev => {
      if (prev.isPlaying) return prev; // already playing, bail out
      return { ...prev, isPlaying: true };
    });

    startTimeRef.current = Date.now();

    timerRef.current = window.setInterval(() => {
      setState(s => {
        if (s.timeLeft <= 1) {
          // End game inline – clear timer directly via ref
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return { ...s, timeLeft: 0, isPlaying: false };
        }
        
        // Calculate WPM and Accuracy
        const timeElapsedMin = (initialTimeRef.current - s.timeLeft + 1) / 60;
        const wpm = timeElapsedMin > 0 ? Math.round((s.totalCorrectChars / 5) / timeElapsedMin) : 0;
        const accuracy = s.totalCharsTyped > 0 
          ? Math.round((s.totalCorrectChars / s.totalCharsTyped) * 100) 
          : 100;

        return {
          ...s,
          timeLeft: s.timeLeft - 1,
          wpm,
          accuracy
        };
      });
    }, 1000);
  }, []);  // No dependencies – uses refs and functional setState

  const endGame = useCallback(() => {
    clearTimer();
    setState(s => ({ ...s, isPlaying: false }));
  }, [clearTimer]);

  const resetGame = useCallback(() => {
    clearTimer();
    startTimeRef.current = null;
    setState({
      isPlaying: false,
      timeLeft: initialTimeRef.current,
      wpm: 0,
      accuracy: 100,
      totalCorrectChars: 0,
      totalIncorrectChars: 0,
      totalCharsTyped: 0,
      currentInput: '',
      currentWordIndex: 0,
      wordStatuses: [],
      typedWords: [],
    });
  }, [clearTimer]); // Stable – doesn't depend on initialTime directly

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    state,
    setState,
    startGame,
    endGame,
    resetGame,
    initialTimeRef
  };
}

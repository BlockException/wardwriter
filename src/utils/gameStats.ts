export interface GameResult {
  wpm: number;
  accuracy: number;
  time: number;
  date: string;
  correctChars: number;
  totalChars: number;
}

export type BestTimeRecord = {
  wpm: number;
  accuracy: number;
  date?: string;
};

export type BestTimes = Record<string, BestTimeRecord>;

const HISTORY_KEY = 'wardwriter-wpm-history';
const BEST_TIMES_KEY = 'wardwriter-best-times';

const defaultBestTimes: BestTimes = {
  '30': { wpm: 0, accuracy: 0 },
  '60': { wpm: 0, accuracy: 0 },
  '120': { wpm: 0, accuracy: 0 }
};

export function formatDate(isoString: string): string {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadGameHistory(): GameResult[] {
  const raw = safeParse<unknown>(localStorage.getItem(HISTORY_KEY), []);
  if (!Array.isArray(raw)) return [];

  return raw
    .map(item => {
      if (typeof item === 'number') {
        return {
          wpm: item,
          accuracy: 0,
          time: 0,
          date: '',
          correctChars: 0,
          totalChars: 0
        };
      }

      if (item && typeof item === 'object' && 'wpm' in item && typeof (item as any).wpm === 'number') {
        return {
          wpm: (item as any).wpm,
          accuracy: typeof (item as any).accuracy === 'number' ? (item as any).accuracy : 0,
          time: typeof (item as any).time === 'number' ? (item as any).time : 0,
          date: typeof (item as any).date === 'string' ? (item as any).date : '',
          correctChars: typeof (item as any).correctChars === 'number' ? (item as any).correctChars : 0,
          totalChars: typeof (item as any).totalChars === 'number' ? (item as any).totalChars : 0
        };
      }

      return null;
    })
    .filter((item): item is GameResult => item !== null);
}

export function loadBestTimes(): BestTimes {
  const raw = safeParse<unknown>(localStorage.getItem(BEST_TIMES_KEY), defaultBestTimes);
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return defaultBestTimes;
  }

  const result: BestTimes = { ...defaultBestTimes };
  Object.entries(raw).forEach(([key, value]) => {
    if (value && typeof value === 'object' && 'wpm' in value && typeof (value as any).wpm === 'number') {
      result[key] = {
        wpm: (value as any).wpm,
        accuracy: typeof (value as any).accuracy === 'number' ? (value as any).accuracy : 0,
        date: typeof (value as any).date === 'string' ? (value as any).date : undefined
      };
    }
  });

  return result;
}

export function saveGameResult(time: number, result: Omit<GameResult, 'date'>) {
  const history = loadGameHistory();
  const newEntry: GameResult = {
    ...result,
    date: new Date().toISOString()
  };

  const nextHistory = [...history, newEntry].slice(-100);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));

  const bestTimes = loadBestTimes();
  const key = time.toString();
  const existing = bestTimes[key];

  if (!existing || result.wpm > existing.wpm) {
    bestTimes[key] = {
      wpm: result.wpm,
      accuracy: result.accuracy,
      date: newEntry.date
    };
    localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(bestTimes));
  }
}

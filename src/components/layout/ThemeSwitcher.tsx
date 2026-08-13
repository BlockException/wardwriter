import { useState, useEffect, useRef } from 'react';
import styles from './ThemeSwitcher.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const THEMES = [
  { id: 'midnight', name: 'Ozean' },
  { id: 'summer', name: 'Sonne' },
  { id: 'rubin', name: 'Rubin' },
  { id: 'aurora', name: 'Aurora' },
  { id: 'augsburg', name: 'Augsburg' },
  { id: 'winter', name: 'Winter', locked: true }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedTheme, setSavedTheme] = useLocalStorage('wardwriter-theme', 'midnight');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Migration for old themes
    let currentTheme = savedTheme;
    if (currentTheme === 'cyber' || currentTheme === 'coding') {
      currentTheme = 'midnight';
      setSavedTheme('midnight');
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [savedTheme, setSavedTheme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.themeDropdown} ref={dropdownRef}>
      <button 
        className={styles.iconBtn} 
        title="Design ändern" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      </button>
      <div className={`${styles.themeMenu} ${isOpen ? styles.active : ''}`}>
        {THEMES.map(theme => (
          <button
            key={theme.id}
            data-theme={theme.id}
            className={`${styles.themeOption} ${savedTheme === theme.id ? styles.active : ''} ${theme.locked ? styles.locked : ''}`}
            onClick={() => {
              if (!theme.locked) {
                setSavedTheme(theme.id);
                setIsOpen(false);
              }
            }}
          >
            {theme.locked && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

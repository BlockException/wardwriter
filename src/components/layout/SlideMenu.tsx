import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SlideMenu.module.css';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideMenu({ isOpen, onClose }: SlideMenuProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div 
        className={`${styles.menuOverlay} ${isOpen ? styles.active : ''}`} 
        onClick={onClose}
      />
      <nav className={`${styles.slideMenu} ${isOpen ? styles.active : ''}`}>
        
        <div className={styles.menuSection}>
          <Link 
            to="/" 
            className={`${styles.menuItem} ${isActive('/') && !location.search ? styles.activePage : ''}`}
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Startseite
          </Link>
        </div>

        <div className={styles.menuSection}>
          <button 
            className={`${styles.menuItem} ${styles.menuCategory} ${expandedMenus.wordmodes ? styles.expanded : ''}`}
            onClick={() => toggleMenu('wordmodes')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Wörter-Modi
          </button>
          <div className={`${styles.submenu} ${expandedMenus.wordmodes ? styles.expanded : ''}`}>
            {[30, 60, 120].map(time => (
              <Link 
                key={time}
                to={`/?mode=${time}`}
                className={`${styles.menuItem} ${location.search === `?mode=${time}` || (time === 60 && isActive('/') && !location.search) ? styles.selected : ''}`}
                onClick={onClose}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {time === 30 ? 'Sprint – 30 Sekunden' : time === 60 ? 'Standard – 60 Sekunden' : 'Ausdauer – 120 Sekunden'}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.menuSection}>
          <Link 
            to="/abschriften" 
            className={`${styles.menuItem} ${isActive('/abschriften') ? styles.activePage : ''}`}
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            10 Minuten Abschrift
          </Link>
        </div>

        <div className={styles.menuSection}>
          <button 
            className={`${styles.menuItem} ${styles.menuCategory} ${expandedMenus.stats ? styles.expanded : ''}`}
            onClick={() => toggleMenu('stats')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            Statistik
          </button>
          <div className={`${styles.submenu} ${expandedMenus.stats ? styles.expanded : ''}`}>
            <Link to="/stats" className={styles.menuItem} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Dashboard
            </Link>
          </div>
        </div>

        <div className={styles.menuSection}>
          <button 
            className={`${styles.menuItem} ${styles.menuCategory} ${expandedMenus.dev ? styles.expanded : ''}`}
            onClick={() => toggleMenu('dev')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Entwicklung
          </button>
          <div className={`${styles.submenu} ${expandedMenus.dev ? styles.expanded : ''}`}>
            <Link to="/changelog" className={styles.menuItem} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
              Changelog
            </Link>
            <Link to="/team" className={styles.menuItem} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Team
            </Link>
          </div>
        </div>

        <div className={styles.menuSection}>
          <button 
            className={`${styles.menuItem} ${styles.menuCategory} ${expandedMenus.legal ? styles.expanded : ''}`}
            onClick={() => toggleMenu('legal')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Rechtliches
          </button>
          <div className={`${styles.submenu} ${expandedMenus.legal ? styles.expanded : ''}`}>
            <Link to="/legal/impressum" className={styles.menuItem} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Impressum
            </Link>
            <Link to="/legal/datenschutz" className={styles.menuItem} onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Datenschutz
            </Link>
          </div>
        </div>

      </nav>
    </>
  );
}

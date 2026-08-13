import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.webp" alt="WardWriter Logo" />
        <span className={styles.logoText}>Ward<span style={{ color: 'var(--accent)' }}>Writer</span></span>
      </Link>

      <div className={styles.navControls}>
        <ThemeSwitcher />
        <button 
          className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`} 
          onClick={onMenuToggle}
          aria-label="Menü öffnen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

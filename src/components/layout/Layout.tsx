import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SlideMenu from './SlideMenu';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
      />
      
      <SlideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <div className="container">
        <Outlet />
      </div>

      <footer>
        <div className="footer-content">
          <p>&copy; 2026 Fabian Haugg</p>
        </div>
      </footer>
    </>
  );
}

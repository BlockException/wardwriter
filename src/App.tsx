import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Lazy loading other pages to keep initial bundle tiny
const Abschriften = lazy(() => import('./pages/Abschriften'));
const Stats = lazy(() => import('./pages/Stats'));
const Changelog = lazy(() => import('./pages/Changelog'));
const Team = lazy(() => import('./pages/Team'));
const Impressum = lazy(() => import('./pages/legal/Impressum'));
const Datenschutz = lazy(() => import('./pages/legal/Datenschutz'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>Lade...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="abschriften" element={<Abschriften />} />
            <Route path="stats" element={<Stats />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="team" element={<Team />} />
            <Route path="legal/impressum" element={<Impressum />} />
            <Route path="legal/datenschutz" element={<Datenschutz />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

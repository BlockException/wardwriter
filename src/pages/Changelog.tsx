import { Link } from 'react-router-dom';

export default function Changelog() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Zurück zum Schreibtrainer
        </Link>

        <h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
          Changelog
        </h1>
        <p className="legal-subtitle">Was sich bei WardWriter getan hat</p>
        
        <div className="changelog-entry">
          <div className="changelog-date">28. Juli 2026</div>
          <div className="changelog-version">v3.0 – Dashboard, Tipp-Logik und Rechtstexte</div>
          <ul className="changelog-list">
            <li>Dashboard komplett überarbeitet: Gesamtspiele, Durchschnittswerte, Beste Leistungen, Beste Zeiten pro Modus und Letzte Spiele im Überblick.</li>
            <li>Tipp-Logik korrigiert: Bei abgeschlossenen Wörtern wird nun nur noch das tatsächlich falsch getippte Zeichen rot markiert, statt das ganze Wort.</li>
            <li>Es ist nicht mehr möglich, über die Länge des erwarteten Wortes hinauszuschreiben.</li>
            <li>"Neu mischen"-Button gefixt: Wörter werden beim Klick jetzt tatsächlich zufällig neu gemischt; im Abschriften-Modus wird ein neuer, zufälliger Artikel geladen.</li>
            <li>Theme-Namen im Auswahlmenü erscheinen nun jeweils in der eigenen Themefarbe.</li>
            <li>"Writer" im Logo-Schriftzug wird in der aktuell aktiven Themefarbe dargestellt.</li>
            <li>Impressum und Datenschutzerklärung überarbeitet: nicht-gewerbliche Angaben nach aktuellem DDG, ohne unnötige Abschnitte für Unternehmer.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">23. Juni 2026</div>
          <div className="changelog-version">v2.9 – Statistik-Seite</div>
          <ul className="changelog-list">
            <li>Statistiken nun auf separater Seite (/stats) verfügbar.</li>
            <li>Statistik-Menüpunkt auf allen Seiten funktioniert nun korrekt und leitet auf /stats weiter.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">22. Juni 2026</div>
          <div className="changelog-version">v2.8 – Performance und Ladezeiten Update</div>
          <ul className="changelog-list">
            <li>Verbesserung der Ladezeiten durch optimiertes Skript-Laden und angepasste Bild-Attribute.</li>
            <li>Deutliche Leistungssteigerung im Abschriften-Modus durch effizienteres Rendering.</li>
            <li>Fehlerbehebungen.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">22. Juni 2026</div>
          <div className="changelog-version">v2.7 – Augsburg Theme!</div>
          <ul className="changelog-list">
            <li>Neues Augsburg Theme hinzugefügt.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">22. Juni 2026</div>
          <div className="changelog-version">v2.6 – Aurora Theme!</div>
          <ul className="changelog-list">
            <li>Neues Aurora Theme hinzugefügt.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">19. Juni 2026</div>
          <div className="changelog-version">v2.4 – Rubin Theme und Updates</div>
          <ul className="changelog-list">
            <li>Neues Rubin-Theme hinzugefügt.</li>
            <li>Statistik-Sektion vereinfacht: Nur noch Dashboard verfügbar.</li>
            <li>Datenschutzerklärung aktualisiert.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">19. Juni 2026</div>
          <div className="changelog-version">v2.3 – Finales Update</div>
          <ul className="changelog-list">
            <li>Abschriften-Modus komplett überarbeitet.</li>
            <li>Fehlerbehebungen.</li>
            <li>Erweiterte Wortliste mit mehr als 1000 neuen Wörtern.</li>
            <li>Neue Navigation mit Wörter-Modi Untermenü.</li>
            <li>Vereinfachtes Ergebnis-Modal.</li>
            <li>Clean URLs ohne .html-Endungen.</li>
            <li>Impressum/Datenschutz in legal-Verzeichnis verschoben.</li>
            <li>Mobile Ansicht optimiert für alle Geräte.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">18. Juni 2026</div>
          <div className="changelog-version">v2.2 – Abschriften-Modus</div>
          <ul className="changelog-list">
            <li>Abschriften-Modus hinzugefügt.</li>
          </ul>
        </div>
        <div className="changelog-entry">
          <div className="changelog-date">18. Juni 2026</div>
          <div className="changelog-version">v2.1 – Design und UX Verbesserungen</div>
          <ul className="changelog-list">
            <li>Gesperrtes Winter-Theme hinzugefügt (in einem kommenden Update verfügbar).</li>
            <li>Mobile Optimierung für alle Seiten verbessert.</li>
            <li>Umbenennung zu Offizieller Schreibtrainer.</li>
            <li>Über 1000 neue Wörter in den Wortschatz aufgenommen.</li>
            <li>Wortalgorithmus optimiert.</li>
            <li>Sonderzeichen und Umlaute (ä, ö, ü, ß) weitgehend aus dem Trainings-Wortschatz entfernt.</li>
          </ul>
        </div>

        <div className="changelog-entry">
          <div className="changelog-date">18. Juni 2026</div>
          <div className="changelog-version">v2.0 – Design Upgrade</div>
          <ul className="changelog-list">
            <li>Komplettes Redesign mit Dark-Glassmorphism-Effekten.</li>
            <li>Neues, exklusives Tastatur-Logo implementiert.</li>
            <li>Ergänzung eines Hamburger-Menüs zur einfacheren Navigation.</li>
            <li>Neue Kategorien Entwicklung mit Changelog und Team-Seite.</li>
            <li>Verschiedene Timer-Modi (30s, 60s, 120s) hinzugefügt.</li>
            <li>Rechtliche Seiten vollständig überarbeitet und optisch angepasst.</li>
          </ul>
        </div>

        <div className="changelog-entry">
          <div className="changelog-date">Mai 2026</div>
          <div className="changelog-version">v1.0 – Initial Release</div>
          <ul className="changelog-list">
            <li>Veröffentlichung des Schreibtrainers.</li>
            <li>Grundlegende Tipptechnik mit Wörtern implementiert.</li>
            <li>Einfacher 60-Sekunden-Timer.</li>
            <li>Ergebnis-Anzeige mit WPM (Words per Minute) und Genauigkeit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

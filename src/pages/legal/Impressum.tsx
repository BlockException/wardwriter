import { Link } from 'react-router-dom';

export default function Impressum() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Zurück zum Schreibtrainer
        </Link>

        <h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Impressum
        </h1>

        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Fabian Haugg<br/>
            Bahnhofsstraße 7<br/>
            86368 Gersthofen<br/>
            Deutschland
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            E-Mail: mail@wardwriter.de
          </p>
        </section>

        <section>
          <h2>Haftung &amp; Urheberrecht</h2>
          <p>
            WardWriter ist ein Programm, das lokal auf Ihrem Windows- oder Linux-Gerät installiert und ausgeführt wird; es wird von uns nicht auf einem eigenen Server betrieben oder gehostet. Als Anbieter sind wir gemäß § 7 Abs. 1 DDG für die von uns bereitgestellten Inhalte des Programms nach den allgemeinen Gesetzen verantwortlich.<br/><br/>
            Die durch uns erstellten Inhalte und das Programm selbst unterliegen dem deutschen Urheberrecht.
          </p>
        </section>

        <p className="legal-date">Stand: 13.08.2026</p>
      </div>
    </div>
  );
}

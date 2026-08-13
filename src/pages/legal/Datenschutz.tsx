import { Link } from 'react-router-dom';

export default function Datenschutz() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Zurück zum Schreibtrainer
        </Link>

        <h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Datenschutzerklärung
        </h1>

        <section>
          <h2>1. Allgemeines</h2>
          <p>
            WardWriter ist ein Programm, das lokal auf Ihrem Windows- oder Linux-Gerät installiert wird und dort ausgeführt wird. Es gibt keine Server, auf denen die Anwendung läuft oder gehostet wird, und die Nutzung des Programms erfordert keine Internetverbindung. Es findet daher zu keinem Zeitpunkt eine Übermittlung Ihrer Daten an uns oder Dritte statt.
          </p>
          <p>
            Verantwortlich im Sinne der DSGVO wäre, sollte doch personenbezogene Daten verarbeitet werden (z.B. bei einer freiwilligen Kontaktaufnahme, siehe unten):<br/><br/>
            Fabian Haugg<br/>
            Bahnhofsstraße 7<br/>
            86368 Gersthofen<br/><br/>
            E-Mail: mail@wardwriter.de
          </p>
        </section>

        <section>
          <h2>2. Datenverarbeitung durch das Programm</h2>

          <h3>Keine Datenübertragung</h3>
          <p>
            WardWriter baut zu keinem Zeitpunkt eine Verbindung zu einem Server auf. Es werden keine Nutzungsdaten, Statistiken oder sonstige personenbezogene Daten erhoben, gespeichert oder an uns übermittelt. Es existieren weder Server-Logs noch ein Hosting-Anbieter, der im Rahmen der Programmnutzung Daten von Ihnen verarbeitet.
          </p>

          <h3>Cookies und Tracking</h3>
          <p>
            Das Programm verwendet <strong>keine</strong> Cookies, keine Analyse-Tools und keine Tracking-Software.
          </p>

          <h3>Lokale Speicherung auf Ihrem Gerät</h3>
          <p>
            WardWriter speichert Ihre Design-Einstellung (Theme) und Ihre Schreibtrainer-Statistiken (z.B. beste Zeiten, WPM-Historie) ausschließlich lokal auf Ihrem eigenen Windows- oder Linux-Gerät. Dabei werden keine personenbezogenen Daten verarbeitet, und diese Daten verlassen zu keinem Zeitpunkt Ihr Gerät.
          </p>
          <p>
            Diese Daten verbleiben so lange gespeichert, bis Sie sie selbst löschen – etwa über die Reset-Funktion auf der Statistik-Seite innerhalb des Programms oder durch Deinstallation der Anwendung.
          </p>

          <h3>Schriftarten</h3>
          <p>
            Die verwendeten Schriftarten "Inter" und "JetBrains Mono" sind fest in das Programm eingebettet. Es findet zu keinem Zeitpunkt eine Verbindung zu Servern von Google oder einem anderen externen Anbieter statt.
          </p>

          <h3>Kontaktaufnahme per E-Mail</h3>
          <p>
            Sollten Sie uns freiwillig per E-Mail kontaktieren, wird Ihre E-Mail inklusive aller darin enthaltenen personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens gespeichert (Art. 6 Abs. 1 lit. f DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald der Zweck entfällt.
          </p>
        </section>

        <section>
          <h2>3. Ihre Rechte</h2>
          <p>
            Soweit im Einzelfall personenbezogene Daten verarbeitet werden (etwa bei einer E-Mail-Kontaktaufnahme), haben Sie jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten, deren Herkunft und den Zweck der Verarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu können Sie sich jederzeit unter der oben angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei einer zuständigen Aufsichtsbehörde zu.
          </p>
        </section>

        <p className="legal-date">Stand: 13.08.2026</p>
      </div>
    </div>
  );
}

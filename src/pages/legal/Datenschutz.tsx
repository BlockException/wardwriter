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
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br/><br/>
            Fabian Haugg<br/>
            Bahnhofsstraße 7<br/>
            86368 Gersthofen<br/><br/>
            E-Mail: mail@wardwriter.de
          </p>
        </section>

        <section>
          <h2>2. Datenerfassung auf dieser Website</h2>

          <h3>Server-Log-Dateien &amp; Hosting</h3>
          <p>
            Diese Website wird gehostet bei aitch.systems. Der Provider unserer Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (z.B. IP-Adresse, Browsertyp, Uhrzeit der Anfrage). Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der sicheren Bereitstellung unserer Website.
          </p>

          <h3>Kontaktaufnahme per E-Mail</h3>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, wird Ihre E-Mail inklusive aller darin enthaltenen personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens gespeichert (Art. 6 Abs. 1 lit. f DSGVO). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald der Zweck entfällt.
          </p>

          <h3>Cookies und Tracking</h3>
          <p>
            Wir setzen auf dieser Website <strong>keine</strong> Cookies, keine Analyse-Tools und keine Tracking-Software ein.
          </p>

          <h3>LocalStorage</h3>
          <p>
            Wir verwenden den LocalStorage Ihres Browsers, um Ihre Design-Einstellung (Theme) und Ihre Schreibtrainer-Statistiken (z.B. beste Zeiten, WPM-Historie) zu speichern. Dabei werden keine personenbezogenen Daten gespeichert. Die Speicherung erfolgt ausschließlich auf Ihrem Gerät und wird nicht an uns oder Dritte übermittelt.
          </p>

          <h3>Schriftarten (Webfonts)</h3>
          <p>
            Wir nutzen die Schriftarten "Inter" und "JetBrains Mono" zur Darstellung von Text auf unserer Website. Diese Schriftarten sind lokal auf unserem eigenen Server gespeichert und werden direkt von uns ausgeliefert. Es findet zu keinem Zeitpunkt eine Verbindung zu Servern von Google oder einem anderen externen Anbieter statt.
          </p>
        </section>

        <section>
          <h2>3. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu können Sie sich jederzeit unter der oben angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei einer zuständigen Aufsichtsbehörde zu.
          </p>
        </section>

        <p className="legal-date">Stand: 28.07.2026</p>
      </div>
    </div>
  );
}

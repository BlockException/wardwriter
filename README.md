# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Desktop-App (Windows .exe via Tauri)

WardWriter kann zusätzlich zur Web-App als natives Desktop-Programm (Windows `.exe`/`.msi`, optional macOS/Linux) gebaut werden. Als Frontend wird dabei der ganz normale `dist`-Ordner aus `npm run build` wiederverwendet – es gibt keinen separaten Code für die Desktop-Version. Die gesamte Tauri-Konfiguration liegt im Ordner `src-tauri/`.

### Voraussetzungen

- [Rust](https://www.rust-lang.org/tools/install) (stable Toolchain, `rustc`/`cargo`)
- Auf Windows: die [Microsoft C++ Build Tools](https://tauri.app/start/prerequisites/) (Bestandteil der Tauri-Voraussetzungen) und WebView2 (ist auf aktuellen Windows-Versionen bereits vorinstalliert)
- Node.js (siehe `package.json`)

### Lokal eine .exe bauen

```bash
npm install
npm run tauri:build
```

Der Befehl baut zunächst automatisch das Web-Frontend (`npm run build`) und packt es anschließend mit Tauri zu einer nativen Anwendung. Die fertigen Installer liegen danach unter:

```
src-tauri/target/release/bundle/nsis/*.exe   # NSIS-Installer
src-tauri/target/release/bundle/msi/*.msi    # MSI-Installer
```

Zum Testen ohne vollständigen Build (mit Hot-Reload) kann stattdessen `npm run tauri:dev` verwendet werden.

### Automatischer Release über GitHub Actions

Der Workflow [`.github/workflows/release.yml`](.github/workflows/release.yml) baut die Desktop-App automatisch, sobald ein Versions-Tag (z.B. `v1.0.0`) gepusht wird:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Der Workflow führt dabei `npm install`, `npm run build` und anschließend `tauri build` aus und hängt die entstandenen Installer (`.exe`/`.msi`) als Artefakte an ein (als Entwurf angelegtes) GitHub Release an. Der Workflow ist als Matrix-Build vorbereitet, sodass bei Bedarf mit wenig Aufwand auch macOS (`.dmg`) und Linux (`.AppImage`) mitgebaut werden können – dazu einfach die entsprechenden, aktuell auskommentierten Matrix-Einträge in der Workflow-Datei aktivieren.

### App-Icon

Das App-Icon wird aus `public/logo.webp` abgeleitet. Um es nach einer Änderung des Logos neu zu erzeugen:

```bash
node -e "require('sharp')('public/logo.webp').png().toFile('src-tauri/app-icon-source.png')"
npx tauri icon src-tauri/app-icon-source.png -o src-tauri/icons
```

## Lizenz

Alle Rechte vorbehalten. Diese Software ist proprietär – Kopieren, Verändern,
Weiterverbreiten oder eine anderweitige Nutzung ist ohne ausdrückliche
schriftliche Genehmigung nicht gestattet. Details siehe [LICENSE](LICENSE).


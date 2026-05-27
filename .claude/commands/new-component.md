# New Component Skill — Atom · Molecule · Organism

Erstellt eine neue React-Native-Komponente nach Atomic Design **inklusive Storybook Story** und verifiziert sie im Storybook-Server.

## Aufruf

```
/new-component <Ebene> <KomponentenName> [Beschreibung]
```

Beispiele:
```
/new-component atom IconButton  Ein Button mit Icon links neben dem Label
/new-component molecule NutritionLabel  Zeigt Kalorien + Makros kompakt in einer Zeile
/new-component organism MealPlanCard  Wochenkarte mit Mahlzeiten-Übersicht
```

---

## Schritt 1 — Ebene & Pfade bestimmen

| Ebene | Komponenten-Pfad | Story-Pfad | Story-Title-Prefix |
|---|---|---|---|
| `atom` | `packages/shared-components/src/atoms/<Name>.tsx` | `packages/shared-components/stories/atoms/<Name>.stories.tsx` | `Atoms/` |
| `molecule` | `packages/shared-components/src/molecules/<Name>.tsx` | `packages/shared-components/stories/molecules/<Name>.stories.tsx` | `Molecules/` |
| `organism` | `packages/shared-components/src/organisms/<Name>.tsx` | `packages/shared-components/stories/organisms/<Name>.stories.tsx` | `Organisms/` |

kineticTheme liegt unter: `../kineticTheme` (relativ zu atoms/molecules/organisms)

---

## Schritt 2 — Komponente implementieren

**Pflichtregeln (IMMER einhalten):**
- Import: `import { kineticTheme } from '../kineticTheme';`
- Alle Farben, Abstände, Radien, Typografie **ausschließlich** aus `kineticTheme` — keine hardcodierten Werte
- `StyleSheet.create({})` für alle Styles
- `export interface <Name>Props { ... }` direkt über der Funktion
- `export function <Name>(...) { ... }` — named export, kein default
- React Native only: kein `div`, kein `className`, kein CSS

**Atoms:** einfache primitive Komponenten, keine weiteren Komponenten aus shared-components importieren  
**Molecules:** dürfen Atoms importieren (z.B. `Badge`, `Button`, `ProgressBar`)  
**Organisms:** dürfen Atoms + Molecules importieren, können aus `@workout/shared-types` Typen verwenden

---

## Schritt 3 — Story schreiben

Story-Template:

```tsx
import React from 'react';
import { View } from 'react-native';                    // nur wenn Decorator nötig
import { <Name> } from '../../src/<ebene>/<Name>';      // korrekter relativer Pfad!

const meta = {
  title: '<Prefix><Name>',                              // z.B. 'Atoms/IconButton'
  component: <Name>,
  args: { /* sinnvolle Standardwerte für alle required Props */ },
  decorators: [
    // NUR wenn die Komponente einen fixen Container braucht:
    (Story: React.ComponentType) => (
      <View style={{ width: 340, padding: 16 }}>
        <Story />
      </View>
    )
  ],
  parameters: {
    layout: 'centered',                                 // 'fullscreen' für Listen
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#141408' }]
    }
  }
};

export default meta;

export const Default = {};
export const <Variante2> = { args: { ... } };
export const <Variante3> = { args: { ... } };
// Mindestens 3 Stories insgesamt: Default + 2 Varianten
```

**Story-Regeln:**
- Importpfad immer `../../src/<atoms|molecules|organisms>/<Name>` — nicht `from '../../src'`
- Mindestens 1 Story pro relevantem Prop-Zustand (z.B. `disabled`, `selected`, `error`, `empty`)
- Keine Logik in Stories — nur Props übergeben
- Dunkler Hintergrund immer als Default

---

## Schritt 4 — index.ts aktualisieren

Datei: `packages/shared-components/src/index.ts`

Neue Zeilen in den passenden Abschnitt einfügen:
```ts
export { <Name> } from './<ebene>/<Name>';
export type { <Name>Props } from './<ebene>/<Name>';
```

---

## Schritt 5 — Type-Check

```bash
cd packages/shared-components && npx tsc --noEmit
```

Oder vom Root:
```bash
npm run check-types
```

Bei Fehlern: lesen → Ursache verstehen → fix → erneut prüfen. Erst bei **0 Fehlern** weitermachen.

---

## Schritt 6 — Storybook starten und prüfen

```bash
cd packages/shared-components
npm run storybook
```

Storybook öffnet sich unter **http://localhost:6006**.

Manuell prüfen:
- [ ] Komponente erscheint in der Sidebar unter dem richtigen Titel (`Atoms/` · `Molecules/` · `Organisms/`)
- [ ] Alle exportierten Stories werden angezeigt
- [ ] Controls-Panel zeigt alle Props an und reagiert auf Änderungen
- [ ] Dark-Background ist voreingestellt
- [ ] Keine Konsolen-Fehler im Browser

---

## Fertig-Definition

✅ Komponente implementiert und exportiert  
✅ Story mit ≥ 3 Varianten existiert  
✅ `check-types` = 0 Fehler  
✅ Story im Storybook sichtbar und interaktiv  

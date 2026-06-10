---
name: gen-stories
description: Scannt alle Komponenten in shared-components und generiert für jede Komponente ohne Story automatisch eine passende .stories.tsx. Optional mit "atoms", "molecules" oder "organisms" einschränken.
---

# Gen-Stories — Fehlende Storybook Stories generieren

Scannt alle Komponenten in `shared-components` und generiert für jede Komponente ohne Story automatisch eine passende `.stories.tsx`.

## Aufruf

```
gen-stories
```

Optional: nur eine bestimmte Ebene scannen:
```
gen-stories atoms
gen-stories molecules
gen-stories organisms
```

---

## Schritt 1 — Scan: Welche Komponenten haben noch keine Story?

Für jede Ebene die Dateien vergleichen:

| Ebene | Komponenten-Ordner | Story-Ordner |
|---|---|---|
| Atoms | `packages/shared-components/src/atoms/` | `packages/shared-components/stories/atoms/` |
| Molecules | `packages/shared-components/src/molecules/` | `packages/shared-components/stories/molecules/` |
| Organisms | `packages/shared-components/src/organisms/` | `packages/shared-components/stories/organisms/` |

Ignorieren: `index.ts`, `kineticTheme.ts`

Ergebnis: Liste aller `.tsx`-Dateien ohne zugehörige `.stories.tsx`.

---

## Schritt 2 — Für jede fehlende Story

### 2a. Props-Interface lesen
Die Komponenten-Datei lesen und `export interface <Name>Props` analysieren:
- Welche Props sind required?
- Welche Props sind optional und steuern visuelle Varianten?
- Welche Props nehmen Enums / Union-Types an? → je ein Story pro Wert

### 2b. Story schreiben

**Importpfad-Schema** (immer relativ von `stories/<ebene>/` zu `src/<ebene>/`):
```ts
import { <Name> } from '../../src/atoms/<Name>';       // für Atoms
import { <Name> } from '../../src/molecules/<Name>';   // für Molecules
import { <Name> } from '../../src/organisms/<Name>';   // für Organisms
```

**Niemals** `from '../../src'` oder `from '../src'` verwenden — immer direkter Pfad zur Datei!

**Story-Template:**
```tsx
import React from 'react';
import { View } from 'react-native';
import { <Name> } from '../../src/<ebene>/<Name>';

const meta = {
  title: '<Atoms|Molecules|Organisms>/<Name>',
  component: <Name>,
  args: { /* sinnvolle Defaults für alle required Props */ },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 340, padding: 16 }}>
        <Story />
      </View>
    )
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#141408' }] }
  }
};

export default meta;

export const Default = {};
// Mindestens 2 weitere Varianten
```

**Varianten-Logik:**
- Jeder Boolean-Prop → eine Story mit `true` und eine mit `false`
- Union-Type-Prop (z.B. `variant: 'primary' | 'secondary' | 'danger'`) → je eine Story
- Leerer Zustand (`items: []`) → immer eine `Empty`-Story
- Langer Text / viele Items → eine `Long`-Story

---

## Schritt 3 — Type-Check

Nach JEDER generierten Story:
```bash
npm run check-types
```

Bei Fehlern sofort fixen (falsche Prop-Namen, fehlende required Props, falscher Importpfad).

---

## Schritt 4 — Storybook starten

```bash
cd packages/shared-components
npm run storybook
```

Öffnet sich unter **http://localhost:6006**.

Für jede neue Story prüfen:
- [ ] Erscheint in der Sidebar (`Atoms/` · `Molecules/` · `Organisms/`)
- [ ] Default-Story rendert ohne Fehler
- [ ] Alle Varianten sichtbar und korrekt dargestellt
- [ ] Dark-Background voreingestellt
- [ ] Controls-Panel zeigt alle Props an

---

## Regeln

- Dunkler Hintergrund (`#141408`) immer als Default
- Mindestens `Default` + 2 Varianten
- Kein State, keine Hooks in Stories — nur Props
- `layout: 'fullscreen'` nur bei Vollbild-Organismen (Listen, Screens)
- `layout: 'centered'` für alles andere
- Decorator mit fixem `width` nur wenn nötig (z.B. bei Cards die sonst die volle Breite füllen)

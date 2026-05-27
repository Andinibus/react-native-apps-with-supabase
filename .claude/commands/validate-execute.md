# Worker Agent — Validate & Execute

Implementiert eine Komponente oder Änderung nach dem Muster **Plan → Validate → Execute → Verify**.

## Aufruf

```
/validate-execute <Aufgabenbeschreibung>
```

Beispiele:
```
/validate-execute Button-Atom mit Varianten primary, secondary, ghost, danger
/validate-execute StatCard-Molekül zeigt value, label und optionalen accent-Modus
/validate-execute index.ts um neue Avatar-Komponente erweitern
```

---

## Schritt 1 — Plan

Bevor Code geschrieben wird:
- Was genau wird erstellt / geändert?
- Welche Dateien werden angelegt oder modifiziert?
- Welche Props / Typen braucht die Komponente?
- Welche bestehenden Tokens aus `kineticTheme` werden verwendet?

---

## Schritt 2 — Validate (vor dem Schreiben)

**React Native Regeln — diese Fehler IMMER vermeiden:**

| ❌ Falsch (Web/CSS) | ✅ Richtig (React Native) |
|---|---|
| `flexDirection: 'row'` als Default | Default ist `'column'` — `'row'` explizit setzen wenn nötig |
| `div`, `span`, `p` | `View`, `Text` |
| `className`, `style="..."` | `StyleSheet.create({})` |
| `width: '100%'` in StyleSheet | `flex: 1` oder `alignSelf: 'stretch'` |
| Farbe hardcoded `'#ede900'` | `colors.primary` aus `kineticTheme` |
| Abstand hardcoded `16` | `spacing.md` aus `kineticTheme` |

**kineticTheme Tokens (Kurzreferenz):**
```ts
import { kineticTheme } from '../kineticTheme';        // relativ aus atoms/molecules/organisms
const { colors, spacing, radius, typography } = kineticTheme;

// Farben: colors.primary · colors.onSurface · colors.surfaceContainer · colors.outline · ...
// Abstände: spacing.xs(8) · spacing.sm(12) · spacing.md(16) · spacing.lg(24) · spacing.xl(32)
// Radien: radius.sm(12) · radius.md(16) · radius.lg(24) · radius.pill(9999)
// Typo: typography.displayXL · typography.headlineLG · typography.titleMD · typography.bodyBase · typography.bodySM · typography.labelCaps
```

**Importpfade in Komponenten:**
```ts
// Aus atoms/:
import { kineticTheme } from '../kineticTheme';

// Aus molecules/ oder organisms/ — andere Atoms importieren:
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
```

**Importpfade in Stories:**
```ts
// Story liegt in stories/atoms/ → Komponente in src/atoms/
import { Button } from '../../src/atoms/Button';

// Story liegt in stories/molecules/ → Komponente in src/molecules/
import { WorkoutCard } from '../../src/molecules/WorkoutCard';

// Story liegt in stories/organisms/ → Komponente in src/organisms/
import { WorkoutList } from '../../src/organisms/WorkoutList';
```

---

## Schritt 3 — Execute

1. Komponente implementieren (Props-Interface + Function + StyleSheet)
2. Story schreiben (Default + ≥ 2 Varianten)
3. `src/index.ts` aktualisieren

Nach jeder Datei:
```bash
npm run check-types
```

Fehler lesen → Ursache verstehen → Fix anwenden → erneut prüfen.  
**Nicht weitermachen bis 0 Fehler.**

---

## Schritt 4 — Verify im Storybook

```bash
cd packages/shared-components
npm run storybook
```

Storybook läuft auf **http://localhost:6006**.

Checkliste:
- [ ] Komponente erscheint in der richtigen Kategorie (`Atoms/` · `Molecules/` · `Organisms/`)
- [ ] Alle Stories rendern ohne Fehler und ohne rote Konsole
- [ ] Controls-Panel (rechts unten) zeigt alle Props und reagiert live
- [ ] Dark-Background (`#141408`) ist voreingestellt
- [ ] Mindestens `Default` + 2 Varianten vorhanden

---

## Definition of Done

✅ Komponente in `src/<ebene>/` implementiert  
✅ Story in `stories/<ebene>/` mit ≥ 3 Varianten  
✅ `src/index.ts` exportiert die Komponente  
✅ `npm run check-types` = **0 Fehler**  
✅ Story im Storybook sichtbar, interaktiv, fehlerfrei  

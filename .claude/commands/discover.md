# Discover Skill — Projektübersicht & Skill-Guide

Zeige alle verfügbaren Skills und wie der Workflow für neue Komponenten aussieht.

## Verfügbare Skills

| Befehl | Wann verwenden | Beispiel |
|---|---|---|
| `/discover` | Übersicht aller Skills anzeigen | `/discover` |
| `/breakdown` | Aufgabe ist groß und unklar — erst in Schritte zerlegen | `/breakdown Neues Ernährungs-Feature` |
| `/new-component` | Neue Komponente von Grund auf erstellen + Story | `/new-component molecule NutritionLabel` |
| `/gen-stories` | Komponenten ohne Story nachträglich mit Stories versehen | `/gen-stories` oder `/gen-stories atoms` |
| `/validate-execute` | Konkrete Implementierung mit Plan → Validate → Execute | `/validate-execute Button-Variante danger hinzufügen` |

---

## Typischer Workflow: Neue Komponente

```
1.  /breakdown   →  Aufgabe analysieren, Abhängigkeiten klären
2.  /new-component <ebene> <Name>  →  Komponente + Story implementieren
3.  npm run check-types  →  TypeScript validieren (0 Fehler)
4.  npm run storybook    →  Visuell im Browser prüfen
```

---

## Projektstruktur

```
packages/shared-components/
  src/
    kineticTheme.ts      ← Design-Tokens (Farben, Abstände, Typografie, Radien)
    index.ts             ← Öffentliche Exports ALLER Komponenten
    atoms/               ← Kleinste UI-Bausteine (Button, Badge, Avatar, Chip, ...)
    molecules/           ← Zusammengesetzte Komponenten (WorkoutCard, MealRow, ...)
    organisms/           ← UI-Blöcke aus mehreren Molecules (WorkoutList, MacroSummary, ...)
  stories/
    atoms/               ← Storybook Stories für Atoms
    molecules/           ← Storybook Stories für Molecules
    organisms/           ← Storybook Stories für Organisms

apps/
  workout-app/           ← Mobile App (React Native + Expo)
    screens/             ← Vollständige App-Screens
    components/          ← App-spezifische Komponenten (BottomNav, ...)
  admin-app/             ← Web-Admin (Expo Web)

packages/
  shared-types/          ← TypeScript-Typen (Exercise, TrainingPlan, ...)
  shared-utils/          ← Hilfsfunktionen (formatRestDuration, clamp, ...)

supabase/
  functions/             ← Edge Functions (Deno)
  migrations/            ← SQL-Migrationen + RLS-Policies
```

---

## Atomic Design Ebenen

```
Atom       Button · Badge · Avatar · Chip · Divider · ProgressBar
             ↓ keine Abhängigkeit zu anderen shared-components

Molecule   WorkoutCard · ExerciseCard · StatCard · ChatBubble · MealRow
             ↓ darf Atoms importieren

Organism   TrainingPlanCard · WorkoutList · MacroSummary
             ↓ darf Atoms + Molecules importieren
```

---

## Wichtige Befehle

```bash
# TypeScript prüfen (IMMER nach Änderungen)
npm run check-types

# Storybook starten (Komponenten visuell testen)
cd packages/shared-components && npm run storybook
# → öffnet http://localhost:6006

# Workout-App starten
cd apps/workout-app && npx expo start

# Admin-App starten
cd apps/admin-app && npx expo start --web
```

---

## kineticTheme Kurzreferenz

```ts
import { kineticTheme } from '../kineticTheme';
const { colors, spacing, radius, typography } = kineticTheme;

colors.primary          // #ede900 — Gelb, Akzent
colors.background       // #141408 — Hintergrund
colors.onSurface        // #e6e3ce — Haupttext
colors.onSurfaceVariant // #cbc8ab — sekundärer Text
colors.surfaceContainer // #212013 — Karten-Hintergrund
colors.outline          // #949277 — Borders, dezenter Text

spacing.xs  = 8    spacing.sm  = 12
spacing.md  = 16   spacing.lg  = 24   spacing.xl = 32

radius.sm = 12   radius.md = 16   radius.lg = 24   radius.pill = 9999

typography.displayXL   typography.headlineLG   typography.titleMD
typography.bodyBase    typography.bodySM       typography.labelCaps
```

# Session Log — Kinetic Workout App

Vollständiges Protokoll aller Implementierungsschritte aus den Claude-Code-Sessions.

---

## Übersicht

| Bereich | Was wurde gemacht |
|---|---|
| Shared Types | `Exercise`, `TrainingPlan`, `UserProgress`, `RegisterPayload`, `MuscleGroup` |
| Shared Utils | `formatRestDuration`, `formatStreakLabel`, `clamp` |
| Shared Components | Atomic Design Struktur (Atoms, Molecules, Organisms) |
| Storybook | ~58 Stories für alle 14 Komponenten |
| App Screens | 10 voll funktionsfähige React-Native-Screens |
| Supabase | RLS Migration + Edge Function `get-workouts` |
| CI | GitHub Actions Workflow (check-types + build) |
| Claude Skills | 5 Slash-Commands für CDD-Workflow |
| Docs | `cdd-workflow.md`, `session-log.md` |

---

## 1. Supabase Setup

### .env Dateien
```
EXPO_PUBLIC_SUPABASE_URL=https://ryfetwlrxfwpessorazy.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Angelegt in:
- `apps/workout-app/.env`
- `apps/admin-app/.env`

### RLS Migration
`supabase/migrations/202605060001_rls_workouts.sql`
- `ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY`
- Policy: authenticated → SELECT, service_role → INSERT/UPDATE/DELETE

### Edge Function
`supabase/functions/get-workouts/index.ts`
- Benötigt `Authorization: Bearer <token>` Header
- Optionale Query-Parameter: `?difficulty=` und `?limit=`

### CLI-Befehle (Migration + Deploy)
```bash
supabase link --project-ref ryfetwlrxfwpessorazy
supabase db push
supabase functions deploy get-workouts
```

---

## 2. Shared Types (`packages/shared-types/src/index.ts`)

Neu hinzugefügt:
```ts
type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body'

interface Exercise {
  id: string
  name: string
  muscleGroup: MuscleGroup
  sets: number
  reps: number
  restInSeconds?: number
}

interface TrainingPlan {
  id: string
  title: string
  description?: string
  workoutCount: number
  durationInWeeks: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  targetMuscleGroups: MuscleGroup[]
}

interface UserProgress {
  userId: string
  totalWorkouts: number
  currentStreak: number
  weeklyGoal: number
  weeklyDone: number
}

interface RegisterPayload {
  email: string
  password: string
  displayName: string
}
```

---

## 3. Shared Utils (`packages/shared-utils/src/index.ts`)

```ts
formatRestDuration(seconds: number): string   // 90 → "1:30"
formatStreakLabel(days: number): string        // 7 → "7-Tage-Streak 🔥"
clamp(value, min, max): number
```

---

## 4. Design System — kineticTheme

`packages/shared-components/src/kineticTheme.ts`

```ts
colors.primary          = '#ede900'   // Gelb-Akzent
colors.background       = '#141408'   // Dunkel-Hintergrund
colors.onSurface        = '#e6e3ce'   // Haupttext
colors.surfaceContainer = '#212013'   // Karten-BG
colors.outline          = '#949277'

spacing: xs=8, sm=12, md=16, lg=24, xl=32
radius:  sm=12, md=16, lg=24, pill=9999
typography: displayXL, headlineLG, titleMD, bodyBase, bodySM, labelCaps
```

---

## 5. Atomic Design Komponenten

### Atoms (`src/atoms/`)

| Komponente | Props |
|---|---|
| `Button` | `label, onPress, variant, size, disabled, fullWidth` |
| `Badge` | `label, variant` (default/beginner/intermediate/advanced/success/warning/danger) |
| `Avatar` | `initials?, size, highlighted` |
| `Chip` | `label, selected, onPress, disabled` |
| `Divider` | `spacing` |
| `ProgressBar` | `value, max, label, showPercent` |

### Molecules (`src/molecules/`)

| Komponente | Props |
|---|---|
| `WorkoutCard` | `title, durationInMinutes, difficulty, onPress` |
| `ExerciseCard` | `exercise: Exercise, index` |
| `StatCard` | `value, label, accent` |
| `ChatBubble` | `text, role: 'user'\|'coach', timestamp` |
| `MealRow` | `name, time, kcal, protein, carbs, fat` |

### Organisms (`src/organisms/`)

| Komponente | Props |
|---|---|
| `TrainingPlanCard` | `plan: TrainingPlan, onPress` |
| `WorkoutList` | `workouts, heading, onPressWorkout` |
| `MacroSummary` | `kcal, kcalGoal, protein, proteinGoal, carbs, carbsGoal, fat, fatGoal` |

---

## 6. Storybook Stories

```
stories/
  atoms/
    Button.stories.tsx        7 Stories
    Badge.stories.tsx         7 Stories
    Avatar.stories.tsx        5 Stories
    Chip.stories.tsx          3 Stories
    ProgressBar.stories.tsx   5 Stories
  molecules/
    WorkoutCard.stories.tsx   4 Stories
    ExerciseCard.stories.tsx  3 Stories
    StatCard.stories.tsx      4 Stories
    ChatBubble.stories.tsx    3 Stories
    MealRow.stories.tsx       4 Stories
  organisms/
    TrainingPlanCard.stories.tsx  3 Stories
    WorkoutList.stories.tsx       3 Stories
    MacroSummary.stories.tsx      4 Stories
```

Storybook starten:
```bash
cd packages/shared-components
npm run storybook
# → http://localhost:6006
```

---

## 7. App Screens (`apps/workout-app/screens/`)

| Screen | Datei | Funktion |
|---|---|---|
| Onboarding | `OnboardingScreen.tsx` | 3-Step Wizard mit animierten Dots |
| Dashboard | `DashboardScreen.tsx` | Greeting, StatCards, ProgressBar, WorkoutCards |
| Workout-Tracking | `WorkoutTrackingScreen.tsx` | Live-Timer, Set-Checkboxen, Progress-Berechnung |
| KI-Coach | `KICoachScreen.tsx` | Chat-Interface, Keyword-Responses, Suggestion-Chips |
| Ernährung | `ErnaehrungScreen.tsx` | Makro-Ringe, Kalorien-ProgressBar, MealRow-Liste |
| Historie | `HistorieScreen.tsx` | Workout-History mit Datum-Badge und Difficulty-Farben |
| Community | `CommunityScreen.tsx` | Posts, Like-Toggle, Filter-Chips, Online-Badge |
| Profil | `ProfilScreen.tsx` | XP-Bar, Achievements, Settings, Logout |
| Foto-KI | `FotoKIScreen.tsx` | Mock-Analyse, Score/Metriken/Feedback |
| Admin | `AdminModerationScreen.tsx` | Nutzer/Beiträge/Statistik-Tabs |

Navigation: `BottomNav.tsx` mit 5 Tabs (aktiver Tab = `#ede900`)

---

## 8. GitHub Actions CI

`.github/workflows/ci.yml`

```yaml
jobs:
  check-types:   # node 22, npm ci, turbo check-types
  build:         # needs: check-types
```

---

## 9. Claude Skills (`.claude/commands/`)

| Skill | Datei | Verwendung |
|---|---|---|
| `/discover` | `discover.md` | Projektübersicht und Skill-Auswahl |
| `/new-component` | `new-component.md` | Neue Komponente + Story end-to-end |
| `/gen-stories` | `gen-stories.md` | Fehlende Stories automatisch generieren |
| `/validate-execute` | `validate-execute.md` | Plan → Validate → Execute → Verify |
| `/breakdown` | `breakdown.md` | Große Aufgabe in CDD-Schritte zerlegen |

### Typischer Workflow für neue Komponente

```
1. /breakdown   → Aufgabe analysieren, Abhängigkeiten klären
2. /new-component <atom|molecule|organism> <Name>
3. npm run check-types  → 0 Fehler
4. npm run storybook    → visuell prüfen auf http://localhost:6006
```

---

## 10. Bekannte Fixes & Debugging

### Supabase Health Check UNHEALTHY
**Problem:** Edge Function gab `UNAUTHORIZED_NO_AUTH_HEADER` zurück.  
**Fix:** Beide Header setzen:
```ts
headers: {
  'apikey': anonKey,
  'Authorization': `Bearer ${anonKey}`
}
```

### React Native Import-Pfade
Nach Verschieben in `atoms/`/`molecules/`/`organisms/`:
```ts
// Falsch:
import { kineticTheme } from './kineticTheme';
// Richtig (aus Unterordner):
import { kineticTheme } from '../kineticTheme';
```

### Story Import-Pfade
```ts
// Falsch:
import { Button } from '../../src';
// Richtig (direkter Pfad):
import { Button } from '../../src/atoms/Button';
```

### TypeScript-Fehler nach Refactoring
- `typography.titleLG` existiert nicht → `typography.headlineLG` verwenden
- `ProgressBar` nimmt `value`/`max`, nicht `progress`

---

## 11. Nützliche Befehle

```bash
# TypeScript prüfen
npm run check-types

# Storybook
cd packages/shared-components && npm run storybook

# Workout-App (Expo)
cd apps/workout-app && npx expo start

# Admin-App (Web)
cd apps/admin-app && npx expo start --web

# Supabase Migrations pushen
supabase db push

# Edge Function deployen
supabase functions deploy get-workouts
```

---

## 12. Projektstruktur (Endzustand)

```
react-native-apps-with-supabase/
├── .claude/
│   └── commands/           ← 5 Claude Skills
├── .github/
│   └── workflows/ci.yml    ← GitHub Actions
├── apps/
│   ├── workout-app/
│   │   ├── screens/        ← 9 App-Screens
│   │   ├── components/     ← BottomNav
│   │   └── App.tsx         ← Router + Navigation
│   └── admin-app/
│       ├── screens/        ← AdminModerationScreen
│       └── App.tsx
├── docs/
│   ├── cdd-workflow.md
│   └── session-log.md      ← diese Datei
├── packages/
│   ├── shared-components/
│   │   ├── src/
│   │   │   ├── atoms/      ← Button Badge Avatar Chip Divider ProgressBar
│   │   │   ├── molecules/  ← WorkoutCard ExerciseCard StatCard ChatBubble MealRow
│   │   │   ├── organisms/  ← TrainingPlanCard WorkoutList MacroSummary
│   │   │   ├── kineticTheme.ts
│   │   │   └── index.ts
│   │   └── stories/
│   │       ├── atoms/
│   │       ├── molecules/
│   │       └── organisms/
│   ├── shared-types/
│   └── shared-utils/
└── supabase/
    ├── functions/get-workouts/
    └── migrations/
```

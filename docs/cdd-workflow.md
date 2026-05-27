# CDD Workflow — Component-Driven Development

Dieser Workflow beschreibt, wie neue UI-Komponenten in diesem Monorepo entwickelt werden.

## Prinzip

Komponenten werden **von innen nach aussen** entwickelt: zuerst isoliert in Storybook, dann in Screens integriert. Kein Code landet in einer App, bevor er in Storybook laeuft.

## Schritt-fuer-Schritt

### 1. Typ definieren (`packages/shared-types`)

Falls die Komponente einen neuen Datentyp benoetigt, zuerst den Typ in `packages/shared-types/src/index.ts` ergaenzen.

```ts
export interface MyNewType {
  id: string;
  // ...
}
```

### 2. Util-Helfer ergaenzen (`packages/shared-utils`)

Wenn Formatierungslogik benoetigt wird (z.B. Datumsformate, Label-Generierung), diese in `packages/shared-utils/src/index.ts` hinzufuegen — nie direkt in die Komponente einbetten.

### 3. Komponente erstellen (`packages/shared-components/src`)

Neue Datei anlegen, z.B. `MyComponent.tsx`.

- Immer `kineticTheme` aus `./kineticTheme` fuer Farben, Abstands- und Typografie-Tokens verwenden
- Props-Interface mit `export interface MyComponentProps` definieren und re-exportieren
- Keine hardcodierten Farbwerte — ausschliesslich `colors.*` aus dem Theme

```tsx
import { StyleSheet, Text, View } from 'react-native';
import { kineticTheme } from './kineticTheme';

const { colors, spacing, radius, typography } = kineticTheme;

export interface MyComponentProps {
  label: string;
}

export function MyComponent({ label }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radius.md,
    padding: spacing.md
  },
  label: {
    ...typography.bodyBase,
    color: colors.onSurface
  }
});
```

### 4. In `index.ts` exportieren

```ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 5. Storybook Story erstellen (`packages/shared-components/stories`)

Datei `MyComponent.stories.tsx` anlegen.

- `Default` Story zeigt den normalen Zustand
- Eine Story pro relevantem Zustand oder Variante
- Dunklen Hintergrund (`#141408`) als Storybook-Background setzen, da das Design-System ein dunkles Theme verwendet

```tsx
import React from 'react';
import { MyComponent } from '../src';

const meta = {
  title: 'Category/MyComponent',
  component: MyComponent,
  args: { label: 'Beispiel' },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#141408' }]
    }
  }
};

export default meta;

export const Default = {};
export const LongLabel = { args: { label: 'Ein sehr langer Labeltext fuer den Randfall' } };
```

### 6. Storybook starten und pruefen

```bash
npm run storybook
```

Oeffnet Storybook unter `http://localhost:6006`. Alle States durchklicken und visuell pruefen.

### 7. In App integrieren

Erst wenn die Komponente in Storybook korrekt aussieht und alle Varianten abgedeckt sind, wird sie in `apps/workout-app` oder `apps/admin-app` verwendet.

## Dateistruktur-Checkliste

Fuer jede neue Komponente:

- [ ] `packages/shared-types/src/index.ts` — neuer Typ (falls benoetigt)
- [ ] `packages/shared-utils/src/index.ts` — neue Util-Funktion (falls benoetigt)
- [ ] `packages/shared-components/src/MyComponent.tsx` — Komponente
- [ ] `packages/shared-components/src/index.ts` — Export ergaenzt
- [ ] `packages/shared-components/stories/MyComponent.stories.tsx` — Storybook Story

## Vorhandene Komponenten

| Komponente | Story | Beschreibung |
|---|---|---|
| `WorkoutCard` | `WorkoutCard.stories.tsx` | Zeigt Titel, Dauer und Schwierigkeit eines Workouts |
| `ExerciseCard` | `ExerciseCard.stories.tsx` | Zeigt eine Uebung mit Sets, Reps und Pause |
| `TrainingPlanCard` | `TrainingPlanCard.stories.tsx` | Zeigt einen Trainingsplan mit Metadaten und Muskelgruppen |
| `ProgressBar` | `ProgressBar.stories.tsx` | Generische Fortschrittsanzeige mit optionalem Label |

## Design-Tokens (kineticTheme)

Alle Tokens sind in `packages/shared-components/src/kineticTheme.ts` definiert.

| Gruppe | Beispiele |
|---|---|
| `colors` | `primary`, `onSurface`, `surfaceContainer`, `error` |
| `spacing` | `xs`, `sm`, `md`, `lg`, `xl`, `cardPadding` |
| `radius` | `sm`, `md`, `lg`, `xl`, `pill` |
| `typography` | `displayXL`, `headlineLG`, `titleMD`, `bodyBase`, `bodySM`, `labelCaps` |

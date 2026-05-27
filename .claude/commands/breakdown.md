# Manager Agent — CDD Work Breakdown

Zerlege eine Aufgabe nach dem **Component-Driven Development** Prinzip in geordnete Teilschritte.

## Aufruf

```
/breakdown <Aufgabenbeschreibung>
```

Beispiele:
```
/breakdown Neue Molekül-Komponente "NutritionBadge" mit Kalorien und Makros
/breakdown WorkoutDetail-Screen mit ExerciseList und Timer
/breakdown MacroTracker-Feature von DB bis UI
```

---

## Ablauf

### 1. Ziel analysieren
- Was soll am Ende sicht- und testbar vorhanden sein?
- Welche Ebene(n) der Atomic-Design-Hierarchie werden berührt?

### 2. Abhängigkeiten prüfen

Checkliste vor dem Implementieren:
- [ ] Brauche ich neue **Typen** in `packages/shared-types/src/index.ts`?
- [ ] Brauche ich neue **Utils** in `packages/shared-utils/src/index.ts`?
- [ ] Welche bestehenden Komponenten kann ich **wiederverwenden**? (Atoms → Molecules → Organisms)
- [ ] Brauche ich Backend-Änderungen (Migration, Edge Function)?

### 3. CDD-Roadmap erstellen (innen → außen)

| Schritt | Was | Wo |
|---|---|---|
| 1 | Typen definieren | `packages/shared-types/src/index.ts` |
| 2 | Utils hinzufügen | `packages/shared-utils/src/index.ts` |
| 3 | Atom(e) implementieren | `packages/shared-components/src/atoms/` |
| 4 | Atom-Stories schreiben | `packages/shared-components/stories/atoms/` |
| 5 | Molecule(s) implementieren | `packages/shared-components/src/molecules/` |
| 6 | Molecule-Stories schreiben | `packages/shared-components/stories/molecules/` |
| 7 | Organism(s) implementieren | `packages/shared-components/src/organisms/` |
| 8 | Organism-Stories schreiben | `packages/shared-components/stories/organisms/` |
| 9 | `src/index.ts` aktualisieren | `packages/shared-components/src/index.ts` |
| 10 | `check-types` ausführen | Root: `npm run check-types` |
| 11 | Storybook starten + visuell prüfen | `cd packages/shared-components && npm run storybook` |
| 12 | In App-Screen integrieren | `apps/workout-app/screens/` |

Nur die Schritte aufführen, die für diese Aufgabe relevant sind.

### 4. Parallelisierung

Welche Schritte können gleichzeitig laufen?
- Typen + Utils: parallel
- Atoms: parallel untereinander
- Molecules: erst wenn alle benötigten Atoms fertig
- Organisms: erst wenn alle benötigten Molecules fertig
- Storybook-Prüfung: erst wenn check-types = 0 Fehler

### 5. Aufgaben ausgeben

Erstelle eine geordnete TODO-Liste mit:
- Klarer Aufgabenbeschreibung
- Welcher Skill verwendet wird (`/new-component`, `/validate-execute`, `/gen-stories`)
- Abhängigkeiten explizit markiert

Starte sofort mit Schritt 1.

---

## Referenz: Atomic Design Ebenen

```
Atom       → kleinste Einheit, keine Abhängigkeit zu anderen Komponenten
             Beispiele: Button, Badge, Avatar, Chip, Divider, ProgressBar

Molecule   → Kombination aus Atoms, hat einen klaren Zweck
             Beispiele: WorkoutCard, ExerciseCard, StatCard, ChatBubble, MealRow

Organism   → Kombination aus Atoms + Molecules, bildet einen UI-Block
             Beispiele: TrainingPlanCard, WorkoutList, MacroSummary
```

## Referenz: Wichtige Pfade

```
src/atoms/           Atom-Komponenten
src/molecules/       Molekül-Komponenten
src/organisms/       Organismus-Komponenten
src/kineticTheme.ts  Design-Tokens (Farben, Abstände, Typografie)
src/index.ts         Öffentliche Exports aller Komponenten

stories/atoms/       Storybook Stories für Atoms
stories/molecules/   Storybook Stories für Molecules
stories/organisms/   Storybook Stories für Organisms
```

export function formatWorkoutDuration(durationInMinutes: number): string {
  if (durationInMinutes < 60) {
    return `${durationInMinutes} min`;
  }

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return minutes === 0 ? `${hours} h` : `${hours} h ${minutes} min`;
}

export function formatRestDuration(restInSeconds: number): string {
  if (restInSeconds < 60) {
    return `${restInSeconds}s`;
  }

  const minutes = Math.floor(restInSeconds / 60);
  const seconds = restInSeconds % 60;

  return seconds === 0 ? `${minutes} min` : `${minutes}:${String(seconds).padStart(2, '0')} min`;
}

export function formatStreakLabel(streak: number): string {
  if (streak === 0) return 'Noch kein Streak';
  if (streak === 1) return '1 Tag in Folge';
  return `${streak} Tage in Folge`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/components/shared/useLocalStorage';
import type { CategoryId } from '@/data/categories';
import { LEVELS, TRAINING_ITEMS, XP_PER_ITEM } from '@/data/training';

interface ProgressState {
  xp: number;
  streak: number;
  bestStreak: number;
  completed: string[];
  badges: CategoryId[];
}

const EMPTY: ProgressState = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  completed: [],
  badges: [],
};

export interface TrainingProgress {
  xp: number;
  streak: number;
  bestStreak: number;
  completed: string[];
  badges: CategoryId[];
  levelName: string;
  nextLevelXp: number | null;
  progressLabel: string;
  recordCorrect: (itemId: string, category: CategoryId) => void;
  recordMiss: () => void;
  reset: () => void;
}

export function useTrainingProgress(): TrainingProgress {
  const [state, setState, { reset }] = useLocalStorage<ProgressState>(
    'training-progress',
    EMPTY,
  );

  const recordCorrect = useCallback(
    (itemId: string, category: CategoryId) => {
      setState((current) => {
        const alreadyDone = current.completed.includes(itemId);
        const streak = current.streak + 1;
        return {
          xp: alreadyDone ? current.xp : current.xp + XP_PER_ITEM,
          streak,
          bestStreak: Math.max(current.bestStreak, streak),
          completed: alreadyDone ? current.completed : [...current.completed, itemId],
          badges: current.badges.includes(category)
            ? current.badges
            : [...current.badges, category],
        };
      });
    },
    [setState],
  );

  // A miss only ends the streak. Nothing is deducted, ever.
  const recordMiss = useCallback(() => {
    setState((current) => ({ ...current, streak: 0 }));
  }, [setState]);

  const { levelName, nextLevelXp } = useMemo(() => {
    let name = LEVELS[0].name as string;
    let next: number | null = LEVELS[1].minXp;
    for (let index = 0; index < LEVELS.length; index += 1) {
      if (state.xp >= LEVELS[index].minXp) {
        name = LEVELS[index].name;
        next = index + 1 < LEVELS.length ? LEVELS[index + 1].minXp : null;
      }
    }
    return { levelName: name, nextLevelXp: next };
  }, [state.xp]);

  return {
    ...state,
    levelName,
    nextLevelXp,
    progressLabel: `${levelName} · ${state.xp} XP · ${state.completed.length}/${TRAINING_ITEMS.length}`,
    recordCorrect,
    recordMiss,
    reset,
  };
}

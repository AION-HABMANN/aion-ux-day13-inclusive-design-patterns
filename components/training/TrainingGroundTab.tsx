'use client';

import { useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import {
  CategoryChip,
  CategoryChoiceChip,
  CategoryLegend,
} from '@/components/shared/CategoryChip';
import { Meter, SegmentedControl } from '@/components/shared/Controls';
import { CATEGORIES, CATEGORY_BY_ID, type CategoryId } from '@/data/categories';
import { LEVELS, PRODUCTS, TRAINING_ITEMS, type TrainingItem } from '@/data/training';
import { PracticeSurface } from './PracticeSurfaces';
import type { TrainingProgress } from './useTrainingProgress';

const ENCOURAGEMENT = [
  'Not quite — that reading is a reasonable one. Look again at what the element makes you do.',
  'Not quite. Nothing is lost. Try a different category.',
  'Not quite — you are in the right area. Which strain is doing the most work here?',
];

function ItemCard({
  item,
  index,
  progress,
}: {
  item: TrainingItem;
  index: number;
  progress: TrainingProgress;
}) {
  const [choice, setChoice] = useState<CategoryId | null>(null);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [fixed, setFixed] = useState(false);

  const isRight = checked && choice === item.category;

  const check = () => {
    if (!choice) return;
    setChecked(true);
    if (choice === item.category) {
      progress.recordCorrect(item.id, item.category);
    } else {
      progress.recordMiss();
      setAttempts((current) => current + 1);
    }
  };

  const retry = () => {
    setChecked(false);
    setChoice(null);
  };

  return (
    <li className="aion-card">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="rounded bg-lilac px-2 py-0.5 text-[13px] font-semibold text-purple">
          {index + 1} of {TRAINING_ITEMS.length}
        </span>
        <h3 className="text-[17px] font-bold text-navy">{item.title}</h3>
        {progress.completed.includes(item.id) && (
          <span className="text-[15px] font-semibold text-success">Done</span>
        )}
      </div>
      <p className="mt-1 text-[15px] text-ink70">{item.task}</p>

      <div className="mt-3">
        <PracticeSurface itemId={item.id} fixed={isRight && fixed} />
      </div>

      {!checked && (
        <>
          <p className="mt-4 aion-label">Which category does this belong to?</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <CategoryChoiceChip
                  id={category.id}
                  selected={choice === category.id}
                  onSelect={setChoice}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="aion-btn mt-3"
            onClick={check}
            disabled={!choice}
          >
            Check
          </button>
        </>
      )}

      {checked && !isRight && (
        <div className="mt-4 rounded-lg border border-line bg-lilac p-3">
          <p className="text-[15px] font-semibold text-navy">
            {ENCOURAGEMENT[Math.min(attempts - 1, ENCOURAGEMENT.length - 1)]}
          </p>
          <p className="mt-1 text-[15px] text-ink70">
            You picked {CATEGORY_BY_ID[choice!].label}. Nothing was deducted.
          </p>
          <button type="button" className="aion-btn mt-3" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {isRight && (
        <div className="mt-4 rounded-lg border border-success bg-[#F1FAF5] p-3">
          <dl className="space-y-2 text-[15px]">
            <div>
              <dt className="font-semibold text-navy">Verdict</dt>
              <dd className="text-success">
                Correct{attempts > 0 ? ' — and you got there by working it out.' : '.'}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">What</dt>
              <dd className="text-navy">{item.what}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Who it affects</dt>
              <dd className="text-navy">{item.who.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Category</dt>
              <dd>
                <CategoryChip id={item.category} size="sm" />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Live fix</dt>
              <dd className="mt-1">
                <SegmentedControl
                  label={`Live fix for ${item.title}`}
                  value={fixed ? 'after' : 'before'}
                  onChange={(value) => setFixed(value === 'after')}
                  options={[
                    { value: 'before', label: 'As built' },
                    { value: 'after', label: 'Repaired' },
                  ]}
                />
                <span className="mt-1 block text-[15px] text-ink70">
                  {fixed ? item.fixNote : 'Switch to see the repair happen above.'}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </li>
  );
}

export function TrainingGroundTab({ progress }: { progress: TrainingProgress }) {
  const [product, setProduct] = useState<'all' | (typeof PRODUCTS)[number]['id']>('all');

  const items = TRAINING_ITEMS.filter(
    (item) => product === 'all' || item.product === product,
  );

  const levelFloor =
    [...LEVELS].reverse().find((level) => progress.xp >= level.minXp)?.minXp ?? 0;
  const levelCeiling = progress.nextLevelXp ?? levelFloor + 1;
  const levelPct =
    progress.nextLevelXp === null
      ? 100
      : ((progress.xp - levelFloor) / (levelCeiling - levelFloor)) * 100;

  return (
    <div className="space-y-6">
      <TabIntro
        title="Training Ground"
        lead="Twelve practice elements across three practice products. Interact with each one first, then name the category. Wrong picks cost nothing — there is no timer, no score to beat and no way to lose here."
      />

      <section className="aion-panel" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="text-[15px] font-semibold text-navy">
          Your progress
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <Meter
              label={progress.levelName}
              value={levelPct}
              caption={
                progress.nextLevelXp === null
                  ? `${progress.xp} XP`
                  : `${progress.xp} XP · next level at ${progress.nextLevelXp}`
              }
              tone="good"
            />
            <p className="mt-2 text-[15px] text-navy">
              Streak: {progress.streak} in a row
              {progress.bestStreak > 0 && ` · longest ${progress.bestStreak}`}
            </p>
            <p className="text-[15px] text-ink70">
              Levels: {LEVELS.map((level) => level.name).join(' → ')}
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-navy">
              Category badges ({progress.badges.length} of {CATEGORIES.length})
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const unlocked = progress.badges.includes(category.id);
                return (
                  <li key={category.id}>
                    <span
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[13px]"
                      style={
                        unlocked
                          ? {
                              backgroundColor: category.chip.bg,
                              color: category.chip.fg,
                              borderColor: category.chip.border,
                            }
                          : {
                              backgroundColor: '#FFFFFF',
                              color: '#4A4362',
                              borderColor: '#DDD6EE',
                            }
                      }
                    >
                      {unlocked ? '★' : '☆'} {category.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <button type="button" className="aion-btn-quiet mt-4" onClick={progress.reset}>
          Reset practice progress
        </button>
      </section>

      <CategoryLegend note="Pick from these eight when you check an item." />

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label="Practice product"
          value={product}
          onChange={setProduct}
          options={[
            { value: 'all', label: 'All products' },
            ...PRODUCTS.map((item) => ({ value: item.id, label: item.name })),
          ]}
        />
        <p className="text-[15px] text-ink70">
          {PRODUCTS.map((item) => `${item.name} — ${item.blurb}`).join(' · ')}
        </p>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            index={TRAINING_ITEMS.indexOf(item)}
            progress={progress}
          />
        ))}
      </ul>
    </div>
  );
}

'use client';

import { CATEGORIES, CATEGORY_BY_ID, type CategoryId } from '@/data/categories';

/**
 * The one place a graded category is rendered. Colours come from the category
 * table, so a category looks the same in every tab that is allowed to show it.
 */
export function CategoryChip({
  id,
  withGerman = false,
  size = 'md',
}: {
  id: CategoryId;
  withGerman?: boolean;
  size?: 'sm' | 'md';
}) {
  const category = CATEGORY_BY_ID[id];
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-[13px]' : 'px-3 py-1 text-[15px]',
      ].join(' ')}
      style={{
        backgroundColor: category.chip.bg,
        color: category.chip.fg,
        borderColor: category.chip.border,
      }}
    >
      {category.label}
      {withGerman && (
        <span className="ml-1 font-normal opacity-90">[{category.de}]</span>
      )}
    </span>
  );
}

/** A selectable version of the chip, used by the drills in Learn and Training. */
export function CategoryChoiceChip({
  id,
  selected,
  disabled,
  onSelect,
}: {
  id: CategoryId;
  selected: boolean;
  disabled?: boolean;
  onSelect: (id: CategoryId) => void;
}) {
  const category = CATEGORY_BY_ID[id];
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={[
        'rounded-full border px-3 py-1 text-[15px] transition-colors disabled:opacity-60',
        selected ? 'font-semibold' : 'hover:bg-lilac',
      ].join(' ')}
      style={
        selected
          ? {
              backgroundColor: category.chip.bg,
              color: category.chip.fg,
              borderColor: category.chip.border,
            }
          : { backgroundColor: '#FFFFFF', color: '#231A45', borderColor: '#DDD6EE' }
      }
    >
      {category.label}
    </button>
  );
}

/**
 * The eight graded labels with their German originals. Rendered once near the
 * top of each tab that uses the taxonomy, which is where the bracketed German
 * makes its first appearance for that tab.
 */
export function CategoryLegend({ note }: { note?: string }) {
  return (
    <section className="aion-panel" aria-labelledby="category-legend-heading">
      <h2 id="category-legend-heading" className="text-[15px] font-semibold text-navy">
        The eight graded categories
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryChip id={category.id} withGerman size="sm" />
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-[15px] text-ink70">{note}</p>}
    </section>
  );
}

'use client';

import { useId } from 'react';
import { useCopy } from './useLocalStorage';

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  describedBy,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  describedBy?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="aion-label">
          {label}
        </label>
        <output htmlFor={id} className="text-[15px] font-semibold text-purple">
          {value}
          {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="aion-range mt-1"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-describedby={describedBy}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function SwitchToggle({
  label,
  checked,
  onChange,
  offLabel,
  onLabel,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  offLabel?: string;
  onLabel?: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-md border border-line bg-white px-3 py-2 text-left transition-colors hover:bg-lilac"
    >
      <span>
        <span className="block text-[15px] font-semibold text-navy">{label}</span>
        {hint && <span className="block text-[15px] text-ink70">{hint}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="text-[15px] text-ink70">
          {checked ? (onLabel ?? 'On') : (offLabel ?? 'Off')}
        </span>
        <span
          aria-hidden="true"
          className={[
            'relative h-6 w-11 rounded-full border transition-colors',
            checked ? 'border-purple bg-purple' : 'border-line bg-[#F4F2FA]',
          ].join(' ')}
        >
          <span
            className={[
              'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all',
              checked ? 'left-[24px]' : 'left-1',
            ].join(' ')}
          />
        </span>
      </span>
    </button>
  );
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-white p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={[
              'rounded-md px-3 py-1.5 text-[15px] transition-colors',
              isActive
                ? 'bg-purple font-semibold text-white'
                : 'text-navy hover:bg-lilac',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function Meter({
  label,
  value,
  max = 100,
  caption,
  tone = 'neutral',
}: {
  label: string;
  value: number;
  max?: number;
  caption?: string;
  tone?: 'neutral' | 'good' | 'cost';
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const barColor =
    tone === 'good' ? '#1E8E5A' : tone === 'cost' ? '#B45309' : '#5624D0';
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[15px] font-semibold text-navy">{label}</span>
        {caption && <span className="text-[15px] text-ink70">{caption}</span>}
      </div>
      <div
        className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-line"
        role="meter"
        aria-label={label}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={caption}
      >
        <div
          className="h-full rounded-full transition-[width] duration-200"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export function CopyButton({
  text,
  label = 'Copy',
}: {
  text: string;
  label?: string;
}) {
  const { copied, copy } = useCopy();
  return (
    <button type="button" className="aion-btn-quiet" onClick={() => void copy(text)}>
      {copied ? 'Copied' : label}
    </button>
  );
}

export function WidgetCard({
  code,
  title,
  categoryTag,
  children,
  captions,
}: {
  code: string;
  title: string;
  categoryTag?: React.ReactNode;
  children: React.ReactNode;
  captions?: string[];
}) {
  return (
    <section className="aion-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded bg-lilac px-2 py-0.5 text-[13px] font-semibold text-purple">
          {code}
        </span>
        <h3 className="text-[17px] font-bold text-navy">{title}</h3>
        {categoryTag}
      </div>
      <div className="mt-4">{children}</div>
      {captions && captions.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-[15px] text-ink70">
          {captions.map((caption) => (
            <li key={caption}>{caption}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

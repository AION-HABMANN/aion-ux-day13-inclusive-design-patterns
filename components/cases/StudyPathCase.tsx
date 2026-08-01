'use client';

import { useEffect, useState } from 'react';
import { TabIntro } from '@/components/shared/Chrome';
import {
  CaseLayout,
  CaseViewport,
  NotesPanel,
  TryMeNudge,
} from '@/components/shared/CaseFrame';
import { usePrefersReducedMotion } from '@/components/shared/useLocalStorage';
import {
  SP_ACCENTS,
  SP_AMBIGUOUS_INSTRUCTION,
  SP_BANNERS,
  SP_CONTINUE_INDEXES,
  SP_COURSES,
  SP_DENSE_PARAGRAPH,
  SP_FORM_FIELDS,
  SP_ITALIC_PASSAGE,
  SP_MODULES,
  SP_PROMO_TILES,
  SP_ROTATOR_SLIDES,
  SP_STATUS_BADGE,
  SP_SUBMIT_ERROR,
} from '@/data/studypath';

type Screen = 'home' | 'course' | 'enrolment';

const SCREENS: { id: Screen; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'course', label: 'Course Area' },
  { id: 'enrolment', label: 'Enrolment Form' },
];

/* -------------------------------------------------------------------------- */

function StudyPathHome({ onOpenCourse }: { onOpenCourse: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(
      () => setSlide((current) => (current + 1) % SP_ROTATOR_SLIDES.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="p-3" data-flaw-id="SP-01">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-[15px] font-bold" style={{ color: SP_ACCENTS[4] }}>
          StudyPath
        </span>
        <span
          className="rounded px-2 py-0.5 text-[12px] font-bold text-white"
          style={{ backgroundColor: SP_ACCENTS[3] }}
          data-flaw-id="SP-11"
        >
          {SP_STATUS_BADGE}
        </span>
        <span
          className="case-blink rounded px-2 py-0.5 text-[12px] font-bold text-white"
          style={{ backgroundColor: SP_ACCENTS[0] }}
          data-flaw-id="SP-03"
        >
          NEW
        </span>
      </div>

      {SP_BANNERS.map((banner) => (
        <div
          key={banner.text}
          className="mb-1 rounded px-3 py-1.5 text-[13px] text-white"
          style={{ backgroundColor: banner.accent }}
        >
          {banner.text}
        </div>
      ))}

      <div
        className="mb-2 rounded px-3 py-2 text-[13px] text-white"
        style={{ backgroundColor: SP_ACCENTS[1] }}
        data-flaw-id="SP-03"
      >
        {SP_ROTATOR_SLIDES[reducedMotion ? 0 : slide]}
      </div>

      <div className="grid gap-1 sm:grid-cols-3 lg:grid-cols-4" data-flaw-id="SP-02">
        {SP_MODULES.map((module, index) => (
          <div
            key={module.title}
            className="rounded border p-2"
            style={{ borderColor: module.accent }}
          >
            <div className="flex items-start justify-between gap-1">
              <p className="text-[13px] font-semibold" style={{ color: module.accent }}>
                {module.title}
              </p>
              {module.badge && (
                <span
                  className="shrink-0 rounded-full px-1.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: module.accent }}
                >
                  {module.badge}
                </span>
              )}
            </div>
            <p className="text-[12px] text-[#6B6B6B]">{module.meta}</p>
            {SP_CONTINUE_INDEXES.includes(index) && (
              <button
                type="button"
                onClick={onOpenCourse}
                className="mt-1 rounded px-2 py-0.5 text-[12px] font-semibold text-white"
                style={{ backgroundColor: module.accent }}
              >
                Continue
              </button>
            )}
          </div>
        ))}

        {SP_PROMO_TILES.map((tile) => (
          <div
            key={tile.title}
            className="rounded border p-2"
            style={{ borderColor: SP_ACCENTS[2] }}
          >
            <p className="text-[13px] font-semibold" style={{ color: SP_ACCENTS[2] }}>
              {tile.title}
            </p>
            <p className="text-[12px] text-[#6B6B6B]">{tile.body}</p>
            <button
              type="button"
              className="mt-1 rounded px-2 py-0.5 text-[12px] font-semibold text-white"
              style={{ backgroundColor: SP_ACCENTS[2] }}
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StudyPathCourseArea() {
  const [courseId, setCourseId] = useState<'a' | 'b' | 'c'>('a');
  const [menuOpen, setMenuOpen] = useState(false);
  const course = SP_COURSES.find((item) => item.id === courseId)!;

  return (
    <div className="p-3">
      <div className="mb-3 flex flex-wrap gap-1" data-flaw-id="SP-04">
        {SP_COURSES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCourseId(item.id);
              setMenuOpen(false);
            }}
            className="rounded border px-2 py-1 text-[13px]"
            style={
              item.id === courseId
                ? { backgroundColor: SP_ACCENTS[4], color: '#FFFFFF', borderColor: SP_ACCENTS[4] }
                : { backgroundColor: '#FFFFFF', color: '#4A4A4A', borderColor: '#D8D8D8' }
            }
          >
            Course {item.id.toUpperCase()}
          </button>
        ))}
      </div>

      <p className="mb-2 text-[14px] font-bold text-[#333333]">{course.name}</p>

      {course.navPattern === 'toprow' && (
        <ul
          className="mb-3 flex flex-wrap gap-3 border-b pb-1 text-[13px]"
          style={{ borderColor: '#D8D8D8' }}
          data-flaw-id="SP-05"
        >
          {course.navItems.map((item) => (
            <li key={item}>
              <a href="#studypath" onClick={(event) => event.preventDefault()} style={{ color: SP_ACCENTS[1] }}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {course.navPattern === 'hamburger' && (
        <div className="mb-3" data-flaw-id="SP-05">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded border px-2 py-1 text-[13px]"
            style={{ borderColor: '#D8D8D8', color: SP_ACCENTS[0] }}
          >
            ☰ Menu
          </button>
          {menuOpen && (
            <ul className="mt-1 w-40 rounded border p-2 text-[13px]" style={{ borderColor: '#D8D8D8' }}>
              {course.navItems.map((item) => (
                <li key={item}>
                  <a href="#studypath" onClick={(event) => event.preventDefault()} style={{ color: SP_ACCENTS[0] }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {course.navPattern === 'sidebar' && (
          <ul
            className="w-28 shrink-0 space-y-1 border-r pr-2 text-[13px]"
            style={{ borderColor: '#D8D8D8' }}
            data-flaw-id="SP-05"
          >
            {course.navItems.map((item) => (
              <li key={item}>
                <a href="#studypath" onClick={(event) => event.preventDefault()} style={{ color: SP_ACCENTS[2] }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="min-w-0 flex-1">
          <p
            className="mb-3 text-[13px] font-semibold"
            style={{ color: '#8A8A8A' }}
            data-flaw-id="SP-08"
          >
            {SP_AMBIGUOUS_INSTRUCTION}
          </p>

          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.15,
              textAlign: 'justify',
              color: '#8A8A8A',
            }}
            data-flaw-id="SP-06"
          >
            {SP_DENSE_PARAGRAPH}
          </p>

          <p
            className="mt-2"
            style={{
              fontSize: '13px',
              lineHeight: 1.15,
              textAlign: 'justify',
              color: '#8A8A8A',
              fontStyle: 'italic',
            }}
            data-flaw-id="SP-07"
          >
            {SP_ITALIC_PASSAGE}
          </p>

          <button
            type="button"
            className="mt-3 rounded px-3 py-1 text-[13px] font-semibold text-white"
            style={{ backgroundColor: SP_ACCENTS[4] }}
          >
            {course.filesLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function StudyPathEnrolment({
  values,
  setValues,
  submitted,
  setSubmitted,
}: {
  values: Record<string, string>;
  setValues: (next: Record<string, string>) => void;
  submitted: boolean;
  setSubmitted: (next: boolean) => void;
}) {
  return (
    <div className="p-3">
      {submitted && (
        <p
          className="mb-3 text-[13px]"
          style={{ color: '#C00000' }}
          data-flaw-id="SP-10"
        >
          {SP_SUBMIT_ERROR}
        </p>
      )}

      <p className="mb-3 text-[14px] font-bold text-[#333333]">Enrolment</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        data-flaw-id="SP-09"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {SP_FORM_FIELDS.map((field) => (
            <label key={field.id} className="block text-[13px]" style={{ color: '#4A4A4A' }}>
              {field.label} *
              <input
                type={field.type}
                value={values[field.id] ?? ''}
                onChange={(event) =>
                  setValues({ ...values, [field.id]: event.target.value })
                }
                className="mt-0.5 w-full rounded border px-2 py-1 text-[13px]"
                style={{ borderColor: '#D8D8D8' }}
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-3 rounded px-3 py-1.5 text-[13px] font-semibold text-white"
          style={{ backgroundColor: SP_ACCENTS[3] }}
        >
          Submit enrolment
        </button>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function StudyPathCase() {
  const [screen, setScreen] = useState<Screen>('home');
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const resetCase = () => {
    setScreen('home');
    setValues({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      <TabIntro
        title="StudyPath"
        lead="A fictional learning platform for professional development and exam organisation. Move through all three screens as a user would."
      />

      <TryMeNudge storageKey="studypath" />

      <CaseLayout
        main={
          <CaseViewport onReset={resetCase}>
            <div
              className="border-b bg-[#F4F4F4] px-3 py-2"
              style={{ borderColor: '#D8D8D8' }}
            >
              <ul className="flex flex-wrap gap-2">
                {SCREENS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setScreen(item.id)}
                      className="rounded px-2 py-1 text-[13px]"
                      style={
                        screen === item.id
                          ? { backgroundColor: SP_ACCENTS[4], color: '#FFFFFF' }
                          : { color: '#4A4A4A' }
                      }
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {screen === 'home' && (
              <StudyPathHome onOpenCourse={() => setScreen('course')} />
            )}
            {screen === 'course' && <StudyPathCourseArea />}
            {screen === 'enrolment' && (
              <StudyPathEnrolment
                values={values}
                setValues={setValues}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            )}
          </CaseViewport>
        }
        rail={<NotesPanel storageKey="studypath" />}
      />
    </div>
  );
}

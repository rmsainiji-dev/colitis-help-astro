'use client';
import { useState } from 'react';

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: '1px solid #E8E8E4' }}
    >
      <div className="max-w-[1220px] mx-auto px-6 flex items-center justify-between h-16">
        <a href={`${BASE}/`} className="flex items-center" aria-label="Colitis Help USA — Home">
          <img
            src={`${BASE}/logo.svg`}
            alt="Colitis Help USA"
            height="38"
            width="225"
            style={{ height: '38px', width: 'auto' }}
          />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/ulcerative-colitis-symptoms">UC Symptoms</NavLink>
          <NavLink href="/ulcerative-colitis-treatment-options">Treatments</NavLink>
          <NavLink href="/ulcerative-colitis-flare-up">Flare Help</NavLink>
          <NavLink href="/ulcerative-colitis-diet">Diet</NavLink>
          <NavLink href="/ulcerative-colitis-clinical-trials-usa">Clinical Trials</NavLink>
          <NavLink href="/blog">Articles</NavLink>
        </div>

        <div className="hidden md:block">
          <a
            href={`${BASE}/uc-care-options-check`}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors"
            style={{ backgroundColor: '#C8902A' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8761F')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C8902A')}
          >
            Check My UC Care Options
          </a>
        </div>

        <button
          className="md:hidden p-2"
          style={{ color: '#0B2545' }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-white" style={{ borderTop: '1px solid #E8E8E4' }}>
          <NavLink href="/ulcerative-colitis-symptoms" onClick={() => setOpen(false)}>UC Symptoms</NavLink>
          <NavLink href="/ulcerative-colitis-treatment-options" onClick={() => setOpen(false)}>Treatments</NavLink>
          <NavLink href="/ulcerative-colitis-flare-up" onClick={() => setOpen(false)}>Flare Help</NavLink>
          <NavLink href="/ulcerative-colitis-diet" onClick={() => setOpen(false)}>Diet</NavLink>
          <NavLink href="/ulcerative-colitis-clinical-trials-usa" onClick={() => setOpen(false)}>Clinical Trials</NavLink>
          <NavLink href="/blog" onClick={() => setOpen(false)}>Articles</NavLink>
          <a
            href={`${BASE}/uc-care-options-check`}
            onClick={() => setOpen(false)}
            className="mt-2 text-center px-5 py-3 rounded-lg font-semibold text-sm text-white w-full"
            style={{ backgroundColor: '#C8902A' }}
          >
            Check My UC Care Options
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={`${BASE}${href}`}
      onClick={onClick}
      className="text-sm font-medium transition-colors hover:opacity-70 py-1"
      style={{ color: '#0B2545' }}
    >
      {children}
    </a>
  );
}

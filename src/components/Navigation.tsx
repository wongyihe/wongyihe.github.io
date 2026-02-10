import React from 'react';
import svgPaths from "../imports/svg-wxofekv4tt";

function MenuIcon() {
  return (
    <div className="h-[24px] w-[28px] relative shrink-0 mr-3">
      <div className="absolute inset-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 37">
          <g id="Group 23">
            <path d={svgPaths.p3111d00} id="Vector 1" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p18a60ac0} id="Vector 2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p350f2b00} id="Vector 3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p13ea7b80} id="Vector 4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticky nav + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'connect', label: 'Connect' },
    { id: 'cv', label: 'CV', href: '/cv.pdf', external: true }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 w-full">
      <div className="max-w-[1568px] mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center hover:opacity-70 transition-opacity"
            aria-label="Home"
          >
            <MenuIcon />
            <span className="hidden md:block font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-black">
              Yihe Eve Wang
            </span>
          </button>
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            if (item.external) {
              return (
                <a 
                  key={item.id}
                  href={item.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-['Inter:Regular',_sans-serif] text-[15px] text-gray-600 hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-['Inter:Regular',_sans-serif] text-[15px] text-gray-600 hover:text-black transition-colors"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import svgPaths from "../imports/svg-wxofekv4tt";
import { navigate } from "../router";

function isHome() {
  return (window.location.pathname.replace(/\/+$/, "") || "/") === "/";
}

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

type NavItem = 
  | { id: string; label: string; external?: false }
  | { id: string; label: string; href: string; external: true };

export function Navigation() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticky nav + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    }
  };

  // Section links only exist on the homepage. When clicked from another route,
  // go home first, then jump to the section once it has mounted. The retry
  // loop makes this robust to React committing the home page a few frames
  // later, and the jump is instant ('auto') because browsers cancel smooth
  // scrolls initiated across a route transition.
  const goToSection = (id: string) => {
    if (isHome()) {
      scrollToSection(id);
      return;
    }
    navigate('/');
    let tries = 0;
    const attempt = () => {
      if (document.getElementById(id)) {
        scrollToSection(id, 'auto');
      } else if (++tries < 30) {
        requestAnimationFrame(attempt);
      }
    };
    requestAnimationFrame(attempt);
  };

  const goHome = () => {
    if (isHome()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const navItems: NavItem[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'connect', label: 'Connect' },
    { id: 'cv', label: 'CV', href: 'https://docs.google.com/document/d/19v-5khckm2q5-35_Ebb4LmhKCcHK2As-PKVZJUKHlP8/preview', external: true }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 w-full">
      <div className="max-w-[1568px] mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={goHome}
            className="flex items-center hover:opacity-70 transition-opacity group"
            aria-label="Home"
          >
            <MenuIcon />
            <div 
              className="hidden md:block relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-black cursor-pointer">
                Yihe Eve Wang
              </span>
              <div 
                className={`absolute bottom-full left-1/2 mb-2 px-4 py-2 text-white text-sm rounded-lg shadow-lg transition-all duration-300 ease-out pointer-events-none ${
                  isHovered 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{ 
                  transform: isHovered 
                    ? 'translateX(0) translateY(0)' 
                    : 'translateX(0) translateY(4px)',
                  backgroundColor: '#1f2937',
                  visibility: isHovered ? 'visible' : 'hidden',
                  minWidth: '280px',
                  maxWidth: '320px'
                }}
              >
                <div className="relative">
                  Yihe... ee-her. Eve, if you're hearing it in WenZhou dialect &gt;w&lt;
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#1f2937' }}></div>
                  </div>
                </div>
              </div>
            </div>
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
                onClick={() => goToSection(item.id)}
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

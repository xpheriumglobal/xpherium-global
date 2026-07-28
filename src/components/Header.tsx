import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const dropdownItems = [
  { label: 'Industries', desc: 'Tailored AI for your sector', href: '/industries' },
  { label: 'Business Functions', desc: 'Ops, sales, finance, HR', href: '/business-functions' },
  { label: 'AI Solutions', desc: 'Custom models & platforms', href: '/ai-solutions' },
  { label: 'AI Agents', desc: 'Autonomous workforce', href: '/ai-agents' },
  { label: 'Automation Services', desc: 'End-to-end workflows', href: '/automation-services' },
  { label: 'Technologies', desc: 'Stack & infrastructure', href: '/technologies' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-[100] w-full flex justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'pt-4 md:pt-6' : 'pt-0'
        }`}
      >
        <div
          className={`relative mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled 
              ? 'h-[60px] w-[90%] max-w-[1200px] rounded-full px-6 lg:px-8 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'h-[80px] w-full max-w-[1440px] px-6 lg:px-10 border-b border-white/[0.04]'
          }`}
          style={{
            background: scrolled ? 'rgba(5,5,7,0.85)' : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
          }}
        >
          {scrolled && (
            <div
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-[80%]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(245,194,66,0.0) 0%, rgba(245,194,66,0.35) 15%, rgba(245,194,66,0.15) 50%, rgba(245,194,66,0.0) 85%, transparent 100%)',
              }}
            />
          )}
          <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group flex items-center shrink-0 h-[28px]">
            <span
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center whitespace-nowrap leading-none select-none font-display"
              style={{
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '0.5px',
                lineHeight: '1',
                height: '28px',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(180deg, #f5c242 0%, #d4a041 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  display: 'inline-block',
                }}
              >
                X-
              </span>
              <span
                style={{
                  background: 'linear-gradient(180deg, #e8e0c8 0%, #c2b8a3 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  display: 'inline-block',
                }}
              >
                PHERIUM
              </span>
            </span>
          </Link>
          <nav className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hidden items-center gap-[32px] lg:flex">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`group relative flex items-center gap-1.5 py-2 text-[14px] font-[500] tracking-[-0.01em] transition-colors duration-200 ${
                        dropdownOpen ? 'text-white' : 'text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        className={`transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-[#f5c242] transition-transform duration-300 ${
                          dropdownOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute left-1/2 top-[calc(100%+18px)] z-50 w-[560px] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        dropdownOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-3 opacity-0'
                      }`}
                    >
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -top-3 left-0 right-0 h-3" />
                      <div
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 overflow-hidden rounded-[18px] border border-white/[0.08] p-[1px]"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))',
                          boxShadow:
                            '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.08) inset',
                        }}
                      >
                        <div
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative rounded-[17px] p-7"
                          style={{
                            background:
                              'radial-gradient(120% 120% at 0% 0%, rgba(245,194,66,0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(18,18,20,0.95) 0%, rgba(10,10,12,0.98) 100%)',
                            backdropFilter: 'blur(40px)',
                          }}
                        >
                          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5c242]/20 to-transparent" />
                          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-6 flex items-center justify-between">
                            <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[11px] font-[600] uppercase tracking-[0.14em] text-[#f5c242]/80">
                              Services / What we build
                            </p>
                            <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[10px] tracking-[0.12em] text-white/20 uppercase">
                              06 Solutions
                            </span>
                          </div>
                          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-2 gap-x-8 gap-y-1">
                            {dropdownItems.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group/item flex items-start gap-3 rounded-[12px] px-3 py-3 transition-all duration-200 hover:bg-white/[0.04]"
                              >
                                <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#f5c242] shadow-[0_0_8px_rgba(245,194,66,0.5)] transition-transform duration-200 group-hover/item:scale-125" />
                                <span>
                                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 block text-[14px] font-[500] leading-[1.2] text-white/90 group-hover/item:text-white">
                                    {item.label}
                                  </span>
                                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1 block text-[12.5px] leading-[1.35] text-white/40 group-hover/item:text-white/60">
                                    {item.desc}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-6 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/80" />
                            <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[11.5px] leading-none text-white/50">
                              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-white/80">New:</span> Autonomous workforce audit — 48h
                              delivery
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group relative py-2 text-[14px] font-[500] tracking-[-0.01em] text-[#9CA3AF] transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#f5c242] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>
          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group relative hidden h-[38px] items-center justify-center gap-1.5 overflow-hidden rounded-full px-[22px] text-[14px] font-[600] tracking-[-0.01em] text-[#0a0a0b] transition-all duration-300 hover:shadow-[0_0_24px_rgba(245,194,66,0.45),0_0_0_1px_rgba(245,194,66,0.5)_inset] lg:inline-flex"
              style={{
                background: 'linear-gradient(180deg, #f8d36a 0%, #f5c242 20%, #e8a84c 100%)',
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.4) inset, 0 0 0 1px rgba(245,194,66,0.3) inset, 0 4px 18px rgba(245,194,66,0.25)',
              }}
            >
              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative z-10 flex items-center gap-1.5">
                Let's Build
                <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <div
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.55), transparent 60%)',
                }}
              />
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md transition-all hover:border-[#f5c242]/30 hover:bg-[#f5c242]/10 lg:hidden"
            >
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative h-[14px] w-[18px]">
                <span
                  className={`absolute left-0 h-px w-full bg-[#f5c242] transition-all duration-300 ${
                    mobileMenuOpen ? 'top-[7px] rotate-45' : 'top-0'
                  }`}
                  style={{ boxShadow: '0 0 6px rgba(245,194,66,0.6)' }}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px w-full bg-[#f5c242] transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ boxShadow: '0 0 6px rgba(245,194,66,0.6)' }}
                />
                <span
                  className={`absolute left-0 h-px bg-[#f5c242] transition-all duration-300 ${
                    mobileMenuOpen ? 'top-[7px] -rotate-45 w-full' : 'top-[13px] w-[12px]'
                  }`}
                  style={{ boxShadow: '0 0 6px rgba(245,194,66,0.6)' }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[90] flex flex-col bg-[#050507] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute left-0 right-0 top-0 h-[120px] bg-gradient-to-b from-[#f5c242]/[0.08] to-transparent" />
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute bottom-0 left-1/2 h-[40%] w-[80%] -translate-x-1/2 rounded-full bg-[#f5c242]/[0.06] blur-[80px]" />
        <div
          className={`flex h-full flex-col px-6 pb-10 pt-[96px] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-8'
          }`}
        >
          <nav className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col">
            {navLinks.map((link, idx) => (
              <div
                key={link.label}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 border-b border-white/[0.06] last:border-0"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdownOpen((p) => !p)}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex w-full items-center justify-between py-6 text-left"
                    >
                      <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 font-display text-[26px] font-[600] leading-none tracking-[-0.02em] text-white">
                        {link.label}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 ${
                          mobileDropdownOpen ? 'rotate-180 border-[#f5c242]/30 bg-[#f5c242]/10' : ''
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke={mobileDropdownOpen ? '#f5c242' : 'white'}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity={mobileDropdownOpen ? 1 : 0.5}
                          />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mobileDropdownOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 overflow-hidden">
                        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid gap-1 rounded-[16px] border border-white/[0.06] bg-white/[0.02] p-2 backdrop-blur-xl">
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-3 rounded-[12px] px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
                            >
                              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-[5px] w-[5px] rounded-full bg-[#f5c242] shadow-[0_0_8px_rgba(245,194,66,0.5)]" />
                              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[15px] font-[500] text-white/80">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group flex w-full items-center justify-between py-6"
                  >
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 font-display text-[26px] font-[600] leading-none tracking-[-0.02em] text-white transition-colors group-hover:text-[#f5c242]">
                      {link.label}
                    </span>
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[13px] tracking-widest text-white/20 group-hover:text-[#f5c242]/60 transition-colors">
                      ↗
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-auto space-y-6 pt-10">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openLeadForm'));
                setMobileMenuOpen(false);
              }}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-[600] text-[#0a0a0b]"
              style={{
                background: 'linear-gradient(180deg, #f8d36a 0%, #f5c242 20%, #e8a84c 100%)',
                boxShadow: '0 0 24px rgba(245,194,66,0.35), 0 1px 0 rgba(255,255,255,0.4) inset',
              }}
            >
              Let's Build <span>→</span>
            </button>
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/25">
              <span>© 2026 Xpherium OS</span>
              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-2">
                <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

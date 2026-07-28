import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LeadFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [country, setCountry] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openLeadForm', handleOpen);
    return () => window.removeEventListener('openLeadForm', handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErrors({});
      setCountry('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    let valid = true;
    const newErrors: Record<string, boolean> = {};
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (typeof data.fullName !== 'string' || data.fullName.trim().length <= 1) { newErrors.fullName = true; valid = false; }
    if (typeof data.companyName !== 'string' || data.companyName.trim().length <= 1) { newErrors.companyName = true; valid = false; }
    if (typeof data.email !== 'string' || !emailPattern.test(data.email.trim())) { newErrors.email = true; valid = false; }
    if (typeof data.country !== 'string' || data.country.trim().length === 0) { newErrors.country = true; valid = false; }
    if (typeof data.role !== 'string' || data.role.trim().length <= 1) { newErrors.role = true; valid = false; }
    if (typeof data.challenges !== 'string' || data.challenges.trim().length <= 5) { newErrors.challenges = true; valid = false; }

    setErrors(newErrors);

    if (!valid) return;

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKjhh_yjEgT-F_fP1IqA9L1Q58RBd3QjR9K-8GEEOF8olESrkJiUC4_TnznNaZVfZ-zA/exec';

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    }).catch((err) => {
      console.error('Submission request failed to send:', err);
    });

    setStatus('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[22px] border border-[rgba(217,164,65,0.35)] p-8 md:p-10 pb-9 relative shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{
              background: 'radial-gradient(120% 100% at 50% 0%, rgba(217,164,65,0.07), transparent 55%), #0d0b08'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-[18px] right-[20px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[rgba(217,164,65,0.28)] bg-transparent text-[18px] leading-none text-[#9a9086] transition-all hover:border-[#d9a441] hover:bg-[rgba(217,164,65,0.08)] hover:text-[#f2c568]"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>

            {status === 'idle' ? (
              <div>
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[26px] pr-[30px]">
                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#d9a441]">Get Started</div>
                  <h2 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 m-0 mb-1.5 text-[20px] md:text-[24px] font-bold text-[#f3ede1]">Build Your Digital Workforce</h2>
                </div>

                <form noValidate onSubmit={handleSubmit}>
                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Full Name<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="John Anderson"
                          required
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] ${errors.fullName ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                        />
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-6 8-6s8 2 8 6"></path></svg>
                        </span>
                      </div>
                      {errors.fullName && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please enter your full name.</div>}
                    </div>

                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Company Name<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Acme Corporation"
                          required
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] ${errors.companyName ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                        />
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                        </span>
                      </div>
                      {errors.companyName && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please enter your company name.</div>}
                    </div>
                  </div>

                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Company Website (Optional)
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <input
                          type="url"
                          name="website"
                          placeholder="https://example.com"
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] border-[rgba(217,164,65,0.28)]`}
                        />
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"></path><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"></path></svg>
                        </span>
                      </div>
                    </div>

                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Work Email<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <input
                          type="email"
                          name="email"
                          placeholder="john@company.com"
                          required
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] ${errors.email ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                        />
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg>
                        </span>
                      </div>
                      {errors.email && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please enter a valid work email.</div>}
                    </div>
                  </div>

                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Country<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <select
                          name="country"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] outline-none transition-all focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] ${country ? 'text-[#f3ede1]' : 'text-[#6d655a]'} ${errors.country ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                        >
                          <option value="" disabled>Select your country</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="India">India</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Other">Other</option>
                        </select>
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </span>
                      </div>
                      {errors.country && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please select your country.</div>}
                    </div>

                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                      <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                        Designation / Role<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                      </label>
                      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                        <input
                          type="text"
                          name="role"
                          placeholder="e.g. CEO, Operations Head, Founder"
                          required
                          className={`w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pl-4 pr-[42px] text-[14px] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] ${errors.role ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                        />
                        <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute right-[14px] top-1/2 flex -translate-y-1/2 text-[#6d655a]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </span>
                      </div>
                      {errors.role && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please enter your role.</div>}
                    </div>
                  </div>

                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-5">
                    <label className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-[9px] block text-[11px] font-bold uppercase tracking-[0.08em] text-[#f3ede1]">
                      What Operational Challenges Is Your Business Currently Facing?<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-1 text-[#d9a441]">*</span>
                    </label>
                    <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                      <textarea
                        name="challenges"
                        placeholder="Tell us about your current workflow, bottlenecks, repetitive tasks, customer service challenges, sales processes, or any operational inefficiencies you'd like to solve."
                        required
                        className={`min-h-[64px] w-full appearance-none rounded-[10px] bg-[#131110] p-[14px] pr-4 text-[14px] leading-[1.5] text-[#f3ede1] outline-none transition-all placeholder:text-[#6d655a] focus:border-[#d9a441] focus:shadow-[0_0_0_3px_rgba(217,164,65,0.14)] resize-y ${errors.challenges ? 'border-[#b5573a]' : 'border-[rgba(217,164,65,0.28)]'}`}
                      ></textarea>
                      <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute bottom-[12px] right-[14px] text-[#6d655a]">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
                      </span>
                    </div>
                    {errors.challenges && <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-1.5 text-[12px] text-[#e08a5c]">Please tell us a bit about your challenges.</div>}
                  </div>

                  <button
                    type="submit"
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group mx-auto mt-2 flex w-[60%] max-w-[320px] items-center justify-center gap-2 rounded-[10px] border border-[#d9a441] bg-gradient-to-b from-[rgba(217,164,65,0.14)] to-[rgba(217,164,65,0.04)] p-[16px] text-[15px] font-bold tracking-[0.02em] text-[#f2c568] transition-all duration-150 hover:-translate-y-[1px] hover:bg-gradient-to-b hover:from-[rgba(217,164,65,0.22)] hover:to-[rgba(217,164,65,0.06)] hover:shadow-[0_10px_30px_rgba(217,164,65,0.2)] active:translate-y-0"
                  >
                    Build My AI Workforce
                    <svg className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-transform duration-150 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-[14px] flex items-center justify-center gap-1.5 text-center text-[12px] text-[#9a9086]">
                    <span>Secure &amp; confidential</span>
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-[3px] w-[3px] rounded-full bg-[#9a9086]"></span>
                    <span>Your information is protected</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-2.5 pb-0 pt-[30px] text-center">
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mx-auto mb-[18px] flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#d9a441] text-[#f2c568]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 m-0 mb-2 text-[20px] font-bold text-[#f3ede1]">Request received.</h3>
                <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 m-0 mb-[22px] leading-[1.5] text-[14px] text-[#9a9086]">
                  Our team will review your submission and reach out within one business day to schedule your strategy conversation.
                </p>
                <button
                  type="button"
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mx-auto flex w-full max-w-[240px] items-center justify-center gap-2 rounded-[10px] border border-[#d9a441] bg-gradient-to-b from-[rgba(217,164,65,0.14)] to-[rgba(217,164,65,0.04)] p-[16px] text-[15px] font-bold tracking-[0.02em] text-[#f2c568] transition-all duration-150 hover:-translate-y-[1px] hover:bg-gradient-to-b hover:from-[rgba(217,164,65,0.22)] hover:to-[rgba(217,164,65,0.06)] hover:shadow-[0_10px_30px_rgba(217,164,65,0.2)] active:translate-y-0"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

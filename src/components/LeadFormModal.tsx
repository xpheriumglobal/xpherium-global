import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LeadFormModalProps {
  isOpen?: boolean;
  onCloseModal?: () => void;
}

export function LeadFormModal({ isOpen: externalIsOpen, onCloseModal }: LeadFormModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setOpenState = (val: boolean) => {
    setInternalIsOpen(val);
    if (!val && onCloseModal) onCloseModal();
  };

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('openLeadForm', handleOpen);
    return () => window.removeEventListener('openLeadForm', handleOpen);
  }, []);

  const onClose = () => setOpenState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErrors({});
      setCountry('');
      setIsSubmitting(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    let valid = true;
    const newErrors: Record<string, boolean> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.fullName || data.fullName.trim().length <= 1) { newErrors.fullName = true; valid = false; }
    if (!data.companyName || data.companyName.trim().length <= 1) { newErrors.companyName = true; valid = false; }
    if (!data.email || !emailPattern.test(data.email.trim())) { newErrors.email = true; valid = false; }
    if (!data.country || data.country.trim().length === 0) { newErrors.country = true; valid = false; }
    if (!data.role || data.role.trim().length <= 1) { newErrors.role = true; valid = false; }
    if (!data.challenges || data.challenges.trim().length <= 5) { newErrors.challenges = true; valid = false; }
    setErrors(newErrors);
    if (!valid) return;

    const payload = {
      ...data,
      source: 'xpheriumglobal.com',
      form: 'xpherium-main-lead-form',
      page: window.location.href,
      submittedAt: new Date().toISOString(),
    };
    console.log('XPHERIUM LEAD - SENDING:', payload);
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKjhh_yjEgT-F_fP1IqA9L1Q58RBd3QjR9K-8GEEOF8olESrkJiUC4_TnznNaZVfZ-zA/exec';
    setIsSubmitting(true);
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).catch((err) => console.error('Submission request failed:', err))
      .finally(() => setIsSubmitting(false));
    setStatus('success');
  };

  // --- STYLES: charcoal black + slight dark gray + gold line, as before ---
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: 9, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f3ede1' };
  const inputBase: React.CSSProperties = { width: '100%', borderRadius: 10, background: '#1a1a1a', padding: 14, paddingLeft: 16, paddingRight: 42, fontSize: 14, color: '#f3ede1', outline: 'none', border: '1px solid rgba(217,164,65,0.30)', boxSizing: 'border-box' };
  const iconStyle: React.CSSProperties = { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#6d655a', display: 'flex', pointerEvents: 'none' };
  const errorStyle: React.CSSProperties = { marginTop: 6, fontSize: 12, color: '#e08a5c' };
  const goldBtn: React.CSSProperties = { width: '60%', maxWidth: 320, margin: '8px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 10, border: '1px solid #d9a441', background: 'linear-gradient(to bottom, rgba(217,164,65,0.14), rgba(217,164,65,0.04))', padding: 16, fontSize: 15, fontWeight: 700, letterSpacing: '0.02em', color: '#f2c568', cursor: 'pointer' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(4px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: 700,
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 22,
              margin: 'auto',
              padding: '32px 40px 36px',
              position: 'relative',
              background: 'radial-gradient(120% 100% at 50% 0%, rgba(217,164,65,0.10), transparent 55%), linear-gradient(180deg, #1c1c1c 0%, #141414 45%, #0e0e0e 100%)',
              border: '1px solid rgba(217,164,65,0.45)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(217,164,65,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{ position: 'absolute', top: 18, right: 20, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(217,164,65,0.35)', background: 'transparent', color: '#9a9086', fontSize: 18, lineHeight: 1, cursor: 'pointer' }}
            >
              &times;
            </button>

            {status === 'idle' ? (
              <div>
                <div style={{ marginBottom: 26, paddingRight: 30 }}>
                  <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#d9a441' }}>Get Started</div>
                  <h2 style={{ margin: 0, marginBottom: 6, fontSize: 24, fontWeight: 700, color: '#f3ede1' }}>Build Your Digital Workforce</h2>
                </div>

                <form noValidate onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Full Name<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input type="text" name="fullName" placeholder="John Anderson" required style={{ ...inputBase, borderColor: errors.fullName ? '#b5573a' : 'rgba(217,164,65,0.30)' }} />
                        <span style={iconStyle}>◯</span>
                      </div>
                      {errors.fullName && <div style={errorStyle}>Please enter your full name.</div>}
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Company Name<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input type="text" name="companyName" placeholder="Acme Corporation" required style={{ ...inputBase, borderColor: errors.companyName ? '#b5573a' : 'rgba(217,164,65,0.30)' }} />
                        <span style={iconStyle}>▢</span>
                      </div>
                      {errors.companyName && <div style={errorStyle}>Please enter your company name.</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Company Website (Optional)</label>
                      <div style={{ position: 'relative' }}>
                        <input type="url" name="website" placeholder="https://example.com" style={inputBase} />
                        <span style={iconStyle}>🔗</span>
                      </div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Work Email<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input type="email" name="email" placeholder="john@company.com" required style={{ ...inputBase, borderColor: errors.email ? '#b5573a' : 'rgba(217,164,65,0.30)' }} />
                        <span style={iconStyle}>✉</span>
                      </div>
                      {errors.email && <div style={errorStyle}>Please enter a valid work email.</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Country<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <select name="country" required value={country} onChange={(e) => setCountry(e.target.value)} style={{ ...inputBase, color: country ? '#f3ede1' : '#6d655a', borderColor: errors.country ? '#b5573a' : 'rgba(217,164,65,0.30)', appearance: 'none' }}>
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
                        <span style={iconStyle}>⌄</span>
                      </div>
                      {errors.country && <div style={errorStyle}>Please select your country.</div>}
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>Designation / Role<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input type="text" name="role" placeholder="e.g. CEO, Operations Head, Founder" required style={{ ...inputBase, borderColor: errors.role ? '#b5573a' : 'rgba(217,164,65,0.30)' }} />
                        <span style={iconStyle}>◉</span>
                      </div>
                      {errors.role && <div style={errorStyle}>Please enter your role.</div>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>What Operational Challenges Is Your Business Currently Facing?<span style={{ marginLeft: 4, color: '#d9a441' }}>*</span></label>
                    <div style={{ position: 'relative' }}>
                      <textarea name="challenges" placeholder="Tell us about your current workflow, bottlenecks, repetitive tasks, customer service challenges, sales processes, or any operational inefficiencies you'd like to solve." required style={{ ...inputBase, minHeight: 64, lineHeight: 1.5, paddingRight: 16, resize: 'vertical', borderColor: errors.challenges ? '#b5573a' : 'rgba(217,164,65,0.30)' }}></textarea>
                    </div>
                    {errors.challenges && <div style={errorStyle}>Please tell us a bit about your challenges.</div>}
                  </div>

                  <button type="submit" disabled={isSubmitting} style={{ ...goldBtn, opacity: isSubmitting ? 0.6 : 1 }}>
                    {isSubmitting ? 'Sending...' : 'Build My AI Workforce →'}
                  </button>

                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', fontSize: 12, color: '#9a9086' }}>
                    <span>Secure &amp; confidential</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#9a9086', display: 'inline-block' }}></span>
                    <span>Your information is protected</span>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ padding: '30px 10px 0', textAlign: 'center' }}>
                <div style={{ margin: '0 auto 18px', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #d9a441', color: '#f2c568', fontSize: 24 }}>✓</div>
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: 20, fontWeight: 700, color: '#f3ede1' }}>Request received.</h3>
                <p style={{ margin: 0, marginBottom: 22, lineHeight: 1.5, fontSize: 14, color: '#9a9086' }}>
                  Our team will review your submission and reach out within one business day to schedule your strategy conversation.
                </p>
                <button type="button" onClick={onClose} style={{ ...goldBtn, width: '100%', maxWidth: 240 }}>
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

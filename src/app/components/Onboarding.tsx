// 5-step info carousel + sign-up form onboarding
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye, EyeOff, MapPin, TrendingDown, Heart, Globe, Moon,
  ChevronRight, ChevronLeft, Sparkles, Shield, Zap,
} from 'lucide-react';
import { Button } from './ui/button';
import { signUpWithPhone, signInWithPhone, signInWithGoogle, signInWithApple } from '../services/auth';

const ONBOARDING_KEY = 'ridechecka_onboarding_complete';
const TOTAL_STEPS = 6; // 5 info + 1 sign-up

// ── Info screen data ──────────────────────────────────────────────
const INFO_SCREENS = [
  {
    icon: MapPin,
    emoji: '🗺️',
    accent: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    title: 'Compare Ride Prices',
    subtitle: 'All your options, one screen',
    description:
      'Instantly compare fares from 16 ride-hailing services — Uber, Bolt, inDriver, Yango, and 12 more — so you always pick the best deal.',
    highlight: '16 services compared',
  },
  {
    icon: TrendingDown,
    emoji: '💰',
    accent: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    title: 'Save Money Every Trip',
    subtitle: 'Your wallet will thank you',
    description:
      'Our users save up to 40 % per ride by choosing the cheapest available option. Surge alerts warn you before prices spike.',
    highlight: 'Save up to 40 %',
  },
  {
    icon: Heart,
    emoji: '⭐',
    accent: 'from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    title: 'Save Favourite Routes',
    subtitle: 'One tap, every morning',
    description:
      'Bookmark the routes you use daily — home to office, school runs, airport trips — and re-check fares with a single tap.',
    highlight: 'Bookmark & re-check',
  },
  {
    icon: Globe,
    emoji: '🌍',
    accent: 'from-sky-500/20 to-indigo-500/20 dark:from-sky-500/10 dark:to-indigo-500/10',
    iconColor: 'text-sky-600 dark:text-sky-400',
    title: 'Your Language, Your Way',
    subtitle: 'Yorùbá · Hausa · Igbo · English',
    description:
      'Switch the entire app to your preferred Nigerian language. More languages coming soon — just tell us what you need!',
    highlight: '4 languages supported',
  },
  {
    icon: Moon,
    emoji: '🌙',
    accent: 'from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
    title: 'Dark Mode & Offline',
    subtitle: 'Works everywhere',
    description:
      'Easy on the eyes at night with automatic dark mode. Recent results are cached so you can view them even without data.',
    highlight: 'Works offline',
  },
];

// ── Component ─────────────────────────────────────────────────────
interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  // Auth form state
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── navigation ────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    onComplete();
  }, [onComplete]);

  // ── auth logic ────────────────────────────────────────────────
  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (authMode === 'signup' && !fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^(\+?234|0)[0-9]{10}$/.test(phone.replace(/\s/g, '')))
      errs.phone = 'Enter a valid Nigerian phone number';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'At least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [authMode, fullName, phone, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      try {
        if (authMode === 'signin') {
          await signInWithPhone(phone.trim(), password);
        } else {
          await signUpWithPhone(fullName.trim(), phone.trim(), password);
        }
      } catch (err: any) {
        if (authMode === 'signin') {
          setErrors({ password: err?.message || 'Invalid credentials' });
          return;
        }
        try {
          localStorage.setItem(
            'ridechecka_user',
            JSON.stringify({ fullName: fullName.trim(), phone: phone.trim() }),
          );
        } catch {}
      }
      localStorage.setItem(ONBOARDING_KEY, 'true');
      onComplete();
    },
    [authMode, fullName, phone, password, validate, onComplete],
  );

  const handleSocial = useCallback(
    async (provider: 'google' | 'apple') => {
      try {
        if (provider === 'google') await signInWithGoogle();
        else await signInWithApple();
      } catch (err: any) {
        // Silent fallback — social auth failed
      }
      localStorage.setItem(ONBOARDING_KEY, 'true');
      onComplete();
    },
    [onComplete],
  );

  // ── slide variants ────────────────────────────────────────────
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  };

  const isInfoStep = step < 5;

  // ── render ────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-white dark:bg-black flex flex-col"
    >
      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= step
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-gray-200 dark:bg-gray-800'
            }`}
          />
        ))}
      </div>

      {/* Skip / Back header */}
      <div className="flex items-center justify-between px-6 py-2">
        {step > 0 ? (
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={handleSkip}
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto px-6">
        <AnimatePresence mode="wait" custom={direction}>
          {isInfoStep ? (
            <InfoSlide
              key={`info-${step}`}
              screen={INFO_SCREENS[step]}
              direction={direction}
              variants={slideVariants}
            />
          ) : (
            <SignUpSlide
              key="signup"
              direction={direction}
              variants={slideVariants}
              authMode={authMode}
              setAuthMode={setAuthMode}
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              showPw={showPw}
              setShowPw={setShowPw}
              errors={errors}
              handleSubmit={handleSubmit}
              handleSocial={handleSocial}
              handleSkip={handleSkip}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: dots + Next (info screens only) */}
      {isInfoStep && (
        <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-5">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {INFO_SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > step ? 1 : -1);
                  setStep(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === step
                    ? 'w-6 h-2 bg-gray-900 dark:bg-white'
                    : 'w-2 h-2 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Continue / Get Started button */}
          <Button
            onClick={goNext}
            className="w-full max-w-sm bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            {step === 4 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ── Info slide sub-component ──────────────────────────────────────
function InfoSlide({
  screen,
  direction,
  variants,
}: {
  screen: (typeof INFO_SCREENS)[number];
  direction: number;
  variants: any;
}) {
  const Icon = screen.icon;

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-sm mx-auto flex flex-col items-center text-center"
    >
      {/* Illustration area */}
      <div
        className={`relative w-36 h-36 rounded-3xl bg-gradient-to-br ${screen.accent} flex items-center justify-center mb-8`}
      >
        {/* Decorative sparkles */}
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-gray-300 dark:text-gray-600" />
        <Zap className="absolute -bottom-1 -left-1 w-4 h-4 text-gray-300 dark:text-gray-600 rotate-12" />
        <Shield className="absolute top-1 -left-3 w-3.5 h-3.5 text-gray-200 dark:text-gray-700" />

        {/* Big emoji */}
        <span className="text-5xl select-none" role="img">
          {screen.emoji}
        </span>

        {/* Icon badge */}
        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-800">
          <Icon className={`w-5 h-5 ${screen.iconColor}`} />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5 leading-tight">
        {screen.title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        {screen.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mb-5">
        {screen.description}
      </p>

      {/* Highlight chip */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800/80 px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
        <Sparkles className="w-3 h-3" />
        {screen.highlight}
      </span>
    </motion.div>
  );
}

// ── Sign-up slide sub-component ───────────────────────────────────
function SignUpSlide({
  direction,
  variants,
  authMode,
  setAuthMode,
  fullName,
  setFullName,
  phone,
  setPhone,
  password,
  setPassword,
  showPw,
  setShowPw,
  errors,
  handleSubmit,
  handleSocial,
  handleSkip,
}: {
  direction: number;
  variants: any;
  authMode: 'signup' | 'signin';
  setAuthMode: (v: 'signup' | 'signin') => void;
  fullName: string;
  setFullName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPw: boolean;
  setShowPw: (v: boolean) => void;
  errors: Record<string, string>;
  handleSubmit: (e: React.FormEvent) => void;
  handleSocial: (provider: 'google' | 'apple') => void;
  handleSkip: () => void;
}) {
  const inputCls =
    'w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors ' +
    'bg-white dark:bg-gray-900 text-gray-900 dark:text-white ' +
    'border-gray-300 dark:border-gray-700 focus:border-gray-900 dark:focus:border-gray-400 ' +
    'placeholder:text-gray-400 dark:placeholder:text-gray-500';

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {authMode === 'signin' ? 'Sign in to access your data' : 'Sign up to unlock all features'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-5">
        {/* Full Name — only for sign-up */}
        {authMode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Firstname Lastname"
              className={inputCls}
              autoComplete="name"
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>
        )}

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 08012345678"
            className={inputCls}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className={inputCls + ' pr-10'}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-medium"
        >
          {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      {/* Toggle between sign-in / sign-up */}
      <button
        type="button"
        onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-5 transition-colors"
      >
        {authMode === 'signin'
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400 dark:text-gray-500">or continue with</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Social buttons */}
      <div className="flex gap-3 mb-5">
        <button
          type="button"
          onClick={() => handleSocial('google')}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.17-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.05-3.72 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1a7.12 7.12 0 0 1 0-4.2V7.06H2.18A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.76.01-.54z" />
            <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.06l3.66 2.84c.87-2.6 3.3-4.15 6.16-4.15z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocial('apple')}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple
        </button>
      </div>

      {/* Skip link */}
      <button
        type="button"
        onClick={handleSkip}
        className="w-full text-center text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2"
      >
        Skip for now
      </button>
    </motion.div>
  );
}

export function shouldShowOnboarding(): boolean {
  try {
    return !localStorage.getItem(ONBOARDING_KEY);
  } catch {
    return false;
  }
}

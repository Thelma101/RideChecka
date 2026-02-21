// Brand Guidelines — Ridechecka Visual Identity System
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-100 dark:border-gray-800" style={{ fontSize: '18px', fontWeight: 700 }}>{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-gray-800 dark:text-gray-200 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{children}</p>;
}

function ColorSwatch({ name, hex, usage, dark }: { name: string; hex: string; usage: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div
        className="w-12 h-12 rounded-xl flex-shrink-0 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: hex }}
      />
      <div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>{name}</p>
          <code className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-400">{hex}</code>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">{usage}</p>
      </div>
    </div>
  );
}

export function BrandPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 safe-area-top">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/docs')} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 active:scale-95 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Brand Guidelines</h1>
            <p className="text-[11px] text-gray-400">Visual Identity System v1.0</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 py-6 max-w-2xl mx-auto">
        <Section title="1. Brand Identity">
          <SubSection title="Brand Name">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 mb-4 text-center border border-green-100 dark:border-green-800/30">
              <p className="text-green-800 dark:text-green-300 text-3xl mb-2" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                RIDECHECKA
              </p>
              <p className="text-green-600/60 dark:text-green-400/60 text-xs">Always written as one word, title case or uppercase</p>
            </div>
            <P>The name "Ridechecka" combines "Ride" (transportation) with "Checka" (Nigerian pidgin English for "check" / "verify"). This creates a memorable, locally authentic brand that immediately communicates the product's purpose.</P>
          </SubSection>

          <SubSection title="Logo">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🚗</span>
                </div>
                <p className="text-[10px] text-gray-500">Primary Logo</p>
                <p className="text-[10px] text-gray-400">Light background</p>
              </div>
              <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-700">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🚗</span>
                </div>
                <p className="text-[10px] text-gray-400">Primary Logo</p>
                <p className="text-[10px] text-gray-500">Dark background</p>
              </div>
            </div>
            <P>The app icon features a car emoji on a green-600 background with 2xl border radius. In production, replace with a custom vector logo maintaining the green background and rounded-square shape familiar to mobile users.</P>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2" style={{ fontWeight: 600 }}>Logo Minimum Clear Space</p>
              <P>Maintain clear space equal to the height of the "R" in Ridechecka on all sides. Minimum display size: 32x32px for icons, 120x120px for splash.</P>
            </div>
          </SubSection>

          <SubSection title="Tagline">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4 text-center">
              <p className="text-gray-900 dark:text-white text-lg italic" style={{ fontWeight: 500 }}>
                "Compare. Save. Ride Smart."
              </p>
            </div>
            <P>Three words. Three actions. Clear value proposition. Always formatted with periods, title case.</P>
          </SubSection>
        </Section>

        <Section title="2. Color Palette">
          <SubSection title="Primary Colors">
            <ColorSwatch name="Green 600 (Primary)" hex="#16a34a" usage="CTA buttons, active nav, brand identity, headers" />
            <ColorSwatch name="Green 700 (Hover)" hex="#15803d" usage="Button hover state, gradient endpoints" />
            <ColorSwatch name="Emerald 700" hex="#047857" usage="Gradient accents, secondary brand color" />
          </SubSection>

          <SubSection title="Neutral Colors — Light Mode">
            <ColorSwatch name="White" hex="#ffffff" usage="Page backgrounds, card backgrounds" />
            <ColorSwatch name="Gray 50" hex="#f9fafb" usage="Section backgrounds, input backgrounds" />
            <ColorSwatch name="Gray 100" hex="#f3f4f6" usage="Borders, dividers, inactive elements" />
            <ColorSwatch name="Gray 500" hex="#6b7280" usage="Secondary text, labels, descriptions" />
            <ColorSwatch name="Gray 900" hex="#111827" usage="Primary text, headings" />
          </SubSection>

          <SubSection title="Neutral Colors — Dark Mode (OLED)">
            <ColorSwatch name="True Black" hex="#000000" usage="Page background (OLED optimized)" />
            <ColorSwatch name="Gray 900" hex="#111111" usage="Card backgrounds, elevated surfaces" />
            <ColorSwatch name="Gray 800" hex="#1f1f1f" usage="Borders, input backgrounds" />
            <ColorSwatch name="Gray 500" hex="#6b7280" usage="Secondary text" />
            <ColorSwatch name="Gray 100" hex="#f5f5f5" usage="Primary text, headings" />
          </SubSection>

          <SubSection title="Semantic Colors">
            <ColorSwatch name="Red 500" hex="#ef4444" usage="Errors, destructive actions, surge pricing" />
            <ColorSwatch name="Orange 500" hex="#f97316" usage="Warnings, offline state, surge indicators" />
            <ColorSwatch name="Blue 600" hex="#2563eb" usage="Information, fastest badge, analytics" />
            <ColorSwatch name="Amber 500" hex="#f59e0b" usage="Stars, premium features, highlights" />
            <ColorSwatch name="Purple 600" hex="#9333ea" usage="Language settings, special features" />
          </SubSection>

          <SubSection title="Service Brand Colors">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { name: 'Uber', hex: '#000000' },
                { name: 'Bolt', hex: '#34D186' },
                { name: 'inDriver', hex: '#FF6B35' },
                { name: 'Gokada', hex: '#00C853' },
                { name: 'MAX', hex: '#1976D2' },
                { name: 'SafeBoda', hex: '#E91E63' },
                { name: 'LagRide', hex: '#00BCD4' },
                { name: 'Rida', hex: '#FF5722' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: s.hex }} />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{s.name}</span>
                  <code className="text-[9px] text-gray-400 ml-auto">{s.hex}</code>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        <Section title="3. Typography">
          <SubSection title="Font Family">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-gray-900 dark:text-white text-lg mb-2" style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 700 }}>
                Inter
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Primary: Inter | Fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
              </p>
            </div>
            <P>Inter is chosen for its excellent readability at small sizes, robust multi-weight support, and native feel on both iOS and Android. The -apple-system fallback ensures system font matching on Apple devices.</P>
          </SubSection>

          <SubSection title="Type Scale">
            <div className="space-y-3 mb-4">
              {[
                { size: '24px', weight: 700, label: 'H1 — Page titles, splash screen', sample: 'Ridechecka' },
                { size: '22px', weight: 700, label: 'H2 — Section headers', sample: 'Favorites' },
                { size: '18px', weight: 700, label: 'H3 — Price display, feature headers', sample: '₦2,500' },
                { size: '16px', weight: 600, label: 'H4 — Sticky header titles, buttons', sample: 'Compare Prices' },
                { size: '15px', weight: 600, label: 'Body Strong — Card titles, settings labels', sample: 'Uber — Economy' },
                { size: '14px', weight: 400, label: 'Body — Descriptions, content text', sample: 'Enter your pickup location' },
                { size: '12px', weight: 400, label: 'Caption — Labels, timestamps, meta info', sample: 'Last searched 2h ago' },
                { size: '11px', weight: 500, label: 'Small — Badges, subtle labels', sample: 'CHEAPEST' },
                { size: '10px', weight: 400, label: 'Micro — Feature tags, currency symbols', sample: '₦ · AC · WiFi' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-16 flex-shrink-0">
                    <code className="text-[10px] text-gray-400 dark:text-gray-500">{item.size}/{item.weight}</code>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white" style={{ fontSize: item.size, fontWeight: item.weight }}>
                      {item.sample}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        <Section title="4. Iconography">
          <P>Icons are sourced from the Lucide React library (lucide.dev). All icons use consistent styling:</P>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
              <li>• Standard size: 20x20px (w-5 h-5) for content, 16x16px (w-4 h-4) for inline</li>
              <li>• Stroke width: 1.8 (default), 2.5 (active/selected state)</li>
              <li>• Navigation icons: 20x20px with spring-animated indicator background</li>
              <li>• Service emojis: Used as placeholders. Replace with SVG logos in production</li>
              <li>• Color: Inherits from text color. Active state uses brand green</li>
            </ul>
          </div>
        </Section>

        <Section title="5. Component Styling">
          <SubSection title="Cards">
            <P>Cards are the primary content container. Styling follows Material Design 3 principles adapted for mobile:</P>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Border radius: 12px (rounded-xl)</li>
                <li>• Border: none (border-0)</li>
                <li>• Shadow: shadow-sm (light), shadow-black/20 (dark)</li>
                <li>• Padding: 16px (p-4)</li>
                <li>• Active state: scale(0.99) for tactile feedback</li>
                <li>• Dark mode: bg-gray-900</li>
              </ul>
            </div>
          </SubSection>

          <SubSection title="Buttons">
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3">
                <button className="bg-green-600 text-white px-4 py-2.5 rounded-xl text-xs" style={{ fontWeight: 600 }}>Primary CTA</button>
                <span className="text-[10px] text-gray-400">green-600, rounded-xl, py-6 for main</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl text-xs" style={{ fontWeight: 600 }}>Secondary</button>
                <span className="text-[10px] text-gray-400">gray-100/800, outline variant</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-red-500 bg-red-50 dark:bg-red-900/30 px-3 py-1.5 rounded-full text-xs" style={{ fontWeight: 500 }}>Destructive</button>
                <span className="text-[10px] text-gray-400">Red tint, rounded-full, small</span>
              </div>
            </div>
          </SubSection>

          <SubSection title="Bottom Navigation">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 4 tabs: Home, Favorites, History, Profile</li>
                <li>• Active indicator: Pill-shaped, spring-animated (layoutId)</li>
                <li>• Active color: green-600 (light) / green-400 (dark)</li>
                <li>• Inactive color: gray-400 (light) / gray-500 (dark)</li>
                <li>• Label: 10px, weight 600 when active, 400 when inactive</li>
                <li>• Haptic: 5ms vibration on tap</li>
                <li>• Background: glass morphism (backdrop-blur-xl, 95% opacity)</li>
              </ul>
            </div>
          </SubSection>
        </Section>

        <Section title="6. Voice & Tone">
          <SubSection title="Brand Voice Attributes">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { attribute: 'Helpful', desc: 'Always guiding toward savings' },
                { attribute: 'Confident', desc: 'We know the best prices' },
                { attribute: 'Local', desc: 'Nigerian context first' },
                { attribute: 'Simple', desc: 'No jargon, clear language' },
                { attribute: 'Trustworthy', desc: 'Independent, unbiased' },
                { attribute: 'Friendly', desc: 'Not corporate, approachable' },
              ].map((item) => (
                <div key={item.attribute} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>{item.attribute}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="Writing Examples">
            <div className="space-y-3 mb-4">
              {[
                { context: 'Empty state', do: 'No favorites yet — save your frequent routes for quick access', dont: 'Error: No data found in favorites collection' },
                { context: 'Error message', do: 'Couldn\'t fetch prices. Let\'s try again.', dont: 'Error 500: Service temporarily unavailable. Please retry later.' },
                { context: 'Success toast', do: 'Favorite route loaded ✓', dont: 'Your selected favorite has been successfully applied to the search fields' },
                { context: 'Offline state', do: 'You\'re offline — using cached data', dont: 'Network connection lost. Application operating in degraded mode.' },
                { context: 'Pro tip', do: 'Compare prices before peak hours (7-9am) to find the best deals', dont: 'Research suggests that pre-rush-hour booking may yield optimal pricing outcomes' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{item.context}</p>
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-green-500 text-xs mt-0.5">✓</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{item.do}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-xs mt-0.5">✗</span>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-through">{item.dont}</p>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        <Section title="7. Animation Guidelines">
          <P>All animations use Motion (formerly Framer Motion). Consistency is key:</P>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
              <li>• Page transitions: opacity 0→1, y: 6px→0, duration 0.2s, ease [0.25, 0.1, 0.25, 1]</li>
              <li>• Card stagger: delay 0.04-0.08s per item, y: 15px→0</li>
              <li>• Theme switch: 300ms ease on background-color, color, border-color</li>
              <li>• Nav indicator: spring (stiffness: 400, damping: 30)</li>
              <li>• Pull-to-refresh: linear rotation for spinner, resistance physics on pull</li>
              <li>• Splash screen: exit opacity 0, scale 1.1, 0.4s ease-in-out</li>
              <li>• Respect prefers-reduced-motion: all transitions set to 0s</li>
            </ul>
          </div>
        </Section>

        <Section title="8. Accessibility Standards">
          <P>Ridechecka follows WCAG 2.1 Level AA:</P>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
              <li>• Color contrast: 4.5:1 minimum for text, 3:1 for large text and UI components</li>
              <li>• Touch targets: Minimum 44x44px (iOS HIG), 48x48px recommended (Material)</li>
              <li>• Focus indicators: Default ring-offset focus styles from Tailwind</li>
              <li>• Screen readers: Semantic HTML (nav, main, button, label)</li>
              <li>• Motion: prefers-reduced-motion media query disables all transitions</li>
              <li>• High contrast: @media (prefers-contrast: high) increases border and text contrast</li>
              <li>• Font sizing: 16px minimum for inputs (prevents iOS zoom)</li>
            </ul>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">Ridechecka Brand Guidelines v1.0 — Confidential</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-700 mt-1">Last updated: February 20, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}

// Side-by-side comparison of two ride services
import { useState, useMemo } from 'react';
import { PriceEstimate } from '../types';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from './ui/drawer';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowRightLeft, TrendingDown, Clock, Shield, Zap, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface CompareServicesProps {
  estimates: PriceEstimate[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CompareServices({ estimates, open, onOpenChange }: CompareServicesProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [serviceA, setServiceA] = useState<string>('');
  const [serviceB, setServiceB] = useState<string>('');

  const estA = useMemo(() => estimates.find((e) => e.serviceId === serviceA), [estimates, serviceA]);
  const estB = useMemo(() => estimates.find((e) => e.serviceId === serviceB), [estimates, serviceB]);

  const bothSelected = !!estA && !!estB;

  // Parse time string to minutes
  const parseTime = (t: string) => {
    const m = t.match(/(\d+)/);
    return m ? parseInt(m[1]) : 0;
  };

  // Determine winner for a numeric field (lower is better)
  const winner = (a: number, b: number): 'a' | 'b' | 'tie' => {
    if (a < b) return 'a';
    if (b < a) return 'b';
    return 'tie';
  };

  // Compute savings
  const savings = bothSelected ? Math.abs(estA!.price - estB!.price) : 0;
  const savingsPercent = bothSelected
    ? Math.round((savings / Math.max(estA!.price, estB!.price)) * 100)
    : 0;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={`max-h-[90vh] ${isDark ? 'bg-gray-900 border-gray-800' : ''}`}>
        <DrawerHeader>
          <DrawerTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : ''}`}>
            <ArrowRightLeft className="w-5 h-5" />
            Compare Services
          </DrawerTitle>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Pick two services to see how they stack up
          </p>
        </DrawerHeader>

        <div className="px-5 py-4 space-y-5 overflow-y-auto max-h-[65vh]">
          {/* Service pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Service A
              </label>
              <Select value={serviceA} onValueChange={setServiceA}>
                <SelectTrigger className={`rounded-xl h-11 ${isDark ? 'border-gray-700 bg-gray-800' : ''}`}>
                  <SelectValue placeholder="Choose..." />
                </SelectTrigger>
                <SelectContent>
                  {estimates.map((e) => (
                    <SelectItem key={e.serviceId} value={e.serviceId} disabled={e.serviceId === serviceB}>
                      {e.serviceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Service B
              </label>
              <Select value={serviceB} onValueChange={setServiceB}>
                <SelectTrigger className={`rounded-xl h-11 ${isDark ? 'border-gray-700 bg-gray-800' : ''}`}>
                  <SelectValue placeholder="Choose..." />
                </SelectTrigger>
                <SelectContent>
                  {estimates.map((e) => (
                    <SelectItem key={e.serviceId} value={e.serviceId} disabled={e.serviceId === serviceA}>
                      {e.serviceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison table */}
          {bothSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* Savings banner */}
              {savings > 0 && (
                <div className={`rounded-xl p-3.5 text-center ${
                  isDark ? 'bg-green-900/30 border border-green-800/50' : 'bg-green-50 border border-green-200'
                }`}>
                  <p className={`text-xs font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    You save ₦{savings.toLocaleString()} ({savingsPercent}%) with{' '}
                    <span className="font-bold">
                      {estA!.price < estB!.price ? estA!.serviceName : estB!.serviceName}
                    </span>
                  </p>
                </div>
              )}

              {/* Service headers */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                <ServiceBadge est={estA!} isDark={isDark} />
                <span className={`text-xs font-medium ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>VS</span>
                <ServiceBadge est={estB!} isDark={isDark} />
              </div>

              {/* Comparison rows */}
              <div className={`rounded-xl border divide-y ${
                isDark ? 'border-gray-800 divide-gray-800 bg-gray-900/50' : 'border-gray-200 divide-gray-100 bg-white'
              }`}>
                <CompareRow
                  label="Price"
                  icon={<TrendingDown className="w-3.5 h-3.5" />}
                  valueA={`₦${estA!.price.toLocaleString()}`}
                  valueB={`₦${estB!.price.toLocaleString()}`}
                  winner={winner(estA!.price, estB!.price)}
                  isDark={isDark}
                />
                <CompareRow
                  label="Price Range"
                  icon={<TrendingDown className="w-3.5 h-3.5" />}
                  valueA={`₦${estA!.priceLow.toLocaleString()} – ₦${estA!.priceHigh.toLocaleString()}`}
                  valueB={`₦${estB!.priceLow.toLocaleString()} – ₦${estB!.priceHigh.toLocaleString()}`}
                  winner={winner(estA!.priceLow, estB!.priceLow)}
                  isDark={isDark}
                />
                <CompareRow
                  label="ETA"
                  icon={<Clock className="w-3.5 h-3.5" />}
                  valueA={estA!.estimatedTime}
                  valueB={estB!.estimatedTime}
                  winner={winner(parseTime(estA!.estimatedTime), parseTime(estB!.estimatedTime))}
                  isDark={isDark}
                />
                <CompareRow
                  label="Confidence"
                  icon={<Shield className="w-3.5 h-3.5" />}
                  valueA={`${estA!.confidence}%`}
                  valueB={`${estB!.confidence}%`}
                  winner={winner(-estA!.confidence, -estB!.confidence)}
                  isDark={isDark}
                />
                <CompareRow
                  label="Vehicle"
                  icon={<Zap className="w-3.5 h-3.5" />}
                  valueA={estA!.vehicleType}
                  valueB={estB!.vehicleType}
                  winner="tie"
                  isDark={isDark}
                />
                <CompareRow
                  label="Surge"
                  icon={<Star className="w-3.5 h-3.5" />}
                  valueA={estA!.surge ? `${estA!.surge}×` : 'None'}
                  valueB={estB!.surge ? `${estB!.surge}×` : 'None'}
                  winner={winner(estA!.surge || 1, estB!.surge || 1)}
                  isDark={isDark}
                />
                <CompareRow
                  label="Reports"
                  icon={<Star className="w-3.5 h-3.5" />}
                  valueA={`${estA!.reportCount}`}
                  valueB={`${estB!.reportCount}`}
                  winner={winner(-estA!.reportCount, -estB!.reportCount)}
                  isDark={isDark}
                />
              </div>

              {/* Features comparison */}
              {(estA!.features?.length || estB!.features?.length) ? (
                <div className={`rounded-xl border p-3.5 ${isDark ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
                  <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Features</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      {estA!.features?.map((f) => (
                        <span key={f} className={`block text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          • {f}
                        </span>
                      )) || <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>—</span>}
                    </div>
                    <div className="space-y-1">
                      {estB!.features?.map((f) => (
                        <span key={f} className={`block text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          • {f}
                        </span>
                      )) || <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>—</span>}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Deep link buttons */}
              <div className="grid grid-cols-2 gap-3">
                {estA!.deepLink && (
                  <a
                    href={estA!.deepLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium border transition-colors ${
                      isDark
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open {estA!.serviceName}
                  </a>
                )}
                {estB!.deepLink && (
                  <a
                    href={estB!.deepLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium border transition-colors ${
                      isDark
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open {estB!.serviceName}
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {!bothSelected && (
            <div className={`rounded-xl border-2 border-dashed p-8 text-center ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <ArrowRightLeft className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Select two services above to compare them side by side
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={`rounded-xl ${isDark ? 'border-gray-700' : ''}`}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// ── Service badge ────────────────────────────────────────────────
function ServiceBadge({ est, isDark }: { est: PriceEstimate; isDark: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
      isDark ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={{ backgroundColor: est.color }}
      >
        {est.serviceName.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {est.serviceName}
        </p>
        <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {est.vehicleType}
        </p>
      </div>
    </div>
  );
}

// ── Comparison row ───────────────────────────────────────────────
function CompareRow({
  label,
  icon,
  valueA,
  valueB,
  winner: w,
  isDark,
}: {
  label: string;
  icon: React.ReactNode;
  valueA: string;
  valueB: string;
  winner: 'a' | 'b' | 'tie';
  isDark: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 px-3.5 py-2.5 items-center">
      <span
        className={`text-xs font-medium text-right ${
          w === 'a'
            ? 'text-green-600 dark:text-green-400'
            : isDark
            ? 'text-gray-300'
            : 'text-gray-700'
        }`}
      >
        {valueA}
        {w === 'a' && ' ✓'}
      </span>
      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
        {icon}
        <span className="text-[10px] font-medium whitespace-nowrap">{label}</span>
      </div>
      <span
        className={`text-xs font-medium ${
          w === 'b'
            ? 'text-green-600 dark:text-green-400'
            : isDark
            ? 'text-gray-300'
            : 'text-gray-700'
        }`}
      >
        {valueB}
        {w === 'b' && ' ✓'}
      </span>
    </div>
  );
}

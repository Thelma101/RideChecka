// Data Transparency — explains how price estimates work + shows data freshness
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ShieldCheck, BarChart3, Users, AlertTriangle, ChevronDown, ChevronUp, Wifi, WifiOff, Clock } from 'lucide-react';

interface DataTransparencyProps {
  /** Number of services shown */
  serviceCount: number;
  /** Average confidence across displayed estimates */
  avgConfidence: number;
  /** Total user reports backing these routes */
  totalReports: number;
  /** Whether remote fare overrides are active */
  isOnline: boolean;
}

export function DataTransparencyBanner({
  serviceCount,
  avgConfidence,
  totalReports,
  isOnline,
}: DataTransparencyProps) {
  const [expanded, setExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const confidenceColor =
    avgConfidence >= 70
      ? 'text-green-500'
      : avgConfidence >= 45
        ? 'text-yellow-500'
        : 'text-orange-500';

  const confidenceLabel =
    avgConfidence >= 70
      ? 'High'
      : avgConfidence >= 45
        ? 'Medium'
        : 'Low';

  return (
    <div
      className={`rounded-xl border overflow-hidden mb-3 ${
        isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200'
      }`}
    >
      {/* Collapsed summary bar */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
          isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
        }`}
      >
        <ShieldCheck className={`w-3.5 h-3.5 flex-shrink-0 ${confidenceColor}`} />
        <span className={`text-[11px] flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className={`font-semibold ${confidenceColor}`}>{confidenceLabel} confidence</span>
          {' · '}{serviceCount} services
          {totalReports > 0 && <> · {totalReports} user report{totalReports !== 1 ? 's' : ''}</>}
          {' · '}
          <span className="inline-flex items-center gap-0.5">
            {isOnline ? (
              <><Wifi className="w-3 h-3 inline" /> Live</>
            ) : (
              <><WifiOff className="w-3 h-3 inline" /> Cached</>
            )}
          </span>
        </span>
        {expanded ? (
          <ChevronUp className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        ) : (
          <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        )}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className={`px-3 pb-3 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="pt-3 space-y-3">
            {/* How it works */}
            <div className="flex items-start gap-2.5">
              <BarChart3 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  How we estimate prices
                </p>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Prices are calculated using publicly researched fare structures (base fare + per-km + per-minute) 
                  for each service. We apply city-specific adjustments and real-time surge detection.
                </p>
              </div>
            </div>

            {/* Data honesty */}
            <div className="flex items-start gap-2.5">
              <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-yellow-600' : 'text-yellow-500'}`} />
              <div>
                <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Important disclaimer
                </p>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Most ride services don't provide public pricing APIs. Actual fares may differ due 
                  to surge pricing, driver bids (inDriver), promos, or route changes. Price ranges show 
                  the expected variance. Always confirm the final price in the ride app.
                </p>
              </div>
            </div>

            {/* Crowdsourced */}
            <div className="flex items-start gap-2.5">
              <Users className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Help us improve
                </p>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  After booking a ride, tap "Report fare" to tell us what you actually paid. 
                  More reports = more accurate estimates for everyone.
                  {totalReports > 0 && ` So far, ${totalReports} reports help calibrate these results.`}
                </p>
              </div>
            </div>

            {/* Data freshness */}
            <div className="flex items-start gap-2.5">
              <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <div>
                <p className={`text-xs font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Data freshness
                </p>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Fare models are calibrated from public rate cards and updated regularly. 
                  Each card shows a confidence level — green means well-verified, 
                  yellow means limited data, orange means rough estimate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

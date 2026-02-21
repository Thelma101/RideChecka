// Price card — clean monochrome design with price ranges + confidence
import { PriceEstimate } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, TrendingUp, Tag, ExternalLink, Star, ShieldCheck, Info } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PriceCardProps {
  estimate: PriceEstimate;
  isCheapest?: boolean;
  isFastest?: boolean;
  onReportFare?: (estimate: PriceEstimate) => void;
}

function getServiceRating(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  return 3.5 + (Math.abs(hash) % 16) / 10;
}

/** Confidence level label + color */
function getConfidenceInfo(confidence: number): { label: string; colorClass: string; dotColor: string } {
  if (confidence >= 70) return { label: 'High confidence', colorClass: 'text-green-500', dotColor: 'bg-green-500' };
  if (confidence >= 45) return { label: 'Medium confidence', colorClass: 'text-yellow-500', dotColor: 'bg-yellow-500' };
  return { label: 'Low confidence', colorClass: 'text-orange-500', dotColor: 'bg-orange-500' };
}

export function PriceCard({ estimate, isCheapest, isFastest, onReportFare }: PriceCardProps) {
  const finalPrice = estimate.discount
    ? estimate.price - estimate.discount
    : estimate.price;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const rating = getServiceRating(estimate.serviceId);
  const confidenceInfo = getConfidenceInfo(estimate.confidence);

  const handleBook = () => {
    const url = estimate.deepLink || estimate.webUrl || estimate.playStore || '#';
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener');
    }
  };

  return (
    <Card className={`overflow-hidden rounded-lg border transition-colors ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } ${isCheapest ? (isDark ? 'border-green-800' : 'border-green-300') : ''}`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`text-xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              {estimate.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <h3 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>{estimate.serviceName}</h3>
                {isCheapest && (
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 rounded ${
                    isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    Cheapest
                  </Badge>
                )}
                {isFastest && !isCheapest && (
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 rounded ${
                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    Fastest
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{estimate.vehicleType}</p>
                <span className={`text-[10px] ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>·</span>
                <div className="flex items-center gap-0.5">
                  <Star className={`w-3 h-3 ${isDark ? 'fill-gray-400 text-gray-400' : 'fill-gray-400 text-gray-400'}`} />
                  <span className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{rating.toFixed(1)}</span>
                </div>
              </div>
              {estimate.features && estimate.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {estimate.features.slice(0, 3).map((feature) => (
                    <span key={feature} className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            {/* Price range display */}
            <div className="flex items-baseline gap-0.5">
              <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>₦</span>
              <span className={isDark ? 'text-white' : 'text-gray-900'} style={{ fontSize: '20px', fontWeight: 700 }}>
                {finalPrice.toLocaleString()}
              </span>
            </div>
            {/* Show range when it meaningfully differs from mid price */}
            {estimate.priceLow !== estimate.priceHigh && (
              <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                ₦{estimate.priceLow.toLocaleString()} – ₦{estimate.priceHigh.toLocaleString()}
              </p>
            )}
            {estimate.discount && (
              <div className={`flex items-center gap-1 text-[10px] mt-0.5 justify-end ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <Tag className="w-2.5 h-2.5" />
                <span className="line-through">₦{estimate.price.toLocaleString()}</span>
              </div>
            )}
            <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <Clock className="w-3 h-3" />
              <span>{estimate.estimatedTime}</span>
            </div>
            {estimate.surge && (
              <div className={`flex items-center justify-end gap-1 text-[10px] mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <TrendingUp className="w-3 h-3" />
                <span>{estimate.surge.toFixed(1)}x</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleBook}
          className={`w-full mt-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Book on {estimate.serviceName}
        </button>

        {/* Confidence + source footer */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${confidenceInfo.dotColor}`} />
            <span className={`text-[10px] ${confidenceInfo.colorClass}`}>
              {confidenceInfo.label}
            </span>
            {estimate.reportCount > 0 && (
              <span className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                · {estimate.reportCount} report{estimate.reportCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {onReportFare && (
            <button
              onClick={(e) => { e.stopPropagation(); onReportFare(estimate); }}
              className={`text-[10px] flex items-center gap-0.5 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Info className="w-3 h-3" />
              Report fare
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

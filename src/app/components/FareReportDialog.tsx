// Fare Report Dialog — lets users report actual fares after booking
import { useState } from 'react';
import { PriceEstimate, Location } from '../types';
import { submitFareReport } from '../services/fareReports';
import { useTheme } from '../contexts/ThemeContext';
import { X, Send, CheckCircle } from 'lucide-react';

interface FareReportDialogProps {
  estimate: PriceEstimate;
  pickup: Location;
  destination: Location;
  onClose: () => void;
}

export function FareReportDialog({
  estimate,
  pickup,
  destination,
  onClose,
}: FareReportDialogProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [actualFare, setActualFare] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const fare = parseInt(actualFare.replace(/[^0-9]/g, ''), 10);
    if (!fare || fare < 50) return;

    setSubmitting(true);
    await submitFareReport(estimate, pickup, destination, fare, note || undefined);
    setSubmitting(false);
    setSubmitted(true);

    // Auto-close after showing success
    setTimeout(onClose, 1500);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div
          className={`w-full max-w-sm rounded-xl p-6 text-center ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
          <h3
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Thanks!
          </h3>
          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Your report helps improve estimates for everyone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div
        className={`w-full max-w-sm rounded-xl overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isDark ? 'border-gray-800' : 'border-gray-100'
          }`}
        >
          <h3
            className={`text-sm font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Report actual fare
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${
              isDark
                ? 'text-gray-400 hover:bg-gray-800'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <span className="text-xl">{estimate.logo}</span>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {estimate.serviceName}
              </p>
              <p
                className={`text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Our estimate: ₦{estimate.priceLow.toLocaleString()} – ₦
                {estimate.priceHigh.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <label
              className={`text-xs font-medium block mb-1.5 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              What did you actually pay? (₦)
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 2500"
              value={actualFare}
              onChange={(e) => setActualFare(e.target.value)}
              className={`w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-gray-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'
              }`}
              autoFocus
            />
          </div>

          <div>
            <label
              className={`text-xs font-medium block mb-1.5 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Notes (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. surge pricing, promo applied"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-gray-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-4 py-3 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-100'
          }`}
        >
          <button
            onClick={handleSubmit}
            disabled={!actualFare || submitting}
            className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              !actualFare || submitting
                ? isDark
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? 'Submitting…' : 'Submit report'}
          </button>
        </div>
      </div>
    </div>
  );
}

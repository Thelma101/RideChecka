// Price trend chart — mobile optimized with dark mode
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RouteSearch } from '../types';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TrendChartProps {
  searches: RouteSearch[];
}

export function TrendChart({ searches }: TrendChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const chartData = searches.map(search => {
    const dataPoint: any = {
      date: format(new Date(search.timestamp), 'MMM dd'),
      timestamp: search.timestamp,
    };

    search.estimates.forEach(estimate => {
      dataPoint[estimate.serviceName] = estimate.price;
    });

    return dataPoint;
  }).reverse();

  const services = Array.from(
    new Set(searches.flatMap(s => s.estimates.map(e => e.serviceName)))
  );

  const colors = isDark
    ? ['#f5f5f5', '#4ade80', '#fb923c', '#60a5fa', '#f87171', '#fbbf24', '#818cf8', '#f472b6', '#a78bfa', '#22d3ee']
    : ['#000000', '#34D186', '#FF6B35', '#00C853', '#FF5722', '#FFA726', '#1976D2', '#E91E63', '#9C27B0', '#00BCD4'];

  const tickColor = isDark ? '#666666' : '#9CA3AF';

  if (searches.length === 0) {
    return (
      <div className="text-center py-8">
        <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No price history available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => `₦${value.toLocaleString()}`}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                fontSize: '12px',
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                color: isDark ? '#f5f5f5' : '#111111',
              }}
            />
            {services.map((service, index) => (
              <Line
                key={service}
                type="monotone"
                dataKey={service}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-3 overflow-x-auto pb-1 px-1 -mx-1">
        {services.map((service, index) => (
          <div key={service} className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className={`text-[11px] whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

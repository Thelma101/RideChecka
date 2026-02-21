// Advanced search and filter drawer for results
import { useState, useMemo } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from './ui/drawer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { PriceEstimate } from '../types';
import { SlidersHorizontal, X, Car, Bike, Zap, CreditCard, Wifi, Dog } from 'lucide-react';

interface SearchFilterProps {
  estimates: PriceEstimate[];
  onFilter: (filtered: PriceEstimate[]) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FilterState {
  priceRange: [number, number];
  vehicleTypes: string[];
  features: string[];
  localOnly: boolean;
  noSurge: boolean;
  hasDiscount: boolean;
}

const VEHICLE_TYPES = ['Economy', 'Standard', 'Comfort', 'XL', 'Bike', 'Motorcycle'];
const FEATURES = ['AC', 'WiFi', 'Card Payment', 'Split Fare', 'Pet Friendly'];
const FEATURE_ICONS: Record<string, React.ElementType> = {
  'AC': Zap,
  'WiFi': Wifi,
  'Card Payment': CreditCard,
  'Pet Friendly': Dog,
};

export function SearchFilter({ estimates, onFilter, open, onOpenChange }: SearchFilterProps) {
  const minPrice = Math.min(...estimates.map(e => e.price), 0);
  const maxPrice = Math.max(...estimates.map(e => e.price), 10000);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [minPrice, maxPrice],
    vehicleTypes: [],
    features: [],
    localOnly: false,
    noSurge: false,
    hasDiscount: false,
  });

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice) count++;
    if (filters.vehicleTypes.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.localOnly) count++;
    if (filters.noSurge) count++;
    if (filters.hasDiscount) count++;
    return count;
  }, [filters, minPrice, maxPrice]);

  const toggleVehicleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter(t => t !== type)
        : [...prev.vehicleTypes, type],
    }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const applyFilters = () => {
    let filtered = [...estimates];

    // Price range
    filtered = filtered.filter(e => e.price >= filters.priceRange[0] && e.price <= filters.priceRange[1]);

    // Vehicle types
    if (filters.vehicleTypes.length > 0) {
      filtered = filtered.filter(e => filters.vehicleTypes.includes(e.vehicleType));
    }

    // Features
    if (filters.features.length > 0) {
      filtered = filtered.filter(e =>
        filters.features.every(f => e.features?.includes(f))
      );
    }

    // Local only
    if (filters.localOnly) {
      filtered = filtered.filter(e => {
        const localServices = ['gokada', 'rida', 'oride', 'max', 'safeboda', 'lagride'];
        return localServices.includes(e.serviceId);
      });
    }

    // No surge
    if (filters.noSurge) {
      filtered = filtered.filter(e => !e.surge);
    }

    // Has discount
    if (filters.hasDiscount) {
      filtered = filtered.filter(e => !!e.discount);
    }

    onFilter(filtered);
    onOpenChange(false);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [minPrice, maxPrice],
      vehicleTypes: [],
      features: [],
      localOnly: false,
      noSurge: false,
      hasDiscount: false,
    });
    onFilter(estimates);
  };

  return (
    <>
      {/* Filter trigger button */}
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-green-600 text-white text-[10px] px-1.5 h-5 rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </DrawerTitle>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </DrawerHeader>

          <div className="px-4 pb-4 space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Price Range */}
            <div>
              <Label className="text-sm text-gray-700 dark:text-gray-300 mb-3 block" style={{ fontWeight: 600 }}>
                Price Range
              </Label>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>₦{filters.priceRange[0].toLocaleString()}</span>
                <span>₦{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                value={filters.priceRange}
                min={minPrice}
                max={maxPrice}
                step={100}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                className="mt-2"
              />
            </div>

            {/* Vehicle Types */}
            <div>
              <Label className="text-sm text-gray-700 dark:text-gray-300 mb-3 block" style={{ fontWeight: 600 }}>
                Vehicle Type
              </Label>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_TYPES.map(type => {
                  const isSelected = filters.vehicleTypes.includes(type);
                  const isBike = type === 'Bike' || type === 'Motorcycle';
                  return (
                    <button
                      key={type}
                      onClick={() => toggleVehicleType(type)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all ${
                        isSelected
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isBike ? <Bike className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5" />}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div>
              <Label className="text-sm text-gray-700 dark:text-gray-300 mb-3 block" style={{ fontWeight: 600 }}>
                Must Have Features
              </Label>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map(feature => {
                  const isSelected = filters.features.includes(feature);
                  const Icon = FEATURE_ICONS[feature];
                  return (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all ${
                        isSelected
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {feature}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700 dark:text-gray-300" style={{ fontWeight: 500 }}>
                  Local services only
                </Label>
                <Switch
                  checked={filters.localOnly}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, localOnly: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700 dark:text-gray-300" style={{ fontWeight: 500 }}>
                  No surge pricing
                </Label>
                <Switch
                  checked={filters.noSurge}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, noSurge: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700 dark:text-gray-300" style={{ fontWeight: 500 }}>
                  Has discount
                </Label>
                <Switch
                  checked={filters.hasDiscount}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasDiscount: checked }))}
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button
              onClick={applyFilters}
              className="w-full bg-green-600 hover:bg-green-700 rounded-xl h-12"
            >
              Apply Filters
              {activeFilterCount > 0 && ` (${activeFilterCount})`}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

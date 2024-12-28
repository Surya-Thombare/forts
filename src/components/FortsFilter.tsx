'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FORT_TYPES = ['All', 'Hill Fort', 'Sea Fort', 'Land Fort'];
const REGIONS = [
  'All',
  'Western Maharashtra',
  'Konkan',
  'Marathwada',
  'Vidarbha',
  'Northern Maharashtra'
];

interface FortsFilterProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onRegionChange: (region: string) => void;
  searchQuery: string;
  selectedType: string;
  selectedRegion: string;
  skeleton?: boolean;
}

export function FortsFilter({
  onSearch,
  onTypeChange,
  onRegionChange,
  searchQuery,
  selectedType,
  selectedRegion,
  skeleton = false
}: FortsFilterProps) {
  if (skeleton) {
    return <div className="h-20 bg-muted rounded-md animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search forts..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-4">
          <Select
            value={selectedType}
            onValueChange={onTypeChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {FORT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedRegion}
            onValueChange={onRegionChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
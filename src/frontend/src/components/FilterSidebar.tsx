import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Star } from 'lucide-react';
import type { FilterState } from '../hooks/useProductFilters';

interface FilterSidebarProps {
  filters: FilterState;
  availableCategories: string[];
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, availableCategories, onFilterChange, onReset }: FilterSidebarProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  };

  const handlePriceChange = (values: number[]) => {
    onFilterChange({ minPrice: values[0], maxPrice: values[1] });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ minRating: filters.minRating === rating ? 0 : rating });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.minPrice > 0 || 
    filters.maxPrice < 10000 || 
    filters.minRating > 0;

  return (
    <aside className="w-full rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 px-2 text-xs">
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-240px)]">
        <div className="space-y-6 pr-4">
          {/* Category Filter */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Category</h3>
            <div className="space-y-2">
              {availableCategories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Price Range</h3>
            <div className="space-y-4">
              <Slider
                min={0}
                max={1000}
                step={10}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rating Filter */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Minimum Rating</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                    filters.minRating === rating ? 'bg-accent' : ''
                  }`}
                >
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{rating}+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}

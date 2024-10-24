import React from 'react';

interface DateRangeSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export default function DateRangeSlider({ value, onChange }: DateRangeSliderProps) {
  const MIN_RANGE = 5; // Minimum 5-year range
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    const index = parseInt(e.target.dataset.index || "0");
    const newRange = [...value];
    newRange[index] = newValue;
    
    if (index === 0) {
      // Adjusting start year
      if (newRange[1] - newValue < MIN_RANGE) {
        newRange[1] = Math.min(2024, newValue + MIN_RANGE);
      }
    } else {
      // Adjusting end year
      if (newValue - newRange[0] < MIN_RANGE) {
        newRange[0] = Math.max(2000, newValue - MIN_RANGE);
      }
    }
    
    onChange(newRange);
  };

  return (
    <div className="space-y-6">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${((value[0] - 2000) / 24) * 100}%`,
            right: `${100 - ((value[1] - 2000) / 24) * 100}%`
          }}
        />
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={2000}
          max={2024}
          value={value[0]}
          data-index="0"
          onChange={handleChange}
          className="absolute w-full -top-6 h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
        />
        <input
          type="range"
          min={2000}
          max={2024}
          value={value[1]}
          data-index="1"
          onChange={handleChange}
          className="absolute w-full -top-6 h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
        />
      </div>
    </div>
  );
}
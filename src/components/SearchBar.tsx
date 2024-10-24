import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { getDebouncedSuggestions } from '../services/searchService';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    onChange(newQuery);
    setIsLoading(true);

    try {
      const newSuggestions = await getDebouncedSuggestions(newQuery);
      setSuggestions(newSuggestions);
    } finally {
      setIsLoading(false);
    }
  }, [onChange]);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleQueryChange}
          className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all pl-14"
          placeholder="Search cases, topics, or keywords..."
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-6 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { debounce } from '../utils/debounce';

export async function fetchSuggestions(query: string): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!query.trim()) return [];
  
  // Generate 10 suggestions based on the current query
  return Array.from({ length: 10 }, (_, i) => 
    `${query} auto complete #${i + 1}`
  );
}

// Debounced version to prevent too many API calls
export const getDebouncedSuggestions = debounce(fetchSuggestions, 300);
import React, { useState } from 'react';
import { Search, Book, Scale, Gavel, MapPin } from 'lucide-react';
import SwissMap from './components/SwissMap';
import SearchBar from './components/SearchBar';
import TopicCard from './components/TopicCard';
import DateRangeSlider from './components/DateRangeSlider';

const topics = [
  { id: 1, title: 'Criminal Law', icon: <Gavel className="w-5 h-5" />, color: 'bg-red-100 text-red-600' },
  { id: 2, title: 'Civil Law', icon: <Scale className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
  { id: 3, title: 'Administrative Law', icon: <Book className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
  { id: 4, title: 'Tax Law', icon: <MapPin className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
];

function App() {
  const [dateRange, setDateRange] = useState([2020, 2024]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCantons, setSelectedCantons] = useState<string[]>([
    'ZH', 'BE', 'LU', 'UR', 'SZ', 'OW', 'NW', 'GL', 'ZG', 'FR', 'SO',
    'BS', 'BL', 'SH', 'AR', 'AI', 'SG', 'GR', 'AG', 'TG', 'TI', 'VD',
    'VS', 'NE', 'GE', 'JU'
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Swiss Legal Search</h1>
          <p className="text-lg text-gray-600">Search through Swiss jurisprudence across all cantons</p>
        </div>

        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {topics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              {...topic} 
              onClick={() => setSearchQuery(topic.title)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Canton Selection</h2>
            <SwissMap selectedCantons={selectedCantons} onCantonSelect={setSelectedCantons} />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Date Range</h2>
            <DateRangeSlider value={dateRange} onChange={setDateRange} />
            <div className="mt-4 text-center text-gray-600">
              {dateRange[0]} - {dateRange[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
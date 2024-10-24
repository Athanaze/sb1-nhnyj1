import React from 'react';

interface SwissMapProps {
  selectedCantons: string[];
  onCantonSelect: (cantons: string[]) => void;
}

export default function SwissMap({ selectedCantons, onCantonSelect }: SwissMapProps) {
  const cantons = [
    { id: 'ZH', name: 'Zürich' },
    { id: 'BE', name: 'Bern' },
    { id: 'LU', name: 'Luzern' },
    { id: 'UR', name: 'Uri' },
    { id: 'SZ', name: 'Schwyz' },
    { id: 'OW', name: 'Obwalden' },
    { id: 'NW', name: 'Nidwalden' },
    { id: 'GL', name: 'Glarus' },
    { id: 'ZG', name: 'Zug' },
    { id: 'FR', name: 'Fribourg' },
    { id: 'SO', name: 'Solothurn' },
    { id: 'BS', name: 'Basel-Stadt' },
    { id: 'BL', name: 'Basel-Landschaft' },
    { id: 'SH', name: 'Schaffhausen' },
    { id: 'AR', name: 'Appenzell A.Rh.' },
    { id: 'AI', name: 'Appenzell I.Rh.' },
    { id: 'SG', name: 'St. Gallen' },
    { id: 'GR', name: 'Graubünden' },
    { id: 'AG', name: 'Aargau' },
    { id: 'TG', name: 'Thurgau' },
    { id: 'TI', name: 'Ticino' },
    { id: 'VD', name: 'Vaud' },
    { id: 'VS', name: 'Valais' },
    { id: 'NE', name: 'Neuchâtel' },
    { id: 'GE', name: 'Genève' },
    { id: 'JU', name: 'Jura' }
  ];

  const toggleCanton = (cantonId: string) => {
    if (selectedCantons.includes(cantonId)) {
      onCantonSelect(selectedCantons.filter(id => id !== cantonId));
    } else {
      onCantonSelect([...selectedCantons, cantonId]);
    }
  };

  const selectAll = () => {
    onCantonSelect(cantons.map(canton => canton.id));
  };

  const clearAll = () => {
    onCantonSelect([]);
  };

  return (
    <div>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={selectAll}
          className="text-sm px-4 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="text-sm px-4 py-2 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {cantons.map(canton => (
          <button
            key={canton.id}
            onClick={() => toggleCanton(canton.id)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedCantons.includes(canton.id)
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {canton.name}
          </button>
        ))}
      </div>
    </div>
  );
}
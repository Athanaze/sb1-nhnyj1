import React from 'react';

interface TopicCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

export default function TopicCard({ title, icon, color, onClick }: TopicCardProps) {
  return (
    <div className="group cursor-pointer h-full" onClick={onClick}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 h-full">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${color} flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
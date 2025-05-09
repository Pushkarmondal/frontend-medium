// Modified Avatar component with console logging to help debug
import React from 'react';

interface AvatarProps {
      name: string;
      size?: 'sm' | 'md' | 'lg';
      className?: string;
      bgColorClass?: string;
      textColorClass?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
      name,
      size = 'md',
      className = '',
      bgColorClass,
      textColorClass
}) => {

      const cleanName = typeof name === 'string' && name !== 'undefined' ? name.trim() : 'Anonymous';
      console.log('Cleaned name:', cleanName);

      const initial = cleanName && cleanName.length > 0 ? cleanName[0].toUpperCase() : 'A';
      console.log('Initial calculated:', initial);

      const sizeClasses = {
            sm: 'w-10 h-10 text-sm rounded-full',   // Small circle
            md: 'w-14 h-14 text-lg rounded-full',   // Medium circle
            lg: 'w-25 h-13 text-xl rounded-full'    // Large circle
      };


      const getColorClasses = (name: string) => {
            const colorPairs = [
                  { bg: 'bg-blue-100', text: 'text-blue-600' },
                  { bg: 'bg-green-100', text: 'text-green-600' },
                  { bg: 'bg-purple-100', text: 'text-purple-600' },
                  { bg: 'bg-red-100', text: 'text-red-600' },
                  { bg: 'bg-indigo-100', text: 'text-slate-600' },
                  { bg: 'bg-pink-100', text: 'text-pink-600' },
                  { bg: 'bg-indigo-100', text: 'text-indigo-600' },
            ];

            if (name === 'Anonymous') {
                  return { bg: 'bg-red-100', text: 'text-red-600' };
            }
            const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            const colorIndex = charSum % (colorPairs.length - 1);
            return colorPairs[colorIndex];
      };

      const colorClasses = getColorClasses(cleanName);

      return (
            <div
                  className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${sizeClasses[size]} ${bgColorClass || colorClasses.bg} ${textColorClass || colorClasses.text} ${className}`}
                  aria-label={`Avatar for ${cleanName}`}
            >
                  <span className="font-semibold antialiased">{initial}</span>
            </div>
      );
};
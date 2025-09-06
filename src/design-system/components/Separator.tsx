import React from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className = '',
  label,
}) => {
  if (label) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</span>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
      </div>
    );
  }

  const orientationClasses = {
    horizontal: 'w-full h-px border-t border-gray-200 dark:border-gray-700',
    vertical: 'h-full w-px border-l border-gray-200 dark:border-gray-700',
  };

  return (
    <div
      className={`
        ${orientationClasses[orientation]}
        ${className}
      `}
    />
  );
};

export default Separator;

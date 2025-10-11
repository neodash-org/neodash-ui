import React from 'react';
import { Button } from '@/design-system/components';
import { useTranslation } from 'react-i18next';

interface SelectorHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

export const SelectorHeader: React.FC<SelectorHeaderProps> = ({ title, subtitle, onBack }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="p-2 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
        data-testid="back-button"
        aria-label={t('common.back')}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
          {title}
        </h3>
        {subtitle ? <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p> : null}
      </div>
    </div>
  );
};

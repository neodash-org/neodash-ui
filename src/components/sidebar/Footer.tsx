'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@/contexts/SidebarContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isCollapsed } = useSidebar();
  const containerClasses = `flex ${isCollapsed ? 'flex-col space-y-1' : 'space-x-4'} text-xs text-gray-500 dark:text-gray-400`;

  return (
    <div className="md:relative absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
      <div className="flex justify-center">
        <div className={containerClasses}>
          <a
            href="#"
            className="hover:text-neon-cyan transition-colors duration-200"
            onClick={(e) => e.preventDefault()}
            title={t('footer.termsOfUse')}
          >
            {isCollapsed ? t('footer.termsOfUseShort') : t('footer.termsOfUse')}
          </a>
          <a
            href="#"
            className="hover:text-neon-cyan transition-colors duration-200"
            onClick={(e) => e.preventDefault()}
            title={t('footer.privacyPolicy')}
          >
            {isCollapsed ? t('footer.privacyPolicyShort') : t('footer.privacyPolicy')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

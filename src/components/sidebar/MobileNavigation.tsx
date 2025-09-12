'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/utils/navigationData';
import { usePostHog } from '@/hooks';
import { useTranslation } from 'react-i18next';

interface MobileNavigationProps {
  onItemClick: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ onItemClick }) => {
  const pathname = usePathname();
  const { trackNavigation } = usePostHog();
  const { t } = useTranslation();

  return (
    <nav className="flex flex-col p-6">
      {/* Navigation Items */}
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const label = t(item.labelKey);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (!isActive) {
                trackNavigation(pathname, item.href, {
                  navigation_type: 'mobile_menu',
                  item_label: label,
                });
              }
              onItemClick();
            }}
            className={`flex items-center gap-4 py-3 transition-all duration-300 ${
              isActive ? 'text-neon-cyan' : 'text-gray-700 dark:text-white hover:text-neon-cyan'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavigation;

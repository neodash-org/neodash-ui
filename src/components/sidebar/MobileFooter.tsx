'use client';

import React from 'react';

const MobileFooter: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full flex items-center justify-center">
          <span className="text-white text-lg">N</span>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;

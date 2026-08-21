import React from 'react';

// Import the generated authentic logo image
import kknLogoImg from '../assets/images/kkn-logo.png';

interface LogoBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const LogoBadge: React.FC<LogoBadgeProps> = ({
  size = 'md',
  showText = false,
  className = '',
  variant = 'light'
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32 md:w-40 md:h-40'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${sizeMap[size]} shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-[#D4AF37] bg-[#0F1E36] transition-transform hover:scale-105 duration-300`}
      >
        <img
          src={kknLogoImg}
          alt="Logo KKN Tematik Kelompok 47 Desa Batursari Mranggen Demak UPGRIS"
          className="w-full h-full object-cover object-center"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to custom stylized badge if image load fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#D4AF37]">
            KKN Tematik Kelompok 47 • UPGRIS
          </span>
          <span className={`text-sm sm:text-base md:text-lg font-bold font-display tracking-tight leading-tight ${variant === 'dark' ? 'text-white' : 'text-[#0F1E36]'}`}>
            Pojok Baca Desa Batursari
          </span>
          <span className={`text-[10px] sm:text-xs ${variant === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            Kec. Mranggen, Kab. Demak
          </span>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Home, Crown, Store, Coffee, Gift } from 'lucide-react';
import { AppPage } from '../types';

interface MobileBottomNavProps {
  currentPage: AppPage;
  onSelectPage: (page: AppPage) => void;
  claimedVouchersCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onSelectPage,
  claimedVouchersCount = 0,
}) => {
  const navItems: { id: AppPage; label: string; japanese: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', japanese: 'ホーム', icon: Home },
    { id: 'tiers', label: 'Tiers', japanese: 'ランク', icon: Crown },
    { id: 'depachika', label: 'Depachika', japanese: 'デパ地下', icon: Store },
    { id: 'concierge', label: 'Concierge', japanese: 'サービス', icon: Coffee },
    { id: 'vault', label: 'Privileges', japanese: '特典', icon: Gift },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="sticky bottom-0 left-0 right-0 z-40 bg-[#FFF8F7]/95 backdrop-blur-md border-t border-[#EEDCD4] shadow-[0_-4px_20px_rgba(32,26,26,0.06)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all relative cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#7A1520] font-semibold'
                  : 'text-[#8A7170] hover:text-[#201A1A]'
              }`}
            >
              {/* Active subtle pill / top glow */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-[#7A1520] rounded-b-full shadow-xs" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#7A1520]' : 'text-[#8A7170]'
                  }`}
                />
                {item.id === 'vault' && claimedVouchersCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#C59B57] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {claimedVouchersCount}
                  </span>
                )}
              </div>

              <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

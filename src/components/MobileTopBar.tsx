import React from 'react';
import { ShoppingBag, QrCode, Smartphone, Maximize2, Crown, ChevronLeft } from 'lucide-react';
import { MemberProfile, AppPage } from '../types';

interface MobileTopBarProps {
  member: MemberProfile;
  cartCount: number;
  currentPage: AppPage;
  onSelectPage: (page: AppPage) => void;
  onOpenCart: () => void;
  onOpenPass: () => void;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  member,
  cartCount,
  currentPage,
  onSelectPage,
  onOpenCart,
  onOpenPass,
  isPhoneFrame,
  onToggleFrame,
}) => {
  const pageTitles: Record<AppPage, { title: string; subtitle: string }> = {
    home: { title: 'Takashimaya Prestige', subtitle: 'Ngee Ann City · Orchard' },
    tiers: { title: 'Prestige Tiers', subtitle: 'Architecture & Pass' },
    depachika: { title: 'Depachika & Boutiques', subtitle: 'B2 Gourmet & Luxury' },
    concierge: { title: 'Omotenashi Concierge', subtitle: 'Lounges & Services' },
    vault: { title: 'Rose Privileges', subtitle: 'Points & Rewards' },
  };

  const current = pageTitles[currentPage];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F7]/95 backdrop-blur-md border-b border-[#EEDCD4] transition-all">
      <div className="px-3 sm:px-4 h-14 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left Slot: Brand or Back Button */}
        <div className="flex items-center gap-2 shrink-0">
          {currentPage !== 'home' ? (
            <button
              onClick={() => onSelectPage('home')}
              className="p-1.5 -ml-1 rounded-full text-[#7A1520] hover:bg-[#F8EBEA] flex items-center gap-1 text-xs font-semibold cursor-pointer active:scale-95"
              aria-label="Back to Home"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden xs:inline">Home</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7A1520] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
                髙
              </div>
              <div className="leading-tight">
                <div className="font-serif text-sm font-bold text-[#201A1A] tracking-tight">
                  Takashimaya
                </div>
                <div className="text-[9px] font-semibold text-[#8A7170] uppercase tracking-wider">
                  Prestige VIP
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center Slot: Page Title (if not on home) */}
        {currentPage !== 'home' && (
          <div className="text-center truncate px-1 flex-1">
            <div className="font-serif text-xs sm:text-sm font-bold text-[#201A1A] truncate">
              {current.title}
            </div>
            <div className="text-[9px] text-[#8A7170] truncate">
              {current.subtitle}
            </div>
          </div>
        )}

        {/* Right Slot: Member Tier pill, Pass QR, Bag */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Member Tier Pill */}
          <div className="hidden xs:flex items-center gap-1 px-2 py-1 rounded-md bg-[#F8EBEA] border border-[#EEDCD4] text-[10px] font-bold text-[#201A1A]">
            <Crown className="w-3 h-3 text-[#C59B57]" />
            <span className="capitalize">{member.tier}</span>
          </div>

          {/* Device Frame View Toggle (hidden on small mobile screens, useful for testing on desktop) */}
          <button
            onClick={onToggleFrame}
            title={isPhoneFrame ? 'Switch to Full Width Canvas' : 'Switch to Mobile Scale Phone Frame'}
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-white hover:bg-[#F8EBEA] border border-[#EEDCD4] text-[10px] font-semibold text-[#574141] transition-colors cursor-pointer"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3 h-3 text-[#7A1520]" />
                <span>Full</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3 text-[#7A1520]" />
                <span>Mobile Frame</span>
              </>
            )}
          </button>

          {/* VIP Pass Button */}
          <button
            onClick={onOpenPass}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-[11px] font-semibold rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            aria-label="Open VIP Digital Pass"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C59B57]" />
            <span className="hidden sm:inline">Pass</span>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg border border-[#EEDCD4] bg-white hover:bg-[#F8EBEA] text-[#201A1A] transition-colors cursor-pointer active:scale-95"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#7A1520]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7A1520] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { ShoppingBag, QrCode, Sparkles, Crown } from 'lucide-react';
import { MemberProfile } from '../types';

interface NavbarProps {
  member: MemberProfile;
  cartCount: number;
  onOpenCart: () => void;
  onOpenPass: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  member,
  cartCount,
  onOpenCart,
  onOpenPass,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F7]/90 backdrop-blur-md border-b border-[#EEDCD4] transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group flex items-center gap-3 shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-[#7A1520] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm transition-transform group-hover:scale-105">
            髙
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#201A1A] group-hover:text-[#7A1520] transition-colors leading-tight">
              Takashimaya Prestige
            </div>
            <div className="text-[11px] font-medium tracking-wider uppercase text-[#8A7170]">
              Ngee Ann City · Orchard Road
            </div>
          </div>
        </button>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#574141]">
          <button
            onClick={() => onNavigate('tiers')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'tiers'
                ? 'text-[#7A1520] font-semibold'
                : 'hover:text-[#7A1520]'
            }`}
          >
            Prestige Tiers
            {activeSection === 'tiers' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('concierge')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'concierge'
                ? 'text-[#7A1520] font-semibold'
                : 'hover:text-[#7A1520]'
            }`}
          >
            Omotenashi Concierge
            {activeSection === 'concierge' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('depachika')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'depachika'
                ? 'text-[#7A1520] font-semibold'
                : 'hover:text-[#7A1520]'
            }`}
          >
            Depachika & Boutiques
            {activeSection === 'depachika' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('rewards')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeSection === 'rewards'
                ? 'text-[#7A1520] font-semibold'
                : 'hover:text-[#7A1520]'
            }`}
          >
            Rose Privileges
            {activeSection === 'rewards' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A1520] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Member Quick Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8EBEA] border border-[#EEDCD4] text-xs font-medium text-[#201A1A]">
            <Crown className="w-3.5 h-3.5 text-[#C59B57]" />
            <span className="capitalize font-semibold">{member.tier}</span>
            <span className="text-[#8A7170]">·</span>
            <span className="font-mono tabular-nums">{member.currentPoints.toLocaleString()} pts</span>
          </div>

          {/* Primary CTA: VIP Digital Pass */}
          <button
            onClick={onOpenPass}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <QrCode className="w-4 h-4 text-[#C59B57]" />
            <span className="hidden sm:inline">VIP Digital Pass</span>
            <span className="sm:hidden">Pass</span>
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 rounded-lg border border-[#EEDCD4] bg-white hover:bg-[#F8EBEA] text-[#201A1A] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-[#7A1520]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#7A1520] text-white text-[11px] font-bold flex items-center justify-center font-mono animate-scale">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

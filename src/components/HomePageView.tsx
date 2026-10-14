import React, { useState } from 'react';
import {
  Coffee,
  Car,
  Store,
  Gift,
  QrCode,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Crown,
  Eye,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { MemberProfile, ProductItem, AppPage } from '../types';
import { PRESTIGE_TIERS, CURATED_PRODUCTS } from '../data/mockData';

interface HomePageViewProps {
  member: MemberProfile;
  onNavigate: (page: AppPage, subTab?: string) => void;
  onOpenPass: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  member,
  onNavigate,
  onOpenPass,
  onSelectProduct,
  onAddToCart,
}) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const tierInfo = PRESTIGE_TIERS[member.tier];

  const handleAdd = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  const progressPercent = Math.min(
    100,
    Math.round((member.annualSpend / member.nextTierSpend) * 100)
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Patron Greeting & Ambient Banner */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A1520] flex items-center gap-1.5">
            <span>おもてなし</span>
            <span className="text-[#C59B57]">·</span>
            <span>Welcome Elizabeth-sama</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#201A1A] mt-0.5">
            Takashimaya Prestige
          </h1>
        </div>

        {/* Member Avatar */}
        <div
          onClick={onOpenPass}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7A1520] to-[#991B28] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm border-2 border-[#EEDCD4] cursor-pointer active:scale-95 transition-transform"
        >
          ET
        </div>
      </div>

      {/* Interactive Mobile VIP Prestige Card */}
      <div className="px-4">
        <div
          onClick={() => setIsCardFlipped(!isCardFlipped)}
          className="relative w-full aspect-[1.586/1] rounded-[22px] p-5 sm:p-6 bg-gradient-to-br from-[#D4AF37] via-[#F4DE7B] to-[#AA8220] border-2 border-[#FFF0A0] shadow-[0_12px_28px_-6px_rgba(122,21,32,0.18),0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer active:scale-[0.99] transition-transform select-none"
        >
          {/* Subtle Background Rose Crest */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="#410008" className="w-full h-full">
              <circle cx="100" cy="100" r="80" stroke="#410008" strokeWidth="8" fill="none" />
              <path d="M100 35 C110 45, 130 50, 140 65 C150 80, 155 100, 145 120 C135 140, 115 150, 100 160 C85 150, 65 140, 55 120 C45 100, 50 80, 60 65 C70 50, 90 45, 100 35 Z" />
            </svg>
          </div>

          {!isCardFlipped ? (
            /* Card Front */
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#410008] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                    髙
                  </div>
                  <div>
                    <div className="font-serif text-xs font-bold tracking-wider text-[#410008]">
                      TAKASHIMAYA
                    </div>
                    <div className="text-[8px] tracking-widest text-[#58000F]/80 uppercase">
                      PRESTIGE VIP PASS
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-black/15 backdrop-blur-xs border border-white/40 flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-[#410008]">
                  <Crown className="w-2.5 h-2.5 text-[#410008]" />
                  <span>{tierInfo.name}</span>
                </div>
              </div>

              {/* Center: Smart chip & Rose Points */}
              <div className="flex items-center justify-between my-auto">
                <div className="w-9 h-6 rounded bg-gradient-to-br from-[#FFF0A0] to-[#C59B57] border border-black/20 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="w-full h-0.5 bg-black/20 absolute top-1.5" />
                  <div className="w-full h-0.5 bg-black/20 absolute bottom-1.5" />
                </div>

                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-wider text-[#58000F]/80 font-semibold">
                    Rose Points
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-bold text-[#410008] tabular-nums leading-none">
                    {member.currentPoints.toLocaleString()} <span className="text-[10px] font-normal">pts</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Name & ID */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[8px] uppercase tracking-widest font-semibold text-[#58000F]/80">
                    Patron
                  </div>
                  <div className="font-serif text-sm sm:text-base font-bold text-[#410008] tracking-tight">
                    {member.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#58000F]/80 tabular-nums">
                    {member.memberId}
                  </div>
                </div>

                <div className="text-right flex items-center gap-1 text-[10px] font-semibold text-[#410008] bg-white/40 px-2 py-1 rounded-md">
                  <RefreshCw className="w-3 h-3" />
                  <span>Tap to flip</span>
                </div>
              </div>
            </div>
          ) : (
            /* Card Back (Barcode & QR) */
            <div className="relative h-full flex flex-col justify-between -m-5 sm:-m-6 p-5 sm:p-6 bg-black/35 backdrop-blur-xs rounded-[22px] text-white">
              <div className="w-full h-6 bg-black/70 -mx-5 sm:-mx-6 -mt-2" />

              <div className="flex items-center justify-between gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <QrCode className="w-14 h-14 text-[#201A1A]" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-white/80">
                    Ngee Ann City Scanner
                  </div>
                  <div className="font-mono text-xs font-bold text-white tracking-widest mt-0.5">
                    {member.memberId}
                  </div>
                  <div className="text-[9px] text-[#FFDF80] mt-1">
                    Level 3 Rose Suite · B2 Depachika
                  </div>
                </div>
              </div>

              {/* Simulated 1D Barcode */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-between h-7 gap-[2px]">
                {Array.from({ length: 38 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-black h-full"
                    style={{
                      width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Quick Actions Helper */}
        <div className="flex items-center justify-between pt-2 px-1 text-xs text-[#8A7170]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            <span>Active at Ngee Ann City</span>
          </span>
          <button
            onClick={onOpenPass}
            className="text-[#7A1520] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Fullscreen Pass</span>
            <ArrowRight className="w-3 h-3 text-[#C59B57]" />
          </button>
        </div>
      </div>

      {/* Tier Progress Milestone Strip */}
      <div className="px-4">
        <div
          onClick={() => onNavigate('tiers')}
          className="p-3.5 rounded-xl bg-white border border-[#EEDCD4] shadow-xs cursor-pointer hover:border-[#7A1520] transition-colors"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#201A1A] flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-[#C59B57]" />
              <span>Progress to Platinum Distinction</span>
            </span>
            <span className="font-mono font-bold text-[#7A1520]">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#EEDCD4] overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#7A1520]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8A7170]">
            <span>Current: S${member.annualSpend.toLocaleString()}</span>
            <span>Target: S${member.nextTierSpend.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Quick Services Grid: 4 Core Mobile Touch Actions (44px+ hitboxes) */}
      <div className="px-4 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#7A1520]">
          Omotenashi Services
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Service 1: Rose Suite Lounge */}
          <button
            onClick={() => onNavigate('concierge', 'lounge')}
            className="p-3.5 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] shadow-xs text-left cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-28"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Coffee className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C59B57] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="font-serif text-xs font-bold text-[#201A1A]">
                The Rose Suite
              </div>
              <div className="text-[10px] text-[#8A7170] mt-0.5 line-clamp-1">
                L3 VIP Lounge & Wagashi
              </div>
            </div>
          </button>

          {/* Service 2: VIP Valet */}
          <button
            onClick={() => onNavigate('concierge', 'valet')}
            className="p-3.5 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] shadow-xs text-left cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-28"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Car className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C59B57] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="font-serif text-xs font-bold text-[#201A1A]">
                VIP Valet Pass
              </div>
              <div className="text-[10px] text-[#8A7170] mt-0.5 line-clamp-1">
                3 Hrs Complimentary Daily
              </div>
            </div>
          </button>

          {/* Service 3: Depachika B2 */}
          <button
            onClick={() => onNavigate('depachika')}
            className="p-3.5 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] shadow-xs text-left cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-28"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Store className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C59B57] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="font-serif text-xs font-bold text-[#201A1A]">
                B2 Depachika Hall
              </div>
              <div className="text-[10px] text-[#8A7170] mt-0.5 line-clamp-1">
                Air-flown Gourmet Sweets
              </div>
            </div>
          </button>

          {/* Service 4: Rose Privileges / Vouchers */}
          <button
            onClick={() => onNavigate('vault')}
            className="p-3.5 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] shadow-xs text-left cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-28"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center group-hover:bg-[#7A1520] group-hover:text-white transition-colors">
                <Gift className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#C59B57] group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="font-serif text-xs font-bold text-[#201A1A]">
                Rose Privileges
              </div>
              <div className="text-[10px] text-[#8A7170] mt-0.5 line-clamp-1">
                Vouchers & Points Wallet
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Featured Depachika Gourmet & Boutiques Highlights */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A1520]">
              Today's Curations
            </div>
            <h2 className="font-serif text-base font-bold text-[#201A1A]">
              Narita Air Cargo & Boutique Exclusives
            </h2>
          </div>
          <button
            onClick={() => onNavigate('depachika')}
            className="text-xs font-semibold text-[#7A1520] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All (6)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Carousel / Stack */}
        <div className="space-y-3">
          {CURATED_PRODUCTS.slice(0, 3).map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="p-3 rounded-xl bg-white border border-[#EEDCD4] hover:border-[#7A1520] shadow-xs flex gap-3 cursor-pointer transition-all active:scale-[0.99] group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F7EDE8] shrink-0 border border-[#EEDCD4] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-black/70 text-white text-[8px] font-bold uppercase">
                      New
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-semibold text-[#8A7170] uppercase">
                      {product.origin.split(',')[0]}
                    </div>
                    <h3 className="font-serif text-xs font-bold text-[#201A1A] line-clamp-1 group-hover:text-[#7A1520]">
                      {product.name}
                    </h3>
                    <div className="text-[10px] text-[#574141] font-serif line-clamp-1">
                      {product.japaneseName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs font-bold text-[#7A1520] tabular-nums">
                      S${product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                        isAdded
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#7A1520] hover:bg-[#8E1C27] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3 text-[#C59B57]" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rose-chan Mascot Daily Advice Card */}
      <div className="px-4">
        <div className="p-4 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] shadow-xs flex items-start gap-3 relative">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#EEDCD4] bg-white shadow-xs">
            <img
              src="/src/assets/images/rose_chan_mascot_concierge_1791938611096.jpg"
              alt="Rose-chan Mascot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A1520]">
                Rose-chan Concierge
              </span>
              <span className="text-[10px] text-[#8A7170]">ローズちゃん</span>
            </div>
            <p className="font-serif text-xs font-semibold text-[#201A1A]">
              "Today's fresh air cargo has arrived at B2!"
            </p>
            <p className="text-[11px] text-[#574141] leading-relaxed">
              Konnichiwa Elizabeth-sama! Remember that Gold members enjoy 10% privilege discount across all B2 gourmet confections and double Rose points this weekend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

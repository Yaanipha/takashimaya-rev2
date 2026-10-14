import React, { useState } from 'react';
import { Crown, Sparkles, QrCode, RefreshCw, Check, ArrowUpRight, Award, Shield } from 'lucide-react';
import { MembershipTier, MemberProfile } from '../types';
import { PRESTIGE_TIERS } from '../data/mockData';

interface TierStudioProps {
  member: MemberProfile;
  onOpenPassModal: () => void;
  onSelectTierForBooking?: (tier: MembershipTier) => void;
}

export const TierStudio: React.FC<TierStudioProps> = ({
  member,
  onOpenPassModal,
}) => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier>(member.tier);
  const [simulatedSpend, setSimulatedSpend] = useState<number>(member.annualSpend);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const tierKeys: MembershipTier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
  const currentTierInfo = PRESTIGE_TIERS[selectedTier];

  // Derive calculated tier from simulated spend
  const calculateTierFromSpend = (spend: number): MembershipTier => {
    if (spend >= 500000) return 'diamond';
    if (spend >= 300000) return 'platinum';
    if (spend >= 100000) return 'gold';
    if (spend >= 20000) return 'silver';
    return 'bronze';
  };

  const handleSpendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpend = Number(e.target.value);
    setSimulatedSpend(newSpend);
    const calculatedTier = calculateTierFromSpend(newSpend);
    setSelectedTier(calculatedTier);
  };

  const resetToActual = () => {
    setSimulatedSpend(member.annualSpend);
    setSelectedTier(member.tier);
  };

  // Card themes based on design specification
  const getCardTheme = (tier: MembershipTier) => {
    switch (tier) {
      case 'bronze':
        return {
          bg: 'from-[#B38E75] via-[#C9A68F] to-[#7A553E]',
          border: 'border-[#E6D2C4]/60',
          foilText: 'text-[#FFF8F7]',
          subText: 'text-[#FFF8F7]/80',
          accent: '#E6D2C4',
          chipColor: 'from-[#E6D2C4] to-[#B38E75]',
        };
      case 'silver':
        return {
          bg: 'from-[#9FA8A9] via-[#CAD1D2] to-[#717C7D]',
          border: 'border-white/80',
          foilText: 'text-[#1E2228]',
          subText: 'text-[#1E2228]/80',
          accent: '#FFFFFF',
          chipColor: 'from-[#FFFFFF] to-[#9FA8A9]',
        };
      case 'gold':
        return {
          bg: 'from-[#D4AF37] via-[#F4DE7B] to-[#AA8220]',
          border: 'border-[#FFF0A0]',
          foilText: 'text-[#410008]',
          subText: 'text-[#58000F]/85',
          accent: '#410008',
          chipColor: 'from-[#FFF0A0] to-[#C59B57]',
        };
      case 'platinum':
        return {
          bg: 'from-[#1E2228] via-[#2A313C] to-[#111317]',
          border: 'border-[#C59B57]/70',
          foilText: 'text-[#FFF8F7]',
          subText: 'text-[#C59B57]',
          accent: '#C59B57',
          chipColor: 'from-[#E2E8E9] to-[#8A959E]',
        };
      case 'diamond':
        return {
          bg: 'from-[#88A9C3] via-[#C2D9EA] to-[#436480]',
          border: 'border-[#E3F2FD]',
          foilText: 'text-[#0E2A47]',
          subText: 'text-[#173F69]',
          accent: '#FFFFFF',
          chipColor: 'from-[#FFFFFF] to-[#88A9C3]',
        };
    }
  };

  const theme = getCardTheme(selectedTier);

  // Spend progression
  const nextTierThreshold =
    selectedTier === 'bronze'
      ? 20000
      : selectedTier === 'silver'
      ? 100000
      : selectedTier === 'gold'
      ? 300000
      : selectedTier === 'platinum'
      ? 500000
      : 500000;

  const prevTierThreshold =
    selectedTier === 'bronze'
      ? 0
      : selectedTier === 'silver'
      ? 10000
      : selectedTier === 'gold'
      ? 20000
      : selectedTier === 'platinum'
      ? 100000
      : 300000;

  const progressPercent =
    selectedTier === 'diamond'
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            ((simulatedSpend - prevTierThreshold) /
              (nextTierThreshold - prevTierThreshold)) *
              100
          )
        );

  return (
    <section id="tiers" className="py-12 sm:py-16 bg-[#FDF9F6] border-b border-[#EEDCD4]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#7A1520] uppercase mb-1">
            会員ランク · Privilege Membership
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#201A1A] tracking-tight [text-wrap:balance]">
            Prestige Tier Architecture & Digital Pass
          </h2>
          <p className="text-sm sm:text-base text-[#574141] mt-2">
            Five distinguished tiers crafted to recognize our most loyal patrons. Each tier grants elevated access to The Rose Suite, valet parking, and private depachika tastings.
          </p>
        </div>

        {/* Tier Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tierKeys.map((tierKey) => {
            const tier = PRESTIGE_TIERS[tierKey];
            const isSelected = selectedTier === tierKey;
            const isUserTier = member.tier === tierKey;

            return (
              <button
                key={tierKey}
                onClick={() => {
                  setSelectedTier(tierKey);
                  // Set simulated spend to tier baseline if lower
                  if (simulatedSpend < tier.minSpend) {
                    setSimulatedSpend(tier.minSpend);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#7A1520] text-white border-[#7A1520] shadow-sm'
                    : 'bg-white hover:bg-[#F8EBEA] text-[#201A1A] border-[#EEDCD4]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: tier.colorHex }}
                />
                <span>{tier.name}</span>
                <span className="text-[11px] opacity-75">({tier.japaneseName})</span>
                {isUserTier && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white font-bold uppercase tracking-wider ml-1">
                    Your Tier
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Digital Card Left & Interactive Spend Simulator / Perks Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Physical Card Metaphor (1.586:1 aspect ratio) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
              {/* Aspect Ratio 1.586:1 Container (standard ISO/IEC 7810 ID-1 credit card) */}
              <div
                className={`relative w-full aspect-[1.586/1] rounded-[24px] p-6 sm:p-8 bg-gradient-to-br ${theme.bg} border-2 ${theme.border} shadow-[0_16px_36px_-6px_rgba(32,26,26,0.22),0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 transform group-hover:scale-[1.01]`}
              >
                {/* Takashimaya Signature Rose Emblem Watermark SVG */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-15 pointer-events-none select-none">
                  <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-current">
                    <path d="M100 20 C110 30, 130 35, 140 50 C150 65, 155 85, 145 105 C135 125, 115 135, 100 145 C85 135, 65 125, 55 105 C45 85, 50 65, 60 50 C70 35, 90 30, 100 20 Z" />
                    <circle cx="100" cy="85" r="35" stroke="currentColor" strokeWidth="6" fill="none" />
                    <path d="M70 85 Q100 120 130 85" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path d="M80 65 Q100 40 120 65" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </div>

                {!isFlipped ? (
                  /* Front Face */
                  <div className="relative h-full flex flex-col justify-between">
                    {/* Top Row: Department Store Mark & Tier Pill */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center font-serif font-bold text-sm text-white border border-white/30">
                          髙
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm font-serif font-bold tracking-wider uppercase ${theme.foilText}`}>
                            TAKASHIMAYA
                          </div>
                          <div className={`text-[10px] tracking-widest uppercase ${theme.subText}`}>
                            PRESTIGE NGEE ANN CITY
                          </div>
                        </div>
                      </div>

                      {/* Pill Badge */}
                      <div className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-white">
                        <Crown className="w-3 h-3 text-[#FFDF80]" />
                        <span>{currentTierInfo.name.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Middle Row: Gold Chip & Contactless Emblem */}
                    <div className="flex items-center gap-4 my-auto">
                      <div className={`w-11 h-8 rounded-md bg-gradient-to-br ${theme.chipColor} border border-black/20 shadow-inner flex items-center justify-center relative overflow-hidden`}>
                        <div className="w-full h-0.5 bg-black/20 absolute top-2" />
                        <div className="w-full h-0.5 bg-black/20 absolute bottom-2" />
                        <div className="h-full w-0.5 bg-black/20 absolute left-3" />
                      </div>
                      <div className="text-white/60">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                          <path d="M12 19a8.5 8.5 0 0 0 0-12" />
                          <path d="M15.5 21.5a12 12 0 0 0 0-17" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Row: Member Name, ID, Expiry */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className={`text-[10px] uppercase tracking-widest font-semibold ${theme.subText}`}>
                          Distinguished Patron
                        </div>
                        <div className={`text-base sm:text-xl font-serif font-bold tracking-wide ${theme.foilText}`}>
                          {member.name}
                        </div>
                        <div className={`text-xs font-mono tracking-wider tabular-nums mt-0.5 ${theme.subText}`}>
                          {member.memberId}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-[9px] uppercase tracking-wider ${theme.subText}`}>
                          Valid Thru
                        </div>
                        <div className={`text-xs sm:text-sm font-mono font-bold ${theme.foilText}`}>
                          12 / 2027
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Back Face (Barcode & QR) */
                  <div className="relative h-full flex flex-col justify-between bg-black/40 backdrop-blur-sm -m-6 sm:-m-8 p-6 sm:p-8 rounded-[24px]">
                    <div className="w-full h-8 bg-black/70 -mx-6 sm:-mx-8 mt-1" />

                    <div className="flex items-center justify-between gap-4 py-2">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <QrCode className="w-14 h-14 sm:w-16 sm:h-16 text-[#201A1A]" />
                      </div>
                      <div className="text-right text-white">
                        <div className="text-[11px] uppercase tracking-wider text-white/70">
                          Concierge Barcode Scan
                        </div>
                        <div className="font-mono text-sm sm:text-base font-bold tracking-widest mt-1">
                          {member.memberId}
                        </div>
                        <div className="text-[10px] text-white/60 mt-1">
                          Ngee Ann City · Level 3 Rose Suite
                        </div>
                      </div>
                    </div>

                    {/* Simulated 1D Barcode */}
                    <div className="bg-white px-4 py-2 rounded-md flex items-center justify-center">
                      <div className="h-8 w-full flex items-stretch justify-between gap-[2px]">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-black"
                            style={{
                              width: (i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px'),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Flip & Action helper */}
              <div className="flex items-center justify-between text-xs text-[#8A7170] pt-2 px-1">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Click card to {isFlipped ? 'view front' : 'view barcode & QR'}</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPassModal();
                  }}
                  className="text-[#7A1520] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Fullscreen Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Card Specs Summary */}
            <div className="p-4 rounded-xl bg-white border border-[#EEDCD4] grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[11px] text-[#8A7170] uppercase tracking-wide">Points Rate</div>
                <div className="text-sm font-bold font-mono text-[#7A1520] mt-0.5">
                  {currentTierInfo.multiplier}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#8A7170] uppercase tracking-wide">Valet Parking</div>
                <div className="text-sm font-bold text-[#201A1A] mt-0.5 truncate">
                  {currentTierInfo.valetHours}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#8A7170] uppercase tracking-wide">Depachika</div>
                <div className="text-sm font-bold text-[#201A1A] mt-0.5">
                  {currentTierInfo.depachikaPrivilege.split(' ')[0]} Off
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Spend Simulator & Unlocked Privileges */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Spend Simulator Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#EEDCD4] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#7A1520] uppercase">
                    Annual Spend & Tier Simulator
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#201A1A]">
                    Simulate Your Membership Milestone
                  </h3>
                </div>
                {simulatedSpend !== member.annualSpend && (
                  <button
                    onClick={resetToActual}
                    className="text-xs text-[#7A1520] hover:underline font-semibold"
                  >
                    Reset to Actual (S$142.5k)
                  </button>
                )}
              </div>

              {/* Spend Figures */}
              <div className="p-4 rounded-xl bg-[#F8EBEA] border border-[#EEDCD4] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#8A7170]">Simulated Annual Spend</div>
                  <div className="font-serif text-2xl font-bold font-mono text-[#7A1520] tabular-nums">
                    S${simulatedSpend.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8A7170]">Qualifying Status</div>
                  <div className="text-sm font-bold text-[#201A1A] capitalize flex items-center gap-1.5 justify-end">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: currentTierInfo.colorHex }}
                    />
                    <span>{currentTierInfo.name}</span>
                  </div>
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#8A7170]">
                  <span>Bronze (S$10k)</span>
                  <span>Silver (S$20k)</span>
                  <span>Gold (S$100k)</span>
                  <span>Plat (S$300k)</span>
                  <span>Diamond (S$500k+)</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="600000"
                  step="5000"
                  value={simulatedSpend}
                  onChange={handleSpendChange}
                  className="w-full h-2.5 bg-[#EEDCD4] rounded-lg appearance-none cursor-pointer accent-[#7A1520]"
                />
              </div>

              {/* Progression toward next tier */}
              {selectedTier !== 'diamond' ? (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#574141]">
                      Progress to next tier threshold (S${nextTierThreshold.toLocaleString()})
                    </span>
                    <span className="font-mono font-bold text-[#7A1520]">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EEDCD4] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#B6454E] to-[#7A1520] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#8A7170]">
                    S${Math.max(0, nextTierThreshold - simulatedSpend).toLocaleString()} spend remaining to elevate.
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#E3F2FD] text-[#0E2A47] text-xs font-semibold">
                  <Award className="w-4 h-4 text-[#C59B57]" />
                  <span>You have unlocked the sovereign Diamond Celestial Tier!</span>
                </div>
              )}
            </div>

            {/* Privilege Checklist for Selected Tier */}
            <div className="p-6 rounded-2xl bg-[#F7EDE8] border border-[#EEDCD4] space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-serif text-base font-bold text-[#201A1A]">
                  Privileges for {currentTierInfo.name}
                </div>
                <span className="text-xs font-semibold text-[#7A1520]">
                  {currentTierInfo.spendDisplay}
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#201A1A]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">The Rose Suite Access:</span> {currentTierInfo.loungeAccess}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">Valet Parking:</span> {currentTierInfo.valetHours}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">Depachika Food Hall:</span> {currentTierInfo.depachikaPrivilege}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">Loyalty Multiplier:</span> Earn {currentTierInfo.multiplier} across all levels
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">Personal Shopper:</span> {currentTierInfo.personalShopper}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7A1520] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-semibold">Heritage Gift:</span> {currentTierInfo.specialPerk}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

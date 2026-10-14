import React from 'react';
import { ArrowRight, Sparkles, MapPin, Coffee, Car, Clock, ShieldCheck } from 'lucide-react';
import { MemberProfile } from '../types';

interface HeroProps {
  member: MemberProfile;
  onExploreTiers: () => void;
  onBookLounge: () => void;
  onExploreDepachika: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  member,
  onExploreTiers,
  onBookLounge,
  onExploreDepachika,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F7] pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-[#EEDCD4]">
      {/* Decorative ambient subtle lacquer glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7A1520]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C59B57]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Split: Editorial Left & High-Res Lounge Imagery Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial & Heritage */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#7A1520] uppercase">
              <span>銀座の精神</span>
              <span aria-hidden="true" className="text-[#C59B57]">·</span>
              <span>Ginza Heritage in Singapore</span>
              <span aria-hidden="true" className="text-[#C59B57]">·</span>
              <span>Est. 1993</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#201A1A] leading-[1.18] [text-wrap:balance]">
              The Storied Art of Japanese Hospitality on Orchard Road
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-[#574141] font-normal leading-relaxed max-w-2xl">
              Rooted in the spirit of <em className="font-serif italic text-[#7A1520]">omotenashi</em>—pure, selfless hospitality—Takashimaya Ngee Ann City presents the Prestige Membership. Immerse yourself in refined depachika delicacies, private Rose Suite lounge sanctuary, and dedicated personal shopping.
            </p>

            {/* Welcome banner for active member */}
            <div className="p-4 rounded-xl bg-[#F8EBEA] border border-[#EEDCD4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7A1520] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                  ET
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#8A7170] font-semibold">
                    Current Patron Profile
                  </div>
                  <div className="text-sm font-bold text-[#201A1A] flex items-center gap-2">
                    <span>{member.name}</span>
                    <span className="text-xs font-semibold text-[#C59B57] capitalize">
                      ({member.tier} Tier)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-[#8A7170]">Available Rose Points</div>
                  <div className="text-sm font-bold font-mono text-[#7A1520] tabular-nums">
                    {member.currentPoints.toLocaleString()} pts
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreTiers}
                className="px-6 py-3.5 bg-[#7A1520] hover:bg-[#8E1C27] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Prestige Tiers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C59B57]" />
              </button>

              <button
                onClick={onBookLounge}
                className="px-6 py-3.5 bg-transparent hover:bg-[#C59B57]/10 text-[#7A1520] border border-[#C59B57] text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#C59B57]" />
                <span>Reserve The Rose Suite</span>
              </button>

              <button
                onClick={onExploreDepachika}
                className="px-4 py-3.5 text-sm font-semibold text-[#574141] hover:text-[#7A1520] transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                View B2 Depachika Menu
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual (The Rose Suite Lounge) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#EEDCD4] shadow-[0_8px_24px_-4px_rgba(122,21,32,0.08),0_2px_6px_-1px_rgba(32,26,26,0.04)] aspect-[4/3] sm:aspect-[16/11] bg-[#F7EDE8]">
              <img
                src="/src/assets/images/hero_lounge_omotenashi_1791938610866.jpg"
                alt="The Rose Suite VIP Lounge at Takashimaya Ngee Ann City Level 3"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Gentle overlay caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#201A1A]/85 via-[#201A1A]/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-widest text-[#E3C999] font-semibold mb-1">
                  The Rose Suite · Level 3
                </div>
                <div className="font-serif text-lg sm:text-xl font-semibold leading-tight">
                  A Quiet Sanctuary of Calm & Rejuvenation
                </div>
                <p className="text-xs text-white/80 mt-1 line-clamp-2">
                  Complimentary ceremonial Uji matcha, seasonal wagashi, and dedicated concierge attendants for Prestige patrons.
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#EEDCD4] rounded-xl p-3 shadow-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#7A1520]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#201A1A]">5-Tier Privilege Matrix</div>
                <div className="text-[11px] text-[#8A7170]">S$10k to S$500k Annual Spend</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item KPI & Department Service Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#EEDCD4] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center shrink-0 border border-[#EEDCD4]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#201A1A]">The Rose Suite</div>
              <div className="text-xs text-[#574141] mt-0.5">Private Level 3 VIP Lounge & Wagashi</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center shrink-0 border border-[#EEDCD4]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#201A1A]">VIP Valet Parking</div>
              <div className="text-xs text-[#574141] mt-0.5">Complimentary Tower A & B Drop-off</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center shrink-0 border border-[#EEDCD4]">
              <Sparkles className="w-5 h-5 text-[#C59B57]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#201A1A]">Depachika B2 Hall</div>
              <div className="text-xs text-[#574141] mt-0.5">Air-flown Japanese gourmet confections</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8EBEA] text-[#7A1520] flex items-center justify-center shrink-0 border border-[#EEDCD4]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#201A1A]">Personal Stylist</div>
              <div className="text-xs text-[#574141] mt-0.5">Private luxury salon appointments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

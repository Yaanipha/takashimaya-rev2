import React, { useState } from 'react';
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { PRESTIGE_TIERS } from '../data/mockData';
import { MembershipTier } from '../types';

export const TierTable: React.FC = () => {
  const [mobileExpandedTier, setMobileExpandedTier] = useState<MembershipTier>('gold');

  const tiers: MembershipTier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

  const rows = [
    {
      label: 'Annual Qualifying Spend',
      sub: 'Calendar year retail spend across Ngee Ann City',
      bronze: 'S$10,000',
      silver: 'S$20,000',
      gold: 'S$100,000',
      platinum: 'S$300,000',
      diamond: 'S$500,000+',
    },
    {
      label: 'Rose Points Accrual Multiplier',
      sub: 'Base rate: 1 Rose Point per S$1.00 spend',
      bronze: '1.2x Points',
      silver: '1.5x Points',
      gold: '2.0x Points',
      platinum: '3.0x Points',
      diamond: '4.0x Points',
    },
    {
      label: 'The Rose Suite VIP Lounge (L3)',
      sub: 'Kyoto tea, seasonal wagashi & baggage assistance',
      bronze: '4 passes / yr',
      silver: '12 passes / yr',
      gold: 'Unlimited + 2 Guests',
      platinum: 'Unlimited + Tatami Suite',
      diamond: 'Private Degustation Salon',
    },
    {
      label: 'Complimentary Valet Parking',
      sub: 'Tower A and Tower B concierge drop-off',
      bronze: '1 hr / visit',
      silver: '2 hrs / visit',
      gold: '3 hrs / day',
      platinum: 'Unlimited Daily',
      diamond: 'Dedicated Chauffeur Bay',
    },
    {
      label: 'Depachika B2 Gourmet Privilege',
      sub: 'Instant privilege rebate on food hall & confectionery',
      bronze: '5% Rebate',
      silver: '8% Rebate',
      gold: '10% Privilege',
      platinum: '12% Privilege',
      diamond: '15% Privilege + Reserved Harvests',
    },
    {
      label: 'Personal Stylist & Wardrobe Salon',
      sub: 'Private consultation suite with Japanese interpreters',
      bronze: false,
      silver: '2 sessions / yr',
      gold: 'Unlimited Sessions',
      platinum: 'Senior Director Atelier',
      diamond: 'Ginza Atelier Direct Commission',
    },
    {
      label: 'Private Haute Horlogerie Previews',
      sub: 'Closed-door Grand Seiko, Rolex, and Patek exhibitions',
      bronze: false,
      silver: false,
      gold: true,
      platinum: true,
      diamond: true,
    },
    {
      label: 'Annual Rose-chan Collector Figurine',
      sub: 'Numbered porcelain edition hand-sculpted in Kyoto',
      bronze: false,
      silver: false,
      gold: true,
      platinum: true,
      diamond: '24k Gilded Custom Figurine',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FFF8F7] border-b border-[#EEDCD4]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold tracking-widest text-[#7A1520] uppercase mb-1">
            特典比較表 · Privilege Comparison
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#201A1A] tracking-tight">
            Complete Tier Privileges Matrix
          </h2>
          <p className="text-sm text-[#574141] mt-1">
            Compare all hospitality tiers and discover the sovereign omotenashi benefits tailored for each level.
          </p>
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-[#EEDCD4] bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8EBEA] border-b border-[#EEDCD4]">
                <th className="py-4 px-6 text-xs uppercase tracking-wider font-bold text-[#201A1A] w-1/4">
                  Privilege Category
                </th>
                {tiers.map((t) => {
                  const info = PRESTIGE_TIERS[t];
                  return (
                    <th
                      key={t}
                      className="py-4 px-4 text-center border-l border-[#EEDCD4] w-[15%]"
                    >
                      <div className="text-xs font-bold text-[#201A1A]">{info.name}</div>
                      <div className="text-[11px] text-[#8A7170] font-normal">{info.japaneseName}</div>
                      <div className="mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#EEDCD4] text-[#7A1520]">
                        {info.spendDisplay.split(' ')[0]}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEDCD4]">
              {rows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-[#FDF9F6]' : 'bg-[#F8EBEA]/50'
                  } hover:bg-[#F2E5E5]/60`}
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-xs sm:text-sm text-[#201A1A]">
                      {row.label}
                    </div>
                    <div className="text-[11px] text-[#8A7170] mt-0.5">{row.sub}</div>
                  </td>

                  {tiers.map((t) => {
                    const val = (row as any)[t];
                    return (
                      <td
                        key={t}
                        className="py-4 px-4 text-center border-l border-[#EEDCD4] text-xs font-medium text-[#201A1A]"
                      >
                        {typeof val === 'boolean' ? (
                          val ? (
                            <div className="inline-flex w-5 h-5 rounded-full bg-[#7A1520] text-white items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          ) : (
                            <Minus className="w-4 h-4 text-[#8A7170] inline-block" />
                          )
                        ) : (
                          <span className="font-mono tabular-nums leading-tight">
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Tier Accordion Cards */}
        <div className="lg:hidden space-y-3">
          {tiers.map((t) => {
            const info = PRESTIGE_TIERS[t];
            const isExpanded = mobileExpandedTier === t;

            return (
              <div
                key={t}
                className="rounded-xl border border-[#EEDCD4] bg-white overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setMobileExpandedTier(isExpanded ? ('gold' as MembershipTier) : t)}
                  className="w-full p-4 flex items-center justify-between text-left bg-[#F8EBEA]/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: info.colorHex }}
                    />
                    <div>
                      <div className="text-sm font-bold text-[#201A1A]">{info.name}</div>
                      <div className="text-xs text-[#8A7170] font-mono">{info.spendDisplay}</div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#8A7170]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8A7170]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 divide-y divide-[#EEDCD4] text-xs space-y-3 bg-[#FFF8F7]">
                    {rows.map((row) => {
                      const val = (row as any)[t];
                      return (
                        <div key={row.label} className="pt-2 first:pt-0 flex justify-between gap-4">
                          <span className="text-[#574141] font-medium">{row.label}</span>
                          <span className="font-bold text-[#201A1A] text-right font-mono tabular-nums">
                            {typeof val === 'boolean' ? (
                              val ? (
                                <span className="text-[#7A1520]">Included</span>
                              ) : (
                                <span className="text-[#8A7170]">—</span>
                              )
                            ) : (
                              val
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
